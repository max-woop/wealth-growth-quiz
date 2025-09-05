import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface LifeSatisfactionStepProps {
  onNext: (satisfaction: string) => void;
}

const LifeSatisfactionStep: React.FC<LifeSatisfactionStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const satisfactionLevels = [
    {
      value: "Very Satisfied",
      emoji: t.verySatisfiedEmoji,
      title: t.verySatisfied
    },
    {
      value: "Somewhat Satisfied",
      emoji: t.somewhatSatisfiedEmoji,
      title: t.somewhatSatisfied
    },
    {
      value: "Neutral",
      emoji: t.neutralEmoji,
      title: t.neutral
    },
    {
      value: "Not Satisfied",
      emoji: t.notSatisfiedEmoji,
      title: t.notSatisfied
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-center text-gray-900">
        {t.lifeSatisfactionQuestion}
      </h2>
      
      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {satisfactionLevels.map((level) => (
          <button 
            key={level.value}
            onClick={() => onNext(level.value)}
            className="bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex flex-col items-center gap-2 group text-center"
          >
            <span className="text-3xl transform group-hover:scale-110 transition-transform">
              {level.emoji}
            </span>
            <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-sm leading-tight">
              {level.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LifeSatisfactionStep;