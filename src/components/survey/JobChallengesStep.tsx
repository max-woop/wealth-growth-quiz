import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface JobChallengesStepProps {
  onNext: (challenges: string) => void;
}

const JobChallengesStep: React.FC<JobChallengesStepProps> = ({ onNext }) => {
  const { t, language } = useSurvey();
  
  const challenges = [
    {
      value: "Feeling underpaid",
      title: t.feelingUnderpaid
    },
    {
      value: "Financial dependence",
      title: t.financialDependence
    },
    {
      value: "Constant worry",
      title: t.constantWorry
    },
    {
      value: "No free time",
      title: t.noFreeTime
    },
    {
      value: "Routine",
      title: t.routine
    },
    {
      value: "Other",
      title: t.other
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.jobChallengesQuestion}
      </h2>
      
      <div className="space-y-3 max-w-sm mx-auto">
        {challenges.map((challenge) => (
          <button 
            key={challenge.value}
            onClick={() => onNext(challenge.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left flex-1">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {challenge.title}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobChallengesStep;