import React from 'react';
import { useSurvey } from '../../context/SurveyContext';

interface MonthlyIncomeStepProps {
  onNext: (income: string) => void;
}

const MonthlyIncomeStep: React.FC<MonthlyIncomeStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  
  const incomeRanges = [
    {
      value: "Under $3,000",
      title: t.under3000
    },
    {
      value: "$3,000 - $5,000",
      title: t.income3000to5000
    },
    {
      value: "$5,000 - $10,000",
      title: t.income5000to10000
    },
    {
      value: "Over $10,000",
      title: t.over10000
    },
    {
      value: "I don't want to share",
      title: t.dontWantToShare
    }
  ];

  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl md:text-2xl font-bold mb-2 text-center text-gray-900">
        {t.monthlyIncomeQuestion}
      </h2>
      
      <div className="space-y-3 max-w-sm mx-auto mb-6">
        {incomeRanges.map((range) => (
          <button 
            key={range.value}
            onClick={() => onNext(range.value)}
            className="w-full bg-gray-50 hover:bg-white border border-gray-100 
                     rounded-lg p-4 hover:border-[#00B915] transition-all duration-300
                     flex items-center gap-4 group"
          >
            <div className="text-left">
              <span className="font-medium text-gray-900 group-hover:text-[#00B915] text-base md:text-lg block">
                {range.title}
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 max-w-sm mx-auto">
        <p className="text-xs text-gray-600 text-center">
          {t.incomeDisclaimer}
        </p>
      </div>
    </div>
  );
};

export default MonthlyIncomeStep;