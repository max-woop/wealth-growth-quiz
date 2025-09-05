import React from 'react';
import { withBase } from '../../utils/imagePreloader';

interface ExperienceStepProps {
  onNext: (experience: string) => void;
}

const ExperienceStep: React.FC<ExperienceStepProps> = ({ onNext }) => {
  const experienceOptions = [
    {
      value: "I'm just getting started",
      image: withBase('/assets/custom_low.jpg'),
      emoji: "🌱",
      description: "No experience yet - I want to learn"
    },
    {
      value: "Less than a year",
      image: withBase('/assets/custom_intermediate.jpg'),
      emoji: "📈",
      description: "I've tried trading but still learning"
    },
    {
      value: "1-3 years",
      image: withBase('/assets/custom_intermediate-1.jpg'),
      emoji: "💪",
      description: "I trade regularly and want to improve"
    },
    {
      value: "Over 3 years",
      image: withBase('/assets/custom_high.jpg'),
      emoji: "🏆",
      description: "I'm experienced and looking to excel"
    }
  ];

  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-900">
        Tell us about your trading experience
      </h2>
      
      <p className="text-center text-gray-600 mb-8">
        Don't worry if you're new - we'll help you get started
      </p>
      
      <div className="space-y-4">
        {experienceOptions.map((option) => (
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
    </div>
  );
};

export default ExperienceStep;