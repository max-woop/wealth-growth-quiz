import React, { useEffect } from 'react';
import { TradingPersona } from '../../types/survey';
import { CheckCircle, ArrowRight, Shield, Award, Users, Clock, Star, TrendingUp, Smartphone, Globe, Trophy, Download, Play, BookOpen, Target, BarChart3, Zap, DollarSign, Lock, Gift, MessageCircle, TrendingDown, Brain, Copy, Repeat, Apple, ChevronRight, X } from 'lucide-react';
import { useSurvey } from '../../context/SurveyContext';
import { trackFacebookEvent, FacebookEvents } from '../../utils/facebookPixel';

interface ResultsStepProps {
  persona: TradingPersona | null;
  responses: any;
  restart: () => void;
  isPremium?: boolean;
}

interface MarketPopupProps {
  market: string;
  onClose: () => void;
  t: any;
}

const MarketPopup: React.FC<MarketPopupProps> = ({ market, onClose, t }) => {
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

const ResultsStep: React.FC<ResultsStepProps> = ({ persona, responses, restart, isPremium }) => {
  const { t, language } = useSurvey();
  const [selectedMarket, setSelectedMarket] = React.useState<string | null>(null);
  
  // Remove any potential overlay issues
  useEffect(() => {
    // Ensure body doesn't have loading class that might block interactions
    document.body.classList.remove('loading');
    
    // Remove any potential pointer-events blocking
    document.body.style.pointerEvents = 'auto';
    
    return () => {
      // Cleanup on unmount
      document.body.style.pointerEvents = '';
    };
  }, []);
  
  // Get the appropriate URL based on language
  const getGuideUrl = () => {
    switch (language) {
      case 'es':
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-ES-AR.pdf';
      case 'ru':
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-RU%28CIS%29.pdf';
      case 'en':
      default:
        return 'https://promo.libertex.org/lp/es-lm/trading-guide/pdf/LBX-guide-ES-AR.pdf';
    }
  };
  
  // Track guide download clicks
  const handleGuideDownload = () => {
    trackFacebookEvent(FacebookEvents.GUIDE_DOWNLOAD_CLICKED);
    
    // Track additional Meta pixel event for Results page CTA
    trackFacebookEvent('Purchase', {
      content_name: 'Trading Guide Download',
      content_category: 'guide_download',
      content_type: 'pdf',
      value: 97, // Guide value as mentioned in the UI
      currency: 'USD'
    });
    
    // Try to download PDF in background, fallback to new tab if needed
    try {
      const link = document.createElement('a');
      link.href = getGuideUrl();
      link.download = 'libertex-trading-guide.pdf';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      // Fallback: open in new tab if download fails
      window.open(getGuideUrl(), '_blank', 'noopener,noreferrer');
    }
  };

  // Get skill level based on investment readiness
  const getSkillLevel = () => {
    const readiness = responses.investmentReadiness || 5;
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
          icon: <BarChart3 className="w-4 h-4" />,
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
          icon: <BarChart3 className="w-4 h-4" />,
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
    }
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
  
  // Get testimonials based on language
  const getTestimonials = () => {
    if (language === 'es') {
      return [
        {
          name: "Pavel",
          role: "Nuevo Trader",
          initial: "P",
          text: "\"La guía de Libertex finalmente me hizo entender el trading. Clara, rápida y súper práctica, perfecta para principiantes que quieren resultados reales\""
        },
        {
          name: "Sergei",
          role: "Trader de Medio Tiempo",
          initial: "S",
          text: "\"Las herramientas simplemente funcionan. Desde indicadores técnicos hasta alertas instantáneas, Libertex me ayuda a detectar y actuar sobre oportunidades más rápido\""
        }
      ];
    } else if (language === 'ru') {
      return [
        {
          name: "Павел",
          role: "Начинающий трейдер",
          initial: "П",
          text: "«Руководство от Libertex помогло мне наконец-то разобраться в трейдинге. Всё чётко, быстро и по делу — идеально для новичков, которые хотят реальных результатов!»"
        },
        {
          name: "Сергей",
          role: "Трейдер-любитель",
          initial: "С",
          text: "«Инструменты реально работают. В Libertex есть всё — от индикаторов до уведомлений в реальном времени. Они действительно помогают быстрее находить прибыльные возможности и сразу их использовать!»"
        }
      ];
    } else {
      return [
        {
          name: "Pavel",
          role: "New Trader",
          initial: "P",
          text: "\"Libertex's guide made trading finally click for me. Clear, fast, and super practical, perfect for beginners who want real results\""
        },
        {
          name: "Sergei",
          role: "Part-time Trader",
          initial: "S",
          text: "\"The tools just work. From technical indicators to instant alerts, Libertex helps me spot and act on opportunities faster\""
        }
      ];
    }
  };

  // Get trading tools section title based on language
  const getTradingToolsTitle = () => {
    if (language === 'es') {
      return "¿Por qué Libertex™? Prueba Nuestras Herramientas de Trading Inteligentes";
    } else if (language === 'ru') {
      return "Умные торговые стратегии для вашей прибыльной торговли с приложением Libertex:";
    } else {
      return "Why Libertex™? Try Our Smart Trading Tools";
    }
  };

  // Get main CTA button text based on language
  const getMainCTAText = () => {
    if (language === 'es') {
      return "OBTENER LA GUÍA";
    } else if (language === 'ru') {
      return "ПОЛУЧИТЬ ГАЙД";
    } else {
      return "GET THE GUIDE";
    }
  };

  // Get app download URLs based on language
  const getAppStoreUrls = () => {
    switch (language) {
      case 'ru':
        return {
          ios: 'https://lbxfcil.onelink.me/O6uJ/r80xfrti',
          android: 'https://lbxfcil.onelink.me/O6uJ/r80xfrti'
        };
      case 'es':
        return {
          ios: 'https://lbxfcil.onelink.me/O6uJ/vmacbwsg',
          android: 'https://lbxfcil.onelink.me/O6uJ/vmacbwsg'
        };
      case 'en':
      default:
        return {
          ios: 'https://apps.apple.com/app/libertex-online-trading/id1012171869',
          android: 'https://play.google.com/store/apps/details?id=com.libertex.mobiletrader'
        };
    }
  };

  // Track app store clicks
  const handleAppStoreClick = (store: string) => {
    trackFacebookEvent('AppStoreClick', {
      content_name: 'App Store Click',
      store: store
    });
    
    // Track additional Facebook event for app downloads
    trackFacebookEvent('InitiateCheckout', {
      content_name: 'Mobile App Download',
      content_category: 'app_download',
      content_type: 'mobile_app',
      store: store,
      value: 0,
      currency: 'USD'
    });
  };

  const testimonials = getTestimonials();
  const appUrls = getAppStoreUrls();
  
  return (
    <div className="animate-fadeIn py-3 px-3 max-w-md mx-auto">
      {/* Hero Section - Enhanced Design */}
      <div className="text-center mb-4 md:mb-6">
        <div className="inline-block bg-gradient-to-r from-[#00B915] to-[#00A012] text-white px-6 py-2 rounded-full mb-4 shadow-lg">
          <span className="text-sm font-bold">✅ {language === 'ru' ? 'ГОТОВО' : language === 'es' ? 'LISTO' : 'READY'}</span>
        </div>
        
        <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-3 md:mb-4 leading-tight px-2">
          {t.stepByStepGuideReady}
        </h1>
        
        <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto mb-4 md:mb-6 leading-relaxed px-2">
          {t.guideWaitingDescription}
        </p>
        
        {/* Enhanced Main CTA Button */}
        <div className="relative inline-block">
          <button 
            onClick={handleGuideDownload}
            className="relative bg-gradient-to-r from-[#FF6B35] to-[#FF5722] hover:from-[#FF5722] hover:to-[#E64A19] text-white py-3 px-4 sm:py-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base md:text-lg transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 overflow-hidden group w-full sm:w-auto max-w-xs mx-auto"
          >
            {/* Animated background effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            {/* Button content */}
            <div className="relative flex items-center justify-center gap-2">
              <Download className="w-4 h-4" />
              {getMainCTAText()}
            </div>
            
            {/* Pulse effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#FF6B35] to-[#FF5722] animate-pulse opacity-75 -z-10" />
          </button>
          
          {/* Badge removed to match provided layout */}
        </div>
      </div>

      {/* Wealth Growth Profile Section (hidden per provided layout) */}
      {false && (
      <div className="mb-6 md:mb-8">
        <div className="text-center mb-4">
          <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-2 leading-tight px-2">
            {t.checkWealthGrowthProfile}
          </h2>
        </div>

        {/* Main Profile Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-5 mb-4">
          {/* Header with Level Badge */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-3 gap-2">
            <h3 className="text-sm sm:text-base font-bold text-gray-900">{t.tradingLevel}</h3>
            <div className={`${skillLevel.bgColor} px-4 py-2 rounded-full flex items-center gap-2`}>
              <div className={`w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-r ${skillLevel.color} rounded-full flex items-center justify-center text-white`}>
                {skillLevel.icon}
              </div>
              <span className="text-xs sm:text-sm font-semibold text-gray-700">{skillLevel.level}</span>
            </div>
          </div>

          {/* Progress Bar Section */}
          <div className="mb-6">
            <div className="relative mb-4">
              <svg className="w-full h-8" viewBox="0 0 100 8" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#FF6B35" />
                    <stop offset="100%" stopColor="#FF5722" />
                  </linearGradient>
                </defs>
                <line x1="0" y1="4" x2="100" y2="4" stroke="#E5E7EB" strokeWidth="2" />
                <line x1="0" y1="4" x2={`${((responses.investmentReadiness || 5) / 10) * 100}`} y2="4" stroke="url(#grad)" strokeWidth="3" />
                <circle cx={`${((responses.investmentReadiness || 5) / 10) * 100}`} cy="4" r="2.5" fill="#FF6B35">
                  <animate attributeName="cx" from="0" to={`${((responses.investmentReadiness || 5) / 10) * 100}`} dur="1s" fill="freeze" />
                </circle>
              </svg>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-2">
              {/* Motivation Block */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-2 border border-blue-100">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-6 h-6 bg-blue-500 rounded-full mb-1">
                    <span className="text-sm">🎯</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium mb-0.5 leading-tight">
                    {t.motivation}
                  </span>
                  <span className="text-xs font-bold text-blue-700">
                    {t.high}
                  </span>
                </div>
              </div>

              {/* Potential Block */}
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-2 border border-green-100">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full mb-1">
                    <span className="text-sm">⭐</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium mb-0.5 leading-tight">
                    {t.potential}
                  </span>
                  <span className="text-xs font-bold text-green-700">
                    {t.high}
                  </span>
                </div>
              </div>

              {/* Income Block */}
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-2 border border-purple-100">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-6 h-6 bg-purple-500 rounded-full mb-1">
                    <span className="text-sm">💰</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium mb-0.5 leading-tight">
                    {t.income}
                  </span>
                  <span className="text-xs font-bold text-purple-700 leading-tight">
                    {t.fitForInvesting}
                  </span>
                </div>
              </div>

              {/* Knowledge Block */}
              <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-lg p-2 border border-orange-100">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center w-6 h-6 bg-orange-500 rounded-full mb-1">
                    <span className="text-sm">📚</span>
                  </div>
                  <span className="text-xs text-gray-600 font-medium mb-0.5 leading-tight">
                    {t.knowledge}
                  </span>
                  <span className="text-xs font-bold text-orange-700 leading-tight text-center px-1">
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
                      
                      const translatedText = getKnowledgeText(responses.tradingKnowledge || '');
                      return translatedText.length > 12 
                        ? `${translatedText.substring(0, 12)}...` 
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
        {responses.marketInterests && responses.marketInterests.length > 0 && (
          <div className="mb-4">
            <h3 className="text-sm sm:text-base font-bold text-gray-900 mb-3 px-2">{t.basedOnChosenMarket}</h3>
            <div className="space-y-3">
              {responses.marketInterests.map((market: string, index: number) => {
                const recommendation = getMarketRecommendation(market);
                if (!recommendation) return null;
                
                return (
                  <button 
                    key={index}
                    onClick={() => setSelectedMarket(market)}
                    className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-100 p-2.5 hover:border-[#4F46E5] hover:shadow-md transition-all duration-300"
                  >
                    <div className="flex items-start gap-2">
                      <div className={`${recommendation.color} bg-opacity-10 rounded-lg p-1.5 flex-shrink-0`}>
                        <div className={`${recommendation.color} rounded-md p-1 text-white`}>
                          {recommendation.icon}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-bold text-gray-900 text-sm">{getMarketName(market)}</h4>
                          <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                        </div>
                        <p className="text-gray-600 text-xs leading-relaxed">
                          {recommendation.text}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
      )}

      {/* Trust cards */}
      <div className="mb-6 md:mb-8 space-y-3">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">25+</div>
          <div className="text-sm text-gray-700">{t.yearsInMarket}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">3M+</div>
          <div className="text-sm text-gray-700">{t.clientsWorldwide}</div>
        </div>
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 text-center">
          <div className="text-2xl font-extrabold text-gray-900 mb-1">24/7</div>
          <div className="text-sm text-gray-700">{t.support247}</div>
        </div>
      </div>

      {/* Enhanced Testimonials Section */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center mb-4 px-2">
          {t.seeWhatUsersSay}
        </h2>
        
        <div className="space-y-3 max-w-4xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-3 rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-[#FF6B35] to-[#FF5722] rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
                  <span className="text-white font-bold text-sm">{testimonial.initial}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 mb-2">
                    <span className="font-bold text-gray-900 text-sm">{testimonial.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{testimonial.role}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm leading-relaxed italic">
                    {testimonial.text}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Trading Tools Section - Removed White Borders */}
      <div className="mb-6 md:mb-8">
        <h2 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 text-center mb-4 leading-tight px-2">
          {getTradingToolsTitle()}
        </h2>
        
        <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
          {/* Enhanced tool cards without white borders */}
          {[
            { icon: MessageCircle, title: t.chatGPT, gradient: 'from-green-400 to-blue-500' },
            { icon: BarChart3, title: t.tradingSignals, gradient: 'from-purple-400 to-pink-500' },
            { icon: Brain, title: t.tradingIdeas, gradient: 'from-yellow-400 to-orange-500' },
            { icon: Repeat, title: t.autoTrading, gradient: 'from-blue-400 to-indigo-500' },
            { icon: DollarSign, title: t.quickTakeProfit, gradient: 'from-green-400 to-emerald-500' },
            { icon: Copy, title: t.copyTrading, gradient: 'from-red-400 to-pink-500' }
          ].map((tool, index) => (
            <div key={index} className="text-center bg-white rounded-xl p-4 shadow-sm border border-gray-100">
              <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-orange-100 flex items-center justify-center">
                <tool.icon className="w-5 h-5 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 text-xs leading-tight">{tool.title}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Enhanced Bottom CTA */}
      <div className="text-center mb-6 md:mb-8">
        <button 
          onClick={handleGuideDownload}
          className="w-full sm:w-auto bg-gradient-to-r from-[#FF6B35] to-[#FF5722] hover:from-[#FF5722] hover:to-[#E64A19] text-white py-3 px-4 sm:py-4 sm:px-6 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center gap-2 group max-w-xs mx-auto"
        >
          <Download className="w-4 h-4 group-hover:animate-bounce" />
          {getMainCTAText()}
        </button>
      </div>

      {/* App Download Section (hidden) */}
      {false && (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4 sm:p-5 mb-6">
        <div className="text-center mb-4">
          <div className="inline-block p-2 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-full mb-3">
            <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
          </div>
          <h2 className="text-sm sm:text-base font-bold text-gray-900 mb-2">
            {language === 'ru' ? 'Мобильное приложение' : 
             language === 'es' ? 'Aplicación móvil' : 
             'Mobile App'}
          </h2>
          <p className="text-xs sm:text-sm text-gray-600">
            {language === 'ru' ? 'Торгуйте в любое время и в любом месте' : 
             language === 'es' ? 'Opera en cualquier momento y lugar' : 
             'Trade anytime, anywhere'}
          </p>
        </div>

        {/* App Store Buttons */}
        <div className="flex flex-col sm:flex-row gap-2 justify-center mb-3">
          <a
            href={appUrls.ios}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAppStoreClick('App Store')}
            className="flex items-center justify-center gap-2 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Apple className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs opacity-75">
                {language === 'ru' ? 'Скачать в' : 
                 language === 'es' ? 'Descargar en' : 
                 'Download on the'}
              </div>
              <div className="text-xs sm:text-sm font-semibold">App Store</div>
            </div>
          </a>

          <a
            href={appUrls.android}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleAppStoreClick('Google Play')}
            className="flex items-center justify-center gap-2 bg-black text-white py-2 px-3 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Play className="w-4 h-4" />
            <div className="text-left">
              <div className="text-xs opacity-75">
                {language === 'ru' ? 'Скачать в' : 
                 language === 'es' ? 'Descargar en' : 
                 'Get it on'}
              </div>
              <div className="text-xs sm:text-sm font-semibold">Google Play</div>
            </div>
          </a>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg mb-1">📱</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Удобный интерфейс' : 
               language === 'es' ? 'Interfaz intuitiva' : 
               'User-friendly'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg mb-1">⚡</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Быстрое исполнение' : 
               language === 'es' ? 'Ejecución rápida' : 
               'Fast execution'}
            </div>
          </div>
          <div className="bg-gray-50 rounded-lg p-2">
            <div className="text-lg mb-1">🔒</div>
            <div className="text-sm font-medium text-gray-900">
              {language === 'ru' ? 'Безопасность' : 
               language === 'es' ? 'Seguridad' : 
               'Secure'}
            </div>
          </div>
        </div>
      </div>
      )}

      {/* Market Info Popup */}
      {selectedMarket && (
        <MarketPopup 
          market={selectedMarket} 
          onClose={() => setSelectedMarket(null)}
          t={t}
        />
      )}

      {/* Footer Actions */}
      <div className="text-center space-y-3 mb-4">
        <button
          onClick={restart}
          className="text-gray-500 hover:text-[#4F46E5] transition-colors text-sm underline font-medium"
        >
          {t.retakeQuiz}
        </button>
      </div>

      {/* Risk Warning */}
      <div className="mt-4 p-3 sm:p-4 bg-gray-50 rounded-xl border border-gray-200">
        <div className="flex items-start gap-2">
          <div className="w-5 h-5 text-yellow-600 flex items-center justify-center flex-shrink-0">
            <Shield className="w-4 h-4" />
          </div>
          <div>
            <p className="text-xs text-gray-600 leading-tight">
              <strong className="text-gray-800">{t.riskWarning}</strong> {t.riskWarningText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsStep;