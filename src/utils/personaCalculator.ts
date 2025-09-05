import { SurveyResponse, TradingPersona } from '../types/survey';

export const calculateTradingPersona = (responses: SurveyResponse): TradingPersona => {
  // Calculate risk profile
  const riskScore = responses.riskTolerance;
  const isRiskAverse = riskScore <= 3;
  const isModerateRisk = riskScore > 3 && riskScore <= 7;
  const isRiskTolerant = riskScore > 7;

  // Experience level assessment
  const isNewbie = responses.experience === "I'm just getting started";
  const isBeginnerTrader = responses.experience === "Less than a year";
  const isIntermediateTrader = responses.experience === "1-3 years";
  const isExperiencedTrader = responses.experience === "Over 3 years";

  // Trading frequency impact
  const isDayTrader = responses.tradingFrequency === "Multiple times a day";
  const isRegularTrader = responses.tradingFrequency === "Once a day";
  const isSwingTrader = responses.tradingFrequency === "A few times a week";
  const isOccasionalTrader = responses.tradingFrequency === "Occasionally";

  // Trading instruments preference
  const hasMultipleMarkets = responses.marketInterests?.length > 2;
  const tradesCrypto = responses.marketInterests?.includes("Cryptocurrencies");
  const tradesStocks = responses.marketInterests?.includes("Stocks");
  const tradesForex = responses.marketInterests?.includes("Forex");

  // Age-based considerations
  const isYoungTrader = responses.age === "18-24" || responses.age === "25-34";
  const isMatureTrader = responses.age === "45-54" || responses.age === "55+";

  // Goal-oriented assessment
  const isIncomeGoal = responses.tradingGoal === "Generate short-term income";
  const isWealthGoal = responses.tradingGoal === "Build long-term wealth";
  const isDiversificationGoal = responses.tradingGoal === "Diversify my investment portfolio";
  const isLearningGoal = responses.tradingGoal === "Learn and gain experience";

  // Determine primary persona characteristics
  if (isNewbie) {
    if (isRiskAverse) {
      return {
        title: "Conservative Learner",
        description: `As a new trader focusing on ${responses.marketInterests?.join(" and ") || "various markets"}, 
                     your cautious approach will help build a strong foundation. Your preference for 
                     ${responses.tradingFrequency?.toLowerCase() || "regular"} trading shows good risk awareness.`,
        tips: [
          "Start with paper trading to practice risk-free",
          `Focus on understanding ${tradesStocks ? "fundamental analysis" : "market basics"}`,
          "Keep position sizes small while learning",
          `Set aside dedicated time for ${isOccasionalTrader ? "weekly" : "daily"} market analysis`,
          "Join our beginner-friendly trading community"
        ]
      };
    } else if (isRiskTolerant) {
      return {
        title: "Ambitious Newcomer",
        description: `Your enthusiasm for ${responses.marketInterests?.join(" and ") || "trading"} combined with 
                     ${responses.tradingFrequency?.toLowerCase() || "regular"} trading shows high potential. Channel 
                     your energy into structured learning and risk management.`,
        tips: [
          "Start with a demo account to test strategies",
          `Learn about ${tradesCrypto ? "cryptocurrency market cycles" : "market fundamentals"}`,
          "Implement strict stop-loss rules",
          "Focus on one market before diversifying",
          "Consider joining our mentorship program"
        ]
      };
    }
  }

  if (isIntermediateTrader || isBeginnerTrader) {
    if (isDayTrader || isRegularTrader) {
      return {
        title: "Active Growth Trader",
        description: `With ${responses.experience} of experience in ${responses.marketInterests?.join(", ") || "trading"}, 
                     you're developing a solid trading routine. Your ${responses.tradingFrequency?.toLowerCase() || "regular"} 
                     approach shows dedication to the markets.`,
        tips: [
          `Optimize your ${isDayTrader ? "intraday" : "daily"} trading strategy`,
          "Implement advanced risk management techniques",
          `Focus on ${tradesForex ? "currency correlations" : "market sectors"}`,
          "Start tracking your trading metrics",
          "Consider automated trading tools"
        ]
      };
    } else {
      return {
        title: "Strategic Builder",
        description: `Your balanced approach to ${responses.marketInterests?.join(" and ") || "trading"} trading 
                     shows maturity. ${responses.tradingFrequency || "Regular"} trading suits your strategic style.`,
        tips: [
          "Develop a comprehensive trading plan",
          `Focus on ${isWealthGoal ? "long-term positions" : "swing trading"}`,
          "Use multiple timeframe analysis",
          "Consider position sizing techniques",
          "Join our advanced strategy workshops"
        ]
      };
    }
  }

  if (isExperiencedTrader) {
    if (isRiskTolerant && hasMultipleMarkets) {
      return {
        title: "Professional Multi-Market Trader",
        description: `With over 3 years of experience across ${responses.marketInterests?.join(", ") || "multiple markets"}, 
                     you've developed a sophisticated approach to the markets. Your ${riskScore}/10 risk 
                     tolerance enables strategic opportunities.`,
        tips: [
          "Explore advanced derivatives strategies",
          "Implement cross-market arbitrage",
          "Develop custom trading algorithms",
          "Optimize your portfolio allocation",
          "Consider mentoring other traders"
        ]
      };
    } else {
      return {
        title: "Seasoned Market Specialist",
        description: `Your focused expertise in ${responses.marketInterests?.join(" and ") || "your chosen markets"} combined 
                     with a ${isRiskAverse ? "conservative" : "balanced"} approach has served you well. 
                     Your ${responses.tradingFrequency?.toLowerCase() || "regular"} trading rhythm shows discipline.`,
        tips: [
          "Fine-tune your risk management system",
          "Explore institutional trading strategies",
          "Consider portfolio diversification",
          "Develop proprietary indicators",
          "Join our expert trading network"
        ]
      };
    }
  }

  // Default persona for unique combinations
  return {
    title: "Balanced Market Participant",
    description: `Your approach to ${responses.marketInterests?.join(" and ") || "trading"} trading balances 
                 opportunity with risk management. Trading ${responses.tradingFrequency?.toLowerCase() || "regularly"} 
                 suits your style and goals.`,
    tips: [
      `Focus on ${isIncomeGoal ? "consistent income strategies" : "portfolio growth"}`,
      "Develop a structured trading plan",
      `Master ${hasMultipleMarkets ? "multi-market analysis" : "market specialization"}`,
      "Implement position sizing rules",
      "Join our trading community"
    ]
  };
};