import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface TimeCommitmentStepProps {
  onNext: (time: string) => void;
}

const TimeCommitmentStep: React.FC<TimeCommitmentStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const timeOptions = [
    {
      value: "1-2h daily",
      title: t.oneToTwoHoursDaily
    },
    {
      value: "3-4h weekly",
      title: t.threeToFourHoursWeekly
    },
    {
      value: "5-6h monthly",
      title: t.fiveToSixHoursMonthly
    },
    {
      value: "Flexible",
      title: t.flexible
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.timeCommitmentQuestion}
      </h2>
      
      <p className="text-base md:text-lg text-center text-gray-600 mb-4">
        {t.timeCommitmentDescription}
      </p>

      <div className="space-y-3 max-w-sm mx-auto">
        {timeOptions.map((option) => (
          <button 
            key={option.value}
            onClick={() => onNext(option.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left flex-1">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {option.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TimeCommitmentStep;