import { type FC, useState } from "react";

interface Props {
  onClose: () => void;
}

export const QuizModal: FC<Props> = ({ onClose }) => {
  const [step, setStep] = useState(1);
  const [selected, setSelected] = useState<string | null>(null);
  const [showLevelUp, setShowLevelUp] = useState(false);
  const [failed, setFailed] = useState(false); // indica si fallaste

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
          // última pregunta correcta
          setShowLevelUp(true);
        }
      }, 800);
    } else {
      // si falla, bloqueamos opciones y mostramos botón para reiniciar
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
          <div className="bg-gray-800 rounded-lg shadow-lg p-6 w-80 text-center text-white">
            <h2 className="text-lg font-bold mb-4">🚀 Space Quiz</h2>

            <p className="mb-3">{currentQuestion.question}</p>
            <ul className="space-y-2">
              {currentQuestion.options.map((answer) => (
                <li key={answer}>
                  <button
                    onClick={() => handleSelect(answer)}
                    disabled={failed} // bloquea si fallaste
                    className={`w-full p-2 rounded transition
                      ${
                        selected === answer
                          ? answer === currentQuestion.correct
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-600 hover:bg-gray-700"
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
                className="mt-4 px-3 py-1 rounded bg-yellow-500 text-white hover:bg-yellow-600"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modal Level Up */}
      {showLevelUp && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-50">
          <div className="bg-gray-700 rounded-lg shadow-lg p-6 w-80 text-center text-white">
            <h2 className="text-xl font-bold mb-4">🎉 Congratulations!</h2>
            <p className="mb-4">You've leveled up! 🚀</p>
            <button
              onClick={handleCloseLevelUp}
              className="px-3 py-1 rounded bg-green-500 text-white hover:bg-green-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};
