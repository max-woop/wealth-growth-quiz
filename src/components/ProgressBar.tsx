import React from 'react';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStep, totalSteps }) => {
  const progress = (currentStep / totalSteps) * 100;
  
  return (
    <div className="w-full bg-white shadow-sm border-b border-gray-100 px-4 py-4">
      <div className="max-w-3xl mx-auto">
        {/* Progress bar container */}
        <div className="relative">
          {/* Background track */}
          <div className="h-2 bg-gradient-to-r from-gray-100 to-gray-200 rounded-full overflow-hidden shadow-inner">
            {/* Progress fill with gradient */}
            <div 
              className="h-full bg-gradient-to-r from-[#FF6B00] via-[#FF8533] to-[#FFB366] rounded-full transition-all duration-700 ease-out relative overflow-hidden"
              style={{ width: `${progress}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
            </div>
          </div>
          
          {/* Progress indicator dot */}
          <div 
            className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-white border-2 border-[#FF6B00] rounded-full shadow-lg transition-all duration-700 ease-out"
            style={{ left: `calc(${progress}% - 8px)` }}
          >
            <div className="w-full h-full bg-[#FF6B00] rounded-full scale-50" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;