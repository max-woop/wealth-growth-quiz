import React from 'react';
import SurveyButton from '../SurveyButton';

interface FrequencyStepProps {
  onNext: (frequency: string) => void;
  onPrevious: () => void;
}

const FrequencyStep: React.FC<FrequencyStepProps> = ({ onNext, onPrevious }) => {
  const frequencyOptions = [
    {
      value: "Multiple times a day",
      emoji: "⚡",
      description: "Active day trading style"
    },
    {
      value: "Once a day",
      emoji: "📅",
      description: "Daily trading routine"
    },
    {
      value: "A few times a week",
      emoji: "📊",
      description: "Flexible swing trading"
    },
    {
      value: "Occasionally",
      emoji: "🎯",
      description: "Position trading approach"
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        How often would you like to trade?
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        Choose a trading style that fits your schedule
      </p>
      
      <div className="space-y-4 mb-8">
        {frequencyOptions.map((option) => (
          <button 
            key={option.value}
            onClick={() => onNext(option.value)}
            className="w-full p-6 bg-white border-2 border-gray-100 rounded-xl cursor-pointer
                      hover:border-[#4F46E5] hover:bg-[#F8F7FF] transition-all duration-200
                      flex items-center justify-between group min-h-[72px]"
          >
            <div className="flex items-center flex-1">
              <div className="w-5 h-5 rounded-full border-2 border-gray-300 mr-3 flex-shrink-0
                            group-hover:border-[#4F46E5]"></div>
              <div className="text-left">
                <span className="text-lg text-gray-700 group-hover:text-[#4F46E5] block">{option.value}</span>
                <span className="text-sm text-gray-500">{option.description}</span>
              </div>
            </div>
            <span className="text-2xl ml-4">{option.emoji}</span>
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <SurveyButton onClick={onPrevious} isPrimary={false}>
          Back
        </SurveyButton>
        <SurveyButton onClick={() => onNext(frequencyOptions[0].value)}>
          Continue
        </SurveyButton>
      </div>
    </div>
  );
};

export default FrequencyStep;