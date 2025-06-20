import React, { useContext } from 'react';
import { CheckFitContext } from '../../context/CheckFitContext';
import { questions } from '../../data/questions';
// Bluetooth icon removed as requested

const QuizScreen: React.FC = () => {
  const { currentQuestion, handleAnswer, userData } = useContext(CheckFitContext);
  
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const question = questions[currentQuestion];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-sky-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl p-8 border border-blue-100">
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-bold text-gray-600">
                🔍 Pergunta {currentQuestion + 1} de {questions.length}
              </span>
              <span className="text-sm font-bold text-blue-600">
                {Math.round(progress)}% concluído
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-gradient-to-r from-blue-400 via-cyan-500 to-blue-600 h-3 rounded-full transition-all duration-500"
                style={{width: `${progress}%`}}
              ></div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold text-gray-800 mb-3">
              {question.text}
            </h2>
            <p className="text-sm text-blue-600 mb-6 font-medium">
              {question.subtitle}
            </p>

            <div className="space-y-3">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(index)}
                  className="w-full text-left p-5 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all duration-200 group transform hover:scale-[1.02]"
                >
                  <span className="text-gray-700 group-hover:text-blue-700 font-medium">
                    {option.text}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="text-center bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-gray-700">
              🔬 <strong>Avaliando {userData.name}...</strong> Seja 100% honesto(a) para um diagnóstico preciso
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuizScreen;