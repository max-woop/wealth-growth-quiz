import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface IncomeSourceStepProps {
  onNext: (source: string) => void;
}

const IncomeSourceStep: React.FC<IncomeSourceStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  
  const sources = [
    {
      value: "Full-time Job",
      title: t.fullTimeJob
    },
    {
      value: "Business Owner",
      title: t.businessOwner
    },
    {
      value: "Freelancer",
      title: t.freelancer
    },
    {
      value: "Other",
      title: t.other
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.incomeSourceQuestion}
      </h2>
      
      <div className="space-y-3 max-w-sm mx-auto">
        {sources.map((source) => (
          <button 
            key={source.value}
            onClick={() => onNext(source.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {source.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default IncomeSourceStep;