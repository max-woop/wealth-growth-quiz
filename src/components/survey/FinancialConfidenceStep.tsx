import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface FinancialConfidenceStepProps {
  onNext: (confidence: string) => void;
}

const FinancialConfidenceStep: React.FC<FinancialConfidenceStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const confidenceLevels = [
    {
      value: "Very Confident",
      emoji: t.veryConfidentEmoji,
      title: t.veryConfident
    },
    {
      value: "Somewhat",
      emoji: t.positiveViewEmoji,
      title: t.positiveView
    },
    {
      value: "Neutral",
      emoji: "😐",
      title: t.neutral
    },
    {
      value: "Not Confident",
      emoji: t.needGuidanceEmoji,
      title: t.needGuidance
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.financialConfidenceQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-4">
        {t.financialConfidenceDescription}
      </p>

      <div className="grid grid-cols-2 gap-3 max-w-sm mx-auto">
        {confidenceLevels.map((level) => (
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

export default FinancialConfidenceStep;