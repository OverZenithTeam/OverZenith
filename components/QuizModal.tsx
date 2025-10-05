import { type FC, useState, useEffect } from "react";
import { useExperienceContext } from "../contexts/ExperienceProvider";

interface QuizState {
  step: number;
  selected: string | null;
  failed: boolean;
  answers: { [key: number]: string };
  completed: boolean;
}

interface Props {
  onClose: () => void;
  savedState?: QuizState;
  onSaveState: (state: QuizState) => void;
  onXPGain?: (amount: number, reason: string) => void;
}

export const QuizModal: FC<Props> = ({ onClose, savedState, onSaveState, onXPGain }) => {
  const [step, setStep] = useState(savedState?.step || 1);
  const [selected, setSelected] = useState<string | null>(savedState?.selected || null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [failed, setFailed] = useState(savedState?.failed || false);
  const [answers, setAnswers] = useState<{ [key: number]: string }>(savedState?.answers || {});
  const [completed, setCompleted] = useState(savedState?.completed || false);

  const { answerQuizQuestion, completeQuiz, hasAnsweredQuestion, hasCompletedQuiz } = useExperienceContext();

  // Guardar estado cuando cambie
  useEffect(() => {
    onSaveState({ step, selected, failed, answers, completed });
  }, [step, selected, failed, answers, completed, onSaveState]);

  // Mostrar pantalla de felicitaciones si ya completó el quiz
  useEffect(() => {
    if (completed) {
      setShowLevelUp(true);
    }
  }, [completed]);

  const quiz = [
    {
      question: "Who was the first man to go into space?",
      options: ["Yuri Gagarin", "Neil Armstrong", "Buzz Aldrin"],
      correct: "Yuri Gagarin",
    },
    {
      question: "Why don’t most small asteroids that enter Earth’s atmosphere hit the ground?",
      options: [
        "Because they are too small to fall",
        "Because Earth’s gravity repels them",
        "Because most burn up in the atmosphere before reaching the surface"
      ],
      correct: "Because most burn up in the atmosphere before reaching the surface",
    },
    {
      question: "From which space center did the Apollo missions that took humans to the Moon launch?",
      options: ["Johnson Space Center", "Kennedy Space Center", "Baikonur Cosmodrome"],
      correct: "Kennedy Space Center",
    }
  ];

  const currentQuestion = quiz[step - 1];

  const handleSelect = (answer: string) => {
    setSelected(answer);
    setAnswers(prev => ({ ...prev, [step]: answer }));

    if (answer === currentQuestion.correct) {
      // El hook ya maneja internamente si es la primera vez o no
      answerQuizQuestion(step - 1);

      setTimeout(() => {
        if (step < quiz.length) {
          setStep(step + 1);
          setSelected(null);
        } else {
          setCompleted(true);
          // Ganar XP por completar el quiz
          completeQuiz();
          setShowLevelUp(true);
        }
      }, 600);
    } else {
      setFailed(true);
    }
  };

  const handleRestartQuiz = () => {
    setStep(1);
    setSelected(null);
    setFailed(false);
    setAnswers({});
    setCompleted(false);
    setShowLevelUp(false);
  };

  const handleCloseLevelUp = () => {
    setShowLevelUp(false);
    onClose();
  };

  return (
    <>
      {/* Modal del quiz */}
      {!showLevelUp && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-300 p-6 w-96 max-w-md rounded-lg shadow-[4px_4px_#323232] flex flex-col items-start gap-4 relative">
            {/* Botón X para cerrar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded border-2 border-[#323232] shadow-[2px_2px_#323232] bg-white text-[#323232] font-bold hover:bg-gray-200 transition text-sm"
              aria-label="Cerrar quiz"
            >
              ✕
            </button>

            <h2 className="font-bold text-2xl text-[#323232] mb-3 pr-10">🚀 Space Quiz</h2>
            <p className="text-[#666]">{currentQuestion.question}</p>

            <div className="w-full grid gap-3">
              {currentQuestion.options.map((answer) => (
                <button
                  key={answer}
                  onClick={() => handleSelect(answer)}
                  disabled={failed}
                  className={`w-full p-3 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] text-[#323232] font-semibold transition
                    ${
                      selected === answer
                        ? answer === currentQuestion.correct
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                        : "bg-white hover:bg-gray-200"
                    } ${failed ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {answer}
                </button>
              ))}
            </div>

            {failed && (
              <button
                onClick={handleRestartQuiz}
                className="mt-4 w-full py-2 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] bg-yellow-400 text-[#323232] font-semibold hover:bg-yellow-500"
              >
                Try Quiz Again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal Level Up */}
      {showLevelUp && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-300 p-6 w-96 max-w-md rounded-lg shadow-[4px_4px_#323232] flex flex-col items-center gap-4 relative">
            {/* Botón X para cerrar */}
            <button
              onClick={onClose}
              className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded border-2 border-[#323232] shadow-[2px_2px_#323232] bg-white text-[#323232] font-bold hover:bg-gray-200 transition text-sm"
              aria-label="Cerrar"
            >
              ✕
            </button>

            <h2 className="font-bold text-2xl text-[#323232] pr-10">🎉 Congratulations!</h2>
            <p className="text-[#666] text-center">You've leveled up! 🚀</p>
            <div className="flex flex-col gap-3 w-full">
              <button
                onClick={handleCloseLevelUp}
                className="w-full py-3 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] bg-green-500 text-white font-semibold hover:bg-green-600"
              >
                Close
              </button>
              <button
                onClick={handleRestartQuiz}
                className="w-full py-3 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] bg-yellow-400 text-[#323232] font-semibold hover:bg-yellow-500"
              >
                Take Quiz Again
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
