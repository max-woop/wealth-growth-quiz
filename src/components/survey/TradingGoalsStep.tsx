import React from 'react';
import SurveyButton from '../SurveyButton';

interface TradingGoalsStepProps {
  onNext: (goal: string) => void;
  onPrevious: () => void;
}

const TradingGoalsStep: React.FC<TradingGoalsStepProps> = ({ onNext, onPrevious }) => {
  const goalOptions = [
    {
      value: "Generate short-term income",
      emoji: "💰",
      description: "Make regular profits from active trading"
    },
    {
      value: "Build long-term wealth",
      emoji: "🏦",
      description: "Grow your portfolio over time"
    },
    {
      value: "Diversify my investment portfolio",
      emoji: "📊",
      description: "Add trading to your investment mix"
    },
    {
      value: "Learn and gain experience",
      emoji: "📚",
      description: "Master trading skills step by step"
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        What would you like to achieve?
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        We'll help you create a plan to reach your goals
      </p>
      
      <div className="space-y-4 mb-8">
        {goalOptions.map((option) => (
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
      
      <div className="flex justify-start mt-8">
        <SurveyButton onClick={onPrevious} isPrimary={false}>
          Back
        </SurveyButton>
      </div>
    </div>
  );
};

export default TradingGoalsStep;