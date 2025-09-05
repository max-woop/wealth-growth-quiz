import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface ExtraMoneyUseStepProps {
  onNext: (use: string) => void;
}

const ExtraMoneyUseStep: React.FC<ExtraMoneyUseStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const uses = [
    {
      value: "Travel More",
      title: t.travelMore
    },
    {
      value: "Buy a Home",
      title: t.buyAHome
    },
    {
      value: "Start Business",
      title: t.startBusiness
    },
    {
      value: "Save Future",
      title: t.saveFuture
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.extraMoneyUseQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-4">
        {t.extraMoneyUseDescription}
      </p>

      <div className="space-y-3 max-w-sm mx-auto">
        {uses.map((use) => (
          <button 
            key={use.value}
            onClick={() => onNext(use.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left flex-1">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {use.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ExtraMoneyUseStep;