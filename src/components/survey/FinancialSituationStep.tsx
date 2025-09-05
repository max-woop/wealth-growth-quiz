import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface FinancialSituationStepProps {
  onNext: (situation: string) => void;
}

const FinancialSituationStep: React.FC<FinancialSituationStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  
  const situations = [
    {
      value: "Very Comfortable",
      emoji: "🌟",
      title: t.veryComfortable
    },
    {
      value: "Comfortable",
      emoji: "👍",
      title: t.comfortable
    },
    {
      value: "Getting By",
      emoji: "⚖️",
      title: t.gettingBy
    },
    {
      value: "Need Improvement",
      emoji: "📈",
      title: t.needImprovement
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900">
        {t.financialSituationQuestion}
      </h2>
      
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {situations.map((situation) => (
          <button 
            key={situation.value}
            onClick={() => onNext(situation.value)}
            className="bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex flex-col items-center gap-2 group text-center"
          >
            <span className="text-3xl transform group-hover:scale-110 transition-transform">
              {situation.emoji}
            </span>
            <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-sm leading-tight">
              {situation.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default FinancialSituationStep;