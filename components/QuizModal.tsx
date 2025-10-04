import { type FC, useState } from "react";

interface Props {
  onClose: () => void;
}

export const QuizModal: FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [failed, setFailed] = useState(false);

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

    if (answer === currentQuestion.correct) {
      setTimeout(() => {
        if (step < quiz.length) {
          setStep(step + 1);
          setSelected(null);
        } else {
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
          <div className="bg-gray-300 p-6 w-80 rounded-lg shadow-[4px_4px_#323232] flex flex-col items-start gap-4">
            <h2 className="font-bold text-2xl text-[#323232] mb-3">🚀 Space Quiz</h2>
            <p className="text-[#666]">{currentQuestion.question}</p>

            <ul className="w-full flex flex-col gap-2">
              {currentQuestion.options.map((answer) => (
                <li key={answer}>
                  <button
                    onClick={() => handleSelect(answer)}
                    disabled={failed}
                    className={`w-full p-2 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] text-[#323232] font-semibold transition
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
                </li>
              ))}
            </ul>

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
          <div className="bg-gray-300 p-6 w-80 rounded-lg shadow-[4px_4px_#323232] flex flex-col items-center gap-4">
            <h2 className="font-bold text-2xl text-[#323232]">🎉 Congratulations!</h2>
            <p className="text-[#666]">You've leveled up! 🚀</p>
            <button
              onClick={handleCloseLevelUp}
              className="mt-2 w-full py-2 rounded border-2 border-[#323232] shadow-[4px_4px_#323232] bg-green-500 text-white font-semibold hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
