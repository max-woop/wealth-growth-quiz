import React, { useState } from 'react';
import SurveyButton from '../SurveyButton';

interface InstrumentsStepProps {
  onNext: (instruments: string[]) => void;
  onPrevious: () => void;
}

const InstrumentsStep: React.FC<InstrumentsStepProps> = ({ onNext, onPrevious }) => {
  const [selectedInstruments, setSelectedInstruments] = useState<string[]>([]);
  
  const instrumentOptions = [
    {
      value: "Stocks",
      emoji: "📈"
    },
    {
      value: "Forex",
      emoji: "💱"
    },
    {
      value: "Cryptocurrencies",
      emoji: "₿"
    },
    {
      value: "Commodities",
      emoji: "🏆"
    },
    {
      value: "Indices",
      emoji: "📊"
    }
  ];
  
  const toggleInstrument = (instrument: string) => {
    if (selectedInstruments.includes(instrument)) {
      setSelectedInstruments(selectedInstruments.filter(item => item !== instrument));
    } else {
      setSelectedInstruments([...selectedInstruments, instrument]);
    }
  };
  
  const handleNext = () => {
    if (selectedInstruments.length > 0) {
      onNext(selectedInstruments);
    }
  };
  
  return (
    <div className="animate-fadeIn">
      <h2 className="text-2xl font-bold mb-6 text-gray-900">
        Which markets are you most interested in?
      </h2>
      
      <p className="text-gray-600 mb-4">Select all that apply</p>
      
      <div className="space-y-3 mb-8">
        {instrumentOptions.map((option) => {
          const isSelected = selectedInstruments.includes(option.value);
          
          return (
            <div 
              key={option.value}
              onClick={() => toggleInstrument(option.value)}
              className={`p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 
                        flex items-center justify-between min-h-[72px]
                        ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200'}`}
            >
              <div className="flex items-center flex-1">
                <div className={`w-5 h-5 flex-shrink-0 border-2 rounded mr-3 flex items-center justify-center
                               ${isSelected ? 'border-blue-500 bg-blue-500' : 'border-gray-300'}`}>
                  {isSelected && (
                    <span className="text-white text-sm">✓</span>
                  )}
                </div>
                <span className="text-lg text-gray-800">{option.value}</span>
              </div>
              <span className="text-2xl ml-4">{option.emoji}</span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8">
        <SurveyButton onClick={onPrevious} isPrimary={false}>
          Back
        </SurveyButton>
        <SurveyButton 
          onClick={handleNext}
          disabled={selectedInstruments.length === 0}
        >
          Continue
        </SurveyButton>
      </div>
    </div>
  );
};

export default InstrumentsStep;