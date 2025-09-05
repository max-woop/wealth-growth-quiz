import React, { useState } from 'react';
import SurveyButton from '../SurveyButton';
import { TrendingUp, LineChart, ChevronRight, X, BarChart3, Target, Award } from 'lucide-react';
import { useSurvey } from '../../context/SurveyContext';

interface WealthGrowthProfileProps {
  onNext: () => void;
  responses: {
    tradingKnowledge: string;
    monthlyIncome: string;
    investmentReadiness: number;
    mainGoal: string;
    financialConfidence: string;
    marketInterests: string[];
  };
}

interface MarketPopupProps {
  market: string;
  onClose: () => void;
}

const MarketPopup: React.FC<MarketPopupProps> = ({ market, onClose }) => {
  const { t } = useSurvey();
  
  const marketInfo = {
    Stocks: {
      description: t.stocksDescription,
      advantages: t.stocksAdvantages,
      tips: t.stocksTips
    },
    Forex: {
      description: t.forexDescription,
      advantages: t.forexAdvantages,
      tips: t.forexTips
    },
    Crypto: {
      description: t.cryptoDescription,
      advantages: t.cryptoAdvantages,
      tips: t.cryptoTips
    },
    Commodities: {
      description: t.commoditiesDescription,
      advantages: t.commoditiesAdvantages,
      tips: t.commoditiesTips
    },
    Indices: {
      description: t.indicesDescription,
      advantages: t.indicesAdvantages,
      tips: t.indicesTips
    }
  };

  const info = marketInfo[market as keyof typeof marketInfo];

  // Get translated market name
  const getMarketName = (marketKey: string) => {
    const marketNames = {
      'Stocks': t.stocks,
      'Forex': t.forex,
      'Crypto': t.crypto,
      'Commodities': t.commodities,
      'Indices': t.indices
    };
    return marketNames[marketKey as keyof typeof marketNames] || marketKey;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 relative max-h-[90vh] overflow-y-auto">
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
        >
          <X className="w-5 h-5" />
        </button>

        <h3 className="text-xl font-bold text-gray-900 mb-4 pr-8">{getMarketName(market)}</h3>
        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{info.description}</p>

        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-base">{t.advantages}</h4>
            <ul className="space-y-2">
              {info.advantages.map((advantage, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#00B915] rounded-full mt-2 flex-shrink-0" />
                  {advantage}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 mb-3 text-base">{t.tradingTips}</h4>
            <ul className="space-y-2">
              {info.tips.map((tip, index) => (
                <li key={index} className="flex items-start gap-2 text-gray-600 text-sm">
                  <div className="w-1.5 h-1.5 bg-[#4F46E5] rounded-full mt-2 flex-shrink-0" />
                  {tip}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

const WealthGrowthProfile: React.FC<WealthGrowthProfileProps> = ({ onNext, responses }) => {
  const { t } = useSurvey();
  const [selectedMarket, setSelectedMarket] = useState<string | null>(null);

  const getSkillLevel = () => {
    const readiness = responses.investmentReadiness;
    if (readiness <= 3) return {
      level: t.beginnerInvestor,
      description: t.beginnerDescription,
      color: 'from-orange-500 to-red-500',
      bgColor: 'bg-orange-50',
      icon: <Target className="w-5 h-5" />
    };
    if (readiness <= 7) return {
      level: t.confidentParticipant,
      description: t.confidentDescription,
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50',
      icon: <BarChart3 className="w-5 h-5" />
    };
    return {
      level: t.advancedUser,
      description: t.advancedDescription,
      color: 'from-green-500 to-emerald-500',
      bgColor: 'bg-green-50',
      icon: <Award className="w-5 h-5" />
    };
  };

  const getMarketRecommendation = (market: string) => {
    switch (market) {
      case 'Stocks':
        return {
          text: t.stocksRecommendation,
          icon: <TrendingUp className="w-4 h-4" />,
          color: "bg-blue-500",
          url: "https://libertex.org/markets/stocks"
        };
      case 'Forex':
        return {
          text: t.forexRecommendation,
          icon: <LineChart className="w-4 h-4" />,
          color: "bg-purple-500",
          url: "https://libertex.org/markets/forex"
        };
      case 'Crypto':
        return {
          text: t.cryptoRecommendation,
          icon: <TrendingUp className="w-4 h-4" />,
          color: "bg-orange-500",
          url: "https://libertex.org/markets/crypto"
        };
      case 'Commodities':
        return {
          text: t.commoditiesRecommendation,
          icon: <LineChart className="w-4 h-4" />,
          color: "bg-yellow-500",
          url: "https://libertex.org/markets/commodities"
        };
      case 'Indices':
        return {
          text: t.indicesRecommendation,
          icon: <TrendingUp className="w-4 h-4" />,
          color: "bg-green-500",
          url: "https://libertex.org/markets/indices"
        };
      default:
        return null;
    };
  };

  // Get translated market name
  const getMarketName = (marketKey: string) => {
    const marketNames = {
      'Stocks': t.stocks,
      'Forex': t.forex,
      'Crypto': t.crypto,
      'Commodities': t.commodities,
      'Indices': t.indices
    };
    return marketNames[marketKey as keyof typeof marketNames] || marketKey;
  };

  const skillLevel = getSkillLevel();

  return (
    <div className="animate-fadeIn py-4 px-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 leading-tight">
          {t.checkWealthGrowthProfile}
        </h1>
      </div>

      {/* Main Profile Card */}
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
        {/* Header with Level Badge */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-3">
          <h2 className="text-xl font-bold text-gray-900">{t.tradingLevel}</h2>
          <div className={`${skillLevel.bgColor} px-4 py-2 rounded-full flex items-center gap-2`}>
            <div className={`w-6 h-6 bg-gradient-to-r ${skillLevel.color} rounded-full flex items-center justify-center text-white`}>
              {skillLevel.icon}
            </div>
            <span className="text-sm font-semibold text-gray-700">{skillLevel.level}</span>
          </div>
        </div>

        {/* Progress Bar Section - Removed text labels */}
        <div className="mb-8">
          <div className="relative mb-8">
            <div className="h-3 rounded-full bg-gray-200 overflow-hidden">
              <div 
                className={`h-full bg-gradient-to-r ${skillLevel.color} rounded-full transition-all duration-1000 ease-out relative`}
                style={{ 
                  width: `${(responses.investmentReadiness / 10) * 100}%`
                }}
              >
                {/* Animated shine effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-pulse" />
              </div>
            </div>
          </div>

          {/* Optimized Stats Grid for Mobile */}
          <div className="grid grid-cols-2 gap-2 sm:gap-3">
            {/* Motivation Block */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-3 sm:p-4 border border-blue-100">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-blue-500 rounded-full mb-2">
                  <span className="text-lg sm:text-xl">🎯</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium mb-1 leading-tight">
                  {t.motivation}
                </span>
                <span className="text-sm sm:text-base font-bold text-blue-700">
                  {t.high}
                </span>
              </div>
            </div>

            {/* Potential Block */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-3 sm:p-4 border border-green-100">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-green-500 rounded-full mb-2">
                  <span className="text-lg sm:text-xl">⭐</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium mb-1 leading-tight">
                  {t.potential}
                </span>
                <span className="text-sm sm:text-base font-bold text-green-700">
                  {t.high}
                </span>
              </div>
            </div>

            {/* Income Block */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-3 sm:p-4 border border-purple-100">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-purple-500 rounded-full mb-2">
                  <span className="text-lg sm:text-xl">💰</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium mb-1 leading-tight">
                  {t.income}
                </span>
                <span className="text-sm sm:text-base font-bold text-purple-700 leading-tight">
                  {t.fitForInvesting}
                </span>
              </div>
            </div>

            {/* Knowledge Block */}
            <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-3 sm:p-4 border border-orange-100">
              <div className="flex flex-col items-center text-center">
                <div className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-orange-500 rounded-full mb-2">
                  <span className="text-lg sm:text-xl">📚</span>
                </div>
                <span className="text-xs sm:text-sm text-gray-600 font-medium mb-1 leading-tight">
                  {t.knowledge}
                </span>
                <span className="text-xs sm:text-sm font-bold text-orange-700 leading-tight text-center px-1">
                  {(() => {
                    // Get translated knowledge text
                    const getKnowledgeText = (knowledge: string) => {
                      const knowledgeTranslations = {
                        'I have experience': t.experiencedWantImprove,
                        'I know basics': t.heardSomething,
                        "No, but I'd like to know": t.noButWantToKnow
                      };
                      return knowledgeTranslations[knowledge as keyof typeof knowledgeTranslations] || knowledge;
                    };
                    
                    const translatedText = getKnowledgeText(responses.tradingKnowledge);
                    return translatedText.length > 20 
                      ? `${translatedText.substring(0, 20)}...` 
                      : translatedText;
                  })()
                  }
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Market Recommendations */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">{t.basedOnChosenMarket}</h2>
        <div className="space-y-3">
          {responses.marketInterests.map((market, index) => {
            const recommendation = getMarketRecommendation(market);
            if (!recommendation) return null;
            
            return (
              <button 
                key={index}
                onClick={() => setSelectedMarket(market)}
                className="w-full text-left bg-white rounded-xl shadow-sm border border-gray-100 p-4 hover:border-[#4F46E5] hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start gap-3">
                  <div className={`${recommendation.color} bg-opacity-10 rounded-lg p-3 flex-shrink-0`}>
                    <div className={`${recommendation.color} rounded-md p-1 text-white`}>
                      {recommendation.icon}
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900 text-base">{getMarketName(market)}</h3>
                      <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    </div>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {recommendation.text}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Continue Button */}
      <div className="text-center">
        <SurveyButton 
          onClick={onNext} 
          className="w-full bg-gradient-to-r from-[#4F46E5] to-[#7C3AED] hover:from-[#4338CA] hover:to-[#6D28D9] text-white text-lg py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          {t.continue}
        </SurveyButton>
      </div>

      {/* Market Info Popup */}
      {selectedMarket && (
        <MarketPopup 
          market={selectedMarket} 
          onClose={() => setSelectedMarket(null)} 
        />
      )}
    </div>
  );
};

export default WealthGrowthProfile;