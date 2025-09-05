import React, { useState } from 'react';
import SurveyButton from '../SurveyButton';
import { useSurvey } from '../../context/SurveyContext';

interface MarketInterestsStepProps {
  onNext: (markets: string[]) => void;
}

const MarketInterestsStep: React.FC<MarketInterestsStepProps> = ({ onNext }) => {
  const { t } = useSurvey();
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  
  const markets = [
    {
      value: "Stocks",
      title: t.stocks
    },
    {
      value: "Forex",
      title: t.forex
    },
    {
      value: "Crypto",
      title: t.crypto
    },
    {
      value: "Commodities",
      title: t.commodities
    },
    {
      value: "Indices",
      title: t.indices
    }
  ];
  
  const toggleMarket = (market: string) => {
    if (selectedMarkets.includes(market)) {
      setSelectedMarkets(selectedMarkets.filter(item => item !== market));
    } else {
      setSelectedMarkets([...selectedMarkets, market]);
    }
  };
  
  return (
    <div className="animate-fadeIn py-2">
      <h2 className="text-xl font-bold mb-2 text-center text-gray-900">
        {t.marketInterestsQuestion}
      </h2>
      
      <p className="text-center text-gray-600 text-sm mb-4">
        {t.selectAll}
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto mb-6">
        {markets.map((market) => {
          const isSelected = selectedMarkets.includes(market.value);
          return (
            <button 
              key={market.value}
              onClick={() => toggleMarket(market.value)}
              className={`bg-gradient-to-br border p-4 rounded-lg transition-all duration-300 text-left
                ${isSelected 
                  ? 'from-[#E7FFE9] to-[#F5FFF6] border-[#00B915]' 
                  : 'from-white to-gray-50 border-gray-100'}`}
            >
              <div className="flex items-start gap-3">
                <div>
                  <span className={`font-medium ${isSelected ? 'text-[#00B915]' : 'text-gray-900'} text-base block mb-1`}>
                    {market.title}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="text-center">
        <SurveyButton 
          onClick={() => onNext(selectedMarkets)}
          disabled={selectedMarkets.length === 0}
        >
          {t.continue}
        </SurveyButton>
      </div>
    </div>
  );
};

export default MarketInterestsStep;