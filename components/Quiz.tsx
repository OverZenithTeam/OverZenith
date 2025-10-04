
import { useState, type FC } from 'react';
import type { Question } from '../types/types';

interface QuizProps {
  questions: Question[];
}

export const Quiz: FC<QuizProps> = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<{ [key: number]: number }>({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelect = (optionIndex: number) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: optionIndex,
    });
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let calculatedScore = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        calculatedScore++;
      }
    });
    setScore(calculatedScore);
    setShowResults(true);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  if (showResults) {
    return (
      <div className="bg-slate-50 p-8 rounded-xl shadow-lg border border-slate-200 text-center">
        <h3 className="text-3xl font-bold text-space-blue mb-4">Resultados del Cuestionario</h3>
        <p className="text-xl text-comet-grey mb-6">
          Has acertado {score} de {questions.length} preguntas.
        </p>
        <div className="w-full bg-slate-200 rounded-full h-4 mb-6">
          <div
            className="bg-green-500 h-4 rounded-full transition-all duration-500"
            style={{ width: `${(score / questions.length) * 100}%` }}
          ></div>
        </div>
        <button
          onClick={handleRestart}
          className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors shadow-md"
        >
          Intentar de Nuevo
        </button>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const selectedOption = selectedAnswers[currentQuestionIndex];

  return (
    <div className="bg-slate-50 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200">
      <div className="mb-6">
        <p className="text-sm font-semibold text-blue-600 mb-2">
          Pregunta {currentQuestionIndex + 1} de {questions.length}
        </p>
        <h3 className="text-xl sm:text-2xl font-bold text-space-blue">{currentQuestion.question}</h3>
      </div>
      <div className="space-y-4 mb-8">
        {currentQuestion.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center p-4 rounded-lg border-2 cursor-pointer transition-all ${
              selectedOption === index
                ? 'bg-blue-100 border-blue-500'
                : 'bg-white border-slate-300 hover:border-blue-400'
            }`}
          >
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value={index}
              checked={selectedOption === index}
              onChange={() => handleAnswerSelect(index)}
              className="h-5 w-5 text-blue-600 focus:ring-blue-500 border-slate-400"
            />
            <span className="ml-4 text-lg text-slate-700">{option}</span>
          </label>
        ))}
      </div>
      <div className="flex justify-between items-center">
        <button
          onClick={handlePrevQuestion}
          disabled={currentQuestionIndex === 0}
          className="bg-slate-200 text-slate-700 font-bold py-2 px-4 rounded-lg hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          Anterior
        </button>
        {currentQuestionIndex === questions.length - 1 ? (
          <button
            onClick={handleSubmit}
            disabled={selectedOption === undefined}
            className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:bg-green-400 transition-colors"
          >
            Finalizar
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            disabled={selectedOption === undefined}
            className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:bg-blue-400 transition-colors"
          >
            Siguiente
          </button>
        )}
      </div>
    </div>
  );
};
