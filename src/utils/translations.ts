export type Language = 'en' | 'ru' | 'es';

interface Translations {
  // Welcome and basic
  wealthGrowthChallenge: string;
  oneMinuteBadge: string;
  takeQuizDescription: string;
  male: string;
  female: string;
  continue: string;
  
  // Age step
  ageRangeQuestion: string;
  ageRangeDescription: string;
  
  // Main goal step
  mainGoalQuestion: string;
  financialFreedom: string;
  professionalGrowth: string;
  workLifeBalance: string;
  beMyOwnBoss: string;
  
  // Income source step
  incomeSourceQuestion: string;
  fullTimeJob: string;
  businessOwner: string;
  freelancer: string;
  other: string;
  
  // Financial situation step
  financialSituationQuestion: string;
  veryComfortable: string;
  comfortable: string;
  gettingBy: string;
  needImprovement: string;
  
  // Monthly income step
  monthlyIncomeQuestion: string;
  under3000: string;
  income3000to5000: string;
  income5000to10000: string;
  over10000: string;
  dontWantToShare: string;
  incomeDisclaimer: string;
  
  // Job challenges step
  jobChallengesQuestion: string;
  feelingUnderpaid: string;
  financialDependence: string;
  constantWorry: string;
  noFreeTime: string;
  routine: string;
  
  // Life satisfaction step
  lifeSatisfactionQuestion: string;
  verySatisfied: string;
  verySatisfiedEmoji: string;
  somewhatSatisfied: string;
  somewhatSatisfiedEmoji: string;
  neutral: string;
  neutralEmoji: string;
  notSatisfied: string;
  notSatisfiedEmoji: string;
  
  // Money barrier step
  moneyBarrierQuestion: string;
  moneyBarrierDescription: string;
  definitelyYes: string;
  definitelyYesEmoji: string;
  somewhat: string;
  somewhatEmoji: string;
  notReally: string;
  notReallyEmoji: string;
  notAtAll: string;
  notAtAllEmoji: string;
  
  // Extra money use step
  extraMoneyUseQuestion: string;
  extraMoneyUseDescription: string;
  travelMore: string;
  buyAHome: string;
  startBusiness: string;
  saveFuture: string;
  
  // Financial confidence step
  financialConfidenceQuestion: string;
  financialConfidenceDescription: string;
  veryConfident: string;
  veryConfidentEmoji: string;
  positiveView: string;
  positiveViewEmoji: string;
  needGuidance: string;
  needGuidanceEmoji: string;
  
  // Wealthy retirement step
  wealthyRetirementQuestion: string;
  probablyYes: string;
  notSure: string;
  no: string;
  
  // Saving money step
  savingMoneyQuestion: string;
  veryEasy: string;
  veryEasyEmoji: string;
  somewhatEasy: string;
  somewhatEasyEmoji: string;
  difficult: string;
  difficultEmoji: string;
  veryDifficult: string;
  veryDifficultEmoji: string;
  
  // Money earning step
  moneyEarningQuestion: string;
  yesSuccessfully: string;
  mixedResults: string;
  noInterested: string;
  noExperience: string;
  
  // Wealth growth step
  wealthGrowthQuestion: string;
  veryInterested: string;
  notInterested: string;
  
  // Trading knowledge step
  tradingKnowledgeQuestion: string;
  experiencedWantImprove: string;
  heardSomething: string;
  noButWantToKnow: string;
  
  // Passive income step
  passiveIncomeQuestion: string;
  rateYourExperience: string;
  low: string;
  medium: string;
  high: string;
  // removed duplicate key; use readyToLearnBasics in passive income section
  readyToLearnBasics: string; // For passive income low level
  someExp: string;
  yearsOfExp: string;
  
  // Market interests step
  marketInterestsQuestion: string;
  selectAll: string;
  stocks: string;
  forex: string;
  crypto: string;
  commodities: string;
  indices: string;
  
  // Investment readiness step
  investmentReadinessQuestion: string;
  investmentReadinessDescription: string;
  gettingStarted: string;
  buildingFoundations: string;
  readyToLearn: string;
  gainingConfidence: string;
  readyToTrade: string;
  preparedForSuccess: string;
  intermediate: string;
  expert: string;
  
  // Special achievement step
  specialGoalQuestion: string;
  buyHouse: string;
  buyCar: string;
  earlyRetire: string;
  travelWorld: string;
  wedding: string;
  education: string;
  
  // Time commitment step
  timeCommitmentQuestion: string;
  timeCommitmentDescription: string;
  oneToTwoHoursDaily: string;
  threeToFourHoursWeekly: string;
  fiveToSixHoursMonthly: string;
  flexible: string;
  
  // Trust elements
  trustElement1: string;
  trustElement2Positive: string;
  trustElement2Negative: string;
  trustElement3: string;
  trustElement4Positive: string;
  trustElement4Negative: string;
  trustElement5: string;
  
  // Wealth growth profile
  checkWealthGrowthProfile: string;
  tradingLevel: string;
  beginnerInvestor: string;
  beginnerDescription: string;
  confidentParticipant: string;
  confidentDescription: string;
  advancedUser: string;
  advancedDescription: string;
  basedOnChosenMarket: string;
  motivation: string;
  potential: string;
  income: string;
  fitForInvesting: string;
  knowledge: string;
  
  // Market recommendations
  stocksRecommendation: string;
  forexRecommendation: string;
  cryptoRecommendation: string;
  commoditiesRecommendation: string;
  indicesRecommendation: string;
  
  // Market descriptions
  stocksDescription: string;
  stocksAdvantages: string[];
  stocksTips: string[];
  forexDescription: string;
  forexAdvantages: string[];
  forexTips: string[];
  cryptoDescription: string;
  cryptoAdvantages: string[];
  cryptoTips: string[];
  commoditiesDescription: string;
  commoditiesAdvantages: string[];
  commoditiesTips: string[];
  indicesDescription: string;
  indicesAdvantages: string[];
  indicesTips: string[];
  advantages: string;
  tradingTips: string;
  
  // Personal wealth challenge
  personalWealthChallenge: string;
  personalWealthChallengeDesc: string;
  yourSixWeekJourney: string;
  week12: string;
  week34: string;
  week56: string;
  masterTradingBasics: string;
  masterTradingBasicsDesc: string;
  technicalAnalysis: string;
  technicalAnalysisDesc: string;
  advancedStrategies: string;
  advancedStrategiesDesc: string;
  continueToNextStep: string;
  
  // Investing skills
  investingSkillsLevel: string;
  now: string;
  afterSixWeeks: string;
  week1: string;
  week2: string;
  week4: string;
  week6: string;
  yourPotentialIsHigh: string;
  yourPotentialIsHighDesc: string;
  
  // Lead capture
  leadCaptureTitle: string;
  leadCaptureDescription: string;
  firstName: string;
  email: string;
  password: string;
  phone: string;
  openAccount: string;
  privacyNotice: string;
  
  // Results page
  stepByStepGuideReady: string;
  guideWaitingDescription: string;
  yearsInMarket: string;
  clientsWorldwide: string;
  support247: string;
  seeWhatUsersSay: string;
  chatGPT: string;
  tradingSignals: string;
  tradingIdeas: string;
  autoTrading: string;
  quickTakeProfit: string;
  copyTrading: string;
  limitedTimeOffer: string;
  limitedTimeOfferDesc: string;
  claimBonusNow: string;
  offerExpires: string;
  retakeQuiz: string;
  riskWarning: string;
  riskWarningText: string;
  
  // Loading steps
  creatingProfile: string;
  analyzingGoals: string;
  calculatingPotential: string;
  preparingRecommendations: string;
  buildingChallenge: string;
  settingMilestones: string;
  creatingRoadmap: string;
  customizingStrategies: string;
  analyzingPotential: string;
  evaluatingKnowledge: string;
  assessingRisk: string;
  preparingInsights: string;
  preparingResults: string;
  analyzingResponses: string;
  creatingPersonalizedInsights: string;
  finalizingRecommendations: string;
}

const translations: Record<Language, Translations> = {
  en: {
    // Welcome and basic
    wealthGrowthChallenge: "Wealth Growth Challenge",
    oneMinuteBadge: "⏱️ 1 minute quiz",
    takeQuizDescription: "Take this quick quiz to discover your personalized wealth-building strategy",
    male: "Male",
    female: "Female",
    continue: "Continue",
    
    // Age step
    ageRangeQuestion: "What's your age range?",
    ageRangeDescription: "This helps us personalize your trading recommendations",
    
    // Main goal step
    mainGoalQuestion: "What's your main goal?",
    financialFreedom: "💰 Financial Freedom",
    professionalGrowth: "📈 Professional Growth",
    workLifeBalance: "⚖️ Work-Life Balance",
    beMyOwnBoss: "👑 Be My Own Boss",
    
    // Income source step
    incomeSourceQuestion: "What's your main source of income?",
    fullTimeJob: "💼 Full-time Job",
    businessOwner: "🏢 Business Owner",
    freelancer: "💻 Freelancer",
    other: "🔄 Other",
    
    // Financial situation step
    financialSituationQuestion: "How would you describe your current financial situation?",
    veryComfortable: "Very Comfortable",
    comfortable: "Comfortable",
    gettingBy: "Getting By",
    needImprovement: "Need Improvement",
    
    // Monthly income step
    monthlyIncomeQuestion: "What's your approximate monthly income?",
    under3000: "Under $3,000",
    income3000to5000: "$3,000 - $5,000",
    income5000to10000: "$5,000 - $10,000",
    over10000: "Over $10,000",
    dontWantToShare: "I don't want to share",
    incomeDisclaimer: "This information helps us provide better recommendations and is kept confidential.",
    
    // Job challenges step
    jobChallengesQuestion: "What's your biggest challenge with your current job?",
    feelingUnderpaid: "💸 Feeling underpaid",
    financialDependence: "🔗 Financial dependence",
    constantWorry: "😰 Constant worry",
    noFreeTime: "⏰ No free time",
    routine: "🔄 Routine",
    
    // Life satisfaction step
    lifeSatisfactionQuestion: "How satisfied are you with your current life?",
    verySatisfied: "Very Satisfied",
    verySatisfiedEmoji: "😊",
    somewhatSatisfied: "Somewhat Satisfied",
    somewhatSatisfiedEmoji: "🙂",
    neutral: "Neutral",
    neutralEmoji: "😐",
    notSatisfied: "Not Satisfied",
    notSatisfiedEmoji: "😔",
    
    // Money barrier step
    moneyBarrierQuestion: "Do you feel like money is a barrier to achieving your dreams?",
    moneyBarrierDescription: "Be honest - this helps us understand your motivation",
    definitelyYes: "Definitely Yes",
    definitelyYesEmoji: "😤",
    somewhat: "Somewhat",
    somewhatEmoji: "🤔",
    notReally: "Not Really",
    notReallyEmoji: "😌",
    notAtAll: "Not at All",
    notAtAllEmoji: "😎",
    
    // Extra money use step
    extraMoneyUseQuestion: "If you had extra money each month, what would you do with it?",
    extraMoneyUseDescription: "Choose what resonates most with you",
    travelMore: "✈️ Travel More",
    buyAHome: "🏠 Buy a Home",
    startBusiness: "🚀 Start Business",
    saveFuture: "💰 Save Future",
    
    // Financial confidence step
    financialConfidenceQuestion: "How confident do you feel about your financial future?",
    financialConfidenceDescription: "Your honest answer helps us tailor the right approach",
    veryConfident: "Very Confident",
    veryConfidentEmoji: "💪",
    positiveView: "Positive View",
    positiveViewEmoji: "👍",
    needGuidance: "Need Guidance",
    needGuidanceEmoji: "🤝",
    
    // Wealthy retirement step
    wealthyRetirementQuestion: "Do you believe you'll have a wealthy retirement?",
    probablyYes: "Probably Yes",
    notSure: "Not Sure",
    no: "No",
    
    // Saving money step
    savingMoneyQuestion: "How easy is it for you to save money each month?",
    veryEasy: "Very Easy",
    veryEasyEmoji: "😊",
    somewhatEasy: "Somewhat Easy",
    somewhatEasyEmoji: "🙂",
    difficult: "Difficult",
    difficultEmoji: "😕",
    veryDifficult: "Very Difficult",
    veryDifficultEmoji: "😰",
    
    // Money earning step
    moneyEarningQuestion: "Have you ever tried to make money outside your main job?",
    yesSuccessfully: "✅ Yes, Successfully",
    mixedResults: "⚖️ Mixed Results",
    noInterested: "❌ No, Interested",
    noExperience: "🆕 No Experience",
    
    // Wealth growth step
    wealthGrowthQuestion: "How interested are you in growing your wealth through trading?",
    veryInterested: "Very Interested",
    notInterested: "Not Interested",
    
    // Trading knowledge step
    tradingKnowledgeQuestion: "Do you know anything about trading or investing?",
    experiencedWantImprove: "📈 I have experience",
    heardSomething: "📚 I know basics",
    noButWantToKnow: "🆕 No, but I'd like to know",
    
    // Passive income step
    passiveIncomeQuestion: "How would you rate your knowledge of passive income strategies?",
    rateYourExperience: "Rate your experience from 1-10",
    low: "Low",
    medium: "Medium",
    high: "High",
    readyToLearnBasics: "Ready to learn the basics",
    someExp: "Some experience, want to improve",
    yearsOfExp: "Years of experience",
    
    // Market interests step
    marketInterestsQuestion: "Which markets interest you most?",
    selectAll: "Select all that apply",
    stocks: "📈 Stocks",
    forex: "💱 Currencies",
    crypto: "₿ Crypto",
    commodities: "🏆 Metals",
    indices: "📊 Indices",
    
    // Investment readiness step
    investmentReadinessQuestion: "How ready do you feel to start investing?",
    investmentReadinessDescription: "Rate your readiness from 1-10",
    gettingStarted: "Getting Started",
    buildingFoundations: "Building strong foundations",
    readyToLearn: "Ready to Learn",
    gainingConfidence: "Gaining confidence",
    readyToTrade: "Ready to Trade",
    preparedForSuccess: "Prepared for success",
    intermediate: "Intermediate",
    expert: "Expert",
    
    // Special achievement step
    specialGoalQuestion: "What's one special goal you'd like to achieve?",
    buyHouse: "🏠 Buy a house",
    buyCar: "🚗 Buy a car",
    earlyRetire: "🏖️ Early retire",
    travelWorld: "✈️ Travel world",
    wedding: "💒 Wedding",
    education: "🎓 Education",
    
    // Time commitment step
    timeCommitmentQuestion: "How much time can you dedicate to learning about trading?",
    timeCommitmentDescription: "Be realistic about your schedule",
    oneToTwoHoursDaily: "⏰ 1-2h daily",
    threeToFourHoursWeekly: "📅 3-4h weekly",
    fiveToSixHoursMonthly: "📆 5-6h monthly",
    flexible: "🔄 Flexible",
    
    // Trust elements
    trustElement1: "More than 3 million clients in 120+ countries have chosen Libertex, an award-winning platform",
    trustElement2Positive: "You're ready to level up!\nThis journey is built on expert insights and tailored content — made to match your skills and goals",
    trustElement2Negative: "No stress — we'll guide you step by step\nEvery stage is built on expert research and tailored to your skills, so you can grow with confidence",
    trustElement3: "We appreciate your trust — your information is safe with us\nJoin over 3 million players who've already begun their journey to financial freedom—and conquered their money worries along the way",
    trustElement4Positive: "Awesome!\nOnly 23% feel confident about money (Capital One Survey). Most stay stuck—but not you\nWe'll map your personal path to success. Let's go!",
    trustElement4Negative: "No stress—we've got you!\n77% worry about money (Capital One Survey). We'll build your personal roadmap forward",
    trustElement5: "Great! We've cracked the code!\n220+ companies soared 190%+ last year (Yahoo Finance Data). We'll help you spot the winners",
    
    // Wealth growth profile
    checkWealthGrowthProfile: "Check Your Wealth Growth Profile",
    tradingLevel: "Trading Level",
    beginnerInvestor: "Beginner Investor",
    beginnerDescription: "You're just getting started — and that's a great place to be! We'll guide you through the basics so you can build skills, start trading with confidence, and unlock your profit potential step by step.",
    confidentParticipant: "Confident Participant",
    confidentDescription: "You've got the basics — now it's time to go further! Refine your strategy, explore smarter tools, and level up your trading game as you move closer to consistent results.",
    advancedUser: "Advanced User",
    advancedDescription: "You know your way around the markets — now let's optimise your edge! With advanced insights and high-performance tools, you're ready to trade smarter and aim higher.",
    basedOnChosenMarket: "Based on your chosen market:",
    motivation: "Motivation",
    potential: "Potential",
    income: "Income",
    fitForInvesting: "Fit for investing",
    knowledge: "Knowledge",
    
    // Market recommendations
    stocksRecommendation: "Nvidia (NVDA) surged 180% in 2024, driven by booming demand for AI tech and its strong market leadership.",
    forexRecommendation: "EUR/USD rose 5.1% over the past year. It's one of the most traded and volatile currency pairs — ideal for active traders.",
    cryptoRecommendation: "Bitcoin (BTC) jumped 135.9% in a year, breaking above $100,000 for the first time. Momentum remains strong.",
    commoditiesRecommendation: "Gold climbed 46.5% over the past year, reaching an all-time high of $3,410 in May 2025 — and it's still rising.",
    indicesRecommendation: "Nasdaq gained 28.6% and the S&P 500 23% in 2024, powered by the AI boom and rising tech giants.",
    
    // Market descriptions
    stocksDescription: "Individual company shares that represent ownership in publicly traded companies. Popular for long-term growth and dividend income.",
    stocksAdvantages: [
      "Potential for high returns through company growth",
      "Dividend income from profitable companies",
      "Ownership stake in real businesses",
      "High liquidity in major markets"
    ],
    stocksTips: [
      "Research company fundamentals before investing",
      "Diversify across different sectors",
      "Consider both growth and value stocks",
      "Monitor earnings reports and market news"
    ],
    forexDescription: "Currency trading involves buying and selling different national currencies. The largest and most liquid financial market in the world.",
    forexAdvantages: [
      "24/5 market availability",
      "High liquidity and tight spreads",
      "Leverage opportunities",
      "Profit from both rising and falling currencies"
    ],
    forexTips: [
      "Start with major currency pairs",
      "Use proper risk management",
      "Follow economic calendars",
      "Practice with demo accounts first"
    ],
    cryptoDescription: "Digital currencies built on blockchain technology. Known for high volatility and potential for significant returns.",
    cryptoAdvantages: [
      "24/7 trading availability",
      "High growth potential",
      "Decentralized and borderless",
      "Innovation in financial technology"
    ],
    cryptoTips: [
      "Start with established cryptocurrencies",
      "Never invest more than you can afford to lose",
      "Use secure wallets and exchanges",
      "Stay updated on regulatory changes"
    ],
    commoditiesDescription: "Physical goods like gold, oil, agricultural products. Often used as inflation hedges and portfolio diversifiers.",
    commoditiesAdvantages: [
      "Inflation protection",
      "Portfolio diversification",
      "Tangible asset backing",
      "Global demand drivers"
    ],
    commoditiesTips: [
      "Understand supply and demand factors",
      "Consider seasonal patterns",
      "Monitor geopolitical events",
      "Use ETFs for easier access"
    ],
    indicesDescription: "Baskets of stocks representing entire markets or sectors. Provide broad market exposure with single trades.",
    indicesAdvantages: [
      "Instant diversification",
      "Lower risk than individual stocks",
      "Track overall market performance",
      "Cost-effective investing"
    ],
    indicesTips: [
      "Start with broad market indices",
      "Consider dollar-cost averaging",
      "Monitor economic indicators",
      "Understand index composition"
    ],
    advantages: "Advantages",
    tradingTips: "Trading Tips",
    
    // Personal wealth challenge
    personalWealthChallenge: "Your Personal Wealth Challenge",
    personalWealthChallengeDesc: "Based on your profile, here's your personalized 6-week journey to financial growth",
    yourSixWeekJourney: "Your 6-Week Journey",
    week12: "Week 1-2",
    week34: "Week 3-4",
    week56: "Week 5-6",
    masterTradingBasics: "Master Trading Basics",
    masterTradingBasicsDesc: "Learn fundamental analysis, market terminology, and basic trading strategies",
    technicalAnalysis: "Technical Analysis",
    technicalAnalysisDesc: "Understand charts, indicators, and patterns to time your trades effectively",
    advancedStrategies: "Advanced Strategies",
    advancedStrategiesDesc: "Implement risk management, portfolio optimization, and advanced trading techniques",
    continueToNextStep: "Continue to Next Step",
    
    // Investing skills
    investingSkillsLevel: "Your Investing Skills Level",
    now: "Now",
    afterSixWeeks: "After 6 weeks",
    week1: "Week 1",
    week2: "Week 2",
    week4: "Week 4",
    week6: "Week 6",
    yourPotentialIsHigh: "Your Potential is High!",
    yourPotentialIsHighDesc: "Based on your responses, you have strong motivation and the right mindset for successful trading. With proper guidance, you can achieve significant growth.",
    
    // Lead capture
    leadCaptureTitle: "Get Your Personalized Trading Guide",
    leadCaptureDescription: "Create your account to access your customized wealth-building strategy",
    firstName: "First Name",
    email: "Email",
    password: "Password",
    phone: "Phone",
    openAccount: "Open Account",
    privacyNotice: "By creating an account, you agree to our Terms of Service and Privacy Policy.",
    
    // Results page
    stepByStepGuideReady: "Your Step-by-Step Trading Guide Is Ready",
    guideWaitingDescription: "Your guide's waiting in the Libertex app—download now and start growing your wealth!",
    yearsInMarket: "25+ Years in the Market",
    clientsWorldwide: "3M+ Clients Worldwide",
    support247: "24/7 Support",
    seeWhatUsersSay: "See What Real Users Say About Us",
    chatGPT: "ChatGPT",
    tradingSignals: "Trading Signals",
    tradingIdeas: "Trading Ideas",
    autoTrading: "Auto-Trading",
    quickTakeProfit: "Quick Take Profit",
    copyTrading: "Copy Trading",
    limitedTimeOffer: "🎁 Limited Time Offer",
    limitedTimeOfferDesc: "Get exclusive access to our premium trading tools and personalized mentorship program. This special offer expires soon!",
    claimBonusNow: "Claim Bonus Now",
    offerExpires: "Offer expires in 24 hours",
    retakeQuiz: "Retake Quiz",
    riskWarning: "Risk Warning:",
    riskWarningText: "Trading involves substantial risk and may result in the loss of your invested capital. Past performance does not guarantee future results. Only invest what you can afford to lose.",
    
    // Loading steps
    creatingProfile: "Creating your wealth growth profile...",
    analyzingGoals: "Analyzing your financial goals",
    calculatingPotential: "Calculating growth potential",
    preparingRecommendations: "Preparing market recommendations",
    buildingChallenge: "Building your personal challenge...",
    settingMilestones: "Setting achievement milestones",
    creatingRoadmap: "Creating learning roadmap",
    customizingStrategies: "Customizing trading strategies",
    analyzingPotential: "Analyzing your trading potential...",
    evaluatingKnowledge: "Evaluating market knowledge",
    assessingRisk: "Assessing risk management skills",
    preparingInsights: "Preparing personalized insights",
    preparingResults: "Preparing your results...",
    analyzingResponses: "Analyzing your responses",
    creatingPersonalizedInsights: "Creating personalized insights",
    finalizingRecommendations: "Finalizing recommendations"
  },
  
  ru: {
    // Welcome and basic
    wealthGrowthChallenge: "Тест на рост капитала",
    oneMinuteBadge: "⏱️ Тест за 1 минуту",
    takeQuizDescription: "Пройдите быстрый тест и узнайте персональную стратегию увеличения капитала",
    male: "Мужчина",
    female: "Женщина",
    continue: "Продолжить",
    
    // Age step
    ageRangeQuestion: "Ваш возраст?",
    ageRangeDescription: "Это поможет нам персонализировать рекомендации по трейдингу",
    
    // Main goal step
    mainGoalQuestion: "Какая ваша главная цель?",
    financialFreedom: "💰 Финансовая свобода",
    professionalGrowth: "📈 Профессиональный рост",
    workLifeBalance: "⚖️ Баланс работы и жизни",
    beMyOwnBoss: "👑 Быть самому себе боссом",
    
    // Income source step
    incomeSourceQuestion: "Какой ваш основной источник дохода?",
    fullTimeJob: "💼 Работа на полную ставку",
    businessOwner: "🏢 Владелец бизнеса",
    freelancer: "💻 Фрилансер",
    other: "🔄 Другое",
    
    // Financial situation step
    financialSituationQuestion: "Как бы вы описали свое текущее финансовое положение?",
    veryComfortable: "Очень комфортно",
    comfortable: "Комфортно",
    gettingBy: "Сводим концы с концами",
    needImprovement: "Нужно улучшить",
    
    // Monthly income step
    monthlyIncomeQuestion: "Какой ваш примерный месячный доход?",
    under3000: "Менее $3,000",
    income3000to5000: "$3,000 - $5,000",
    income5000to10000: "$5,000 - $10,000",
    over10000: "Свыше $10,000",
    dontWantToShare: "Не хочу делиться",
    incomeDisclaimer: "Эта информация помогает нам предоставить лучшие рекомендации и остается конфиденциальной.",
    
    // Job challenges step
    jobChallengesQuestion: "Какая самая большая проблема с вашей текущей работой?",
    feelingUnderpaid: "💸 Чувствую себя недооцененным",
    financialDependence: "🔗 Финансовая зависимость",
    constantWorry: "😰 Постоянное беспокойство",
    noFreeTime: "⏰ Нет свободного времени",
    routine: "🔄 Рутина",
    
    // Life satisfaction step
    lifeSatisfactionQuestion: "Насколько вы довольны своей текущей жизнью?",
    verySatisfied: "Очень доволен",
    verySatisfiedEmoji: "😊",
    somewhatSatisfied: "Довольно доволен",
    somewhatSatisfiedEmoji: "🙂",
    neutral: "Нейтрально",
    neutralEmoji: "😐",
    notSatisfied: "Не доволен",
    notSatisfiedEmoji: "😔",
    
    // Money barrier step
    moneyBarrierQuestion: "Чувствуете ли вы, что деньги являются препятствием для достижения ваших мечт?",
    moneyBarrierDescription: "Будьте честны - это поможет нам понять вашу мотивацию",
    definitelyYes: "Определенно да",
    definitelyYesEmoji: "😤",
    somewhat: "В некоторой степени",
    somewhatEmoji: "🤔",
    notReally: "Не особо",
    notReallyEmoji: "😌",
    notAtAll: "Совсем нет",
    notAtAllEmoji: "😎",
    
    // Extra money use step
    extraMoneyUseQuestion: "Если бы у вас были дополнительные деньги каждый месяц, что бы вы с ними делали?",
    extraMoneyUseDescription: "Выберите то, что больше всего резонирует с вами",
    travelMore: "✈️ Больше путешествовать",
    buyAHome: "🏠 Купить дом",
    startBusiness: "🚀 Начать бизнес",
    saveFuture: "💰 Откладывать на будущее",
    
    // Financial confidence step
    financialConfidenceQuestion: "Насколько уверенно вы чувствуете себя в отношении своего финансового будущего?",
    financialConfidenceDescription: "Ваш честный ответ поможет нам подобрать правильный подход",
    veryConfident: "Очень уверенно",
    veryConfidentEmoji: "💪",
    positiveView: "Позитивный взгляд",
    positiveViewEmoji: "👍",
    needGuidance: "Нужна помощь",
    needGuidanceEmoji: "🤝",
    
    // Wealthy retirement step
    wealthyRetirementQuestion: "Верите ли вы, что у вас будет обеспеченная пенсия?",
    probablyYes: "Вероятно да",
    notSure: "Не уверен",
    no: "Нет",
    
    // Saving money step
    savingMoneyQuestion: "Насколько легко вам откладывать деньги каждый месяц?",
    veryEasy: "Очень легко",
    veryEasyEmoji: "😊",
    somewhatEasy: "Довольно легко",
    somewhatEasyEmoji: "🙂",
    difficult: "Сложно",
    difficultEmoji: "😕",
    veryDifficult: "Очень сложно",
    veryDifficultEmoji: "😰",
    
    // Money earning step
    moneyEarningQuestion: "Пробовали ли вы когда-нибудь зарабатывать деньги помимо основной работы?",
    yesSuccessfully: "✅ Да, успешно",
    mixedResults: "⚖️ Смешанные результаты",
    noInterested: "❌ Нет, но интересно",
    noExperience: "🆕 Нет опыта",
    
    // Wealth growth step
    wealthGrowthQuestion: "Насколько вас интересует увеличение капитала через трейдинг?",
    veryInterested: "Очень интересует",
    notInterested: "Не интересует",
    
    // Trading knowledge step
    tradingKnowledgeQuestion: "Знаете ли вы что-нибудь о трейдинге или инвестировании?",
    experiencedWantImprove: "📈 У меня есть опыт",
    heardSomething: "📚 Знаю основы",
    noButWantToKnow: "🆕 Нет, но хотел бы узнать",
    
    // Passive income step
    passiveIncomeQuestion: "Как бы вы оценили свои знания стратегий пассивного дохода?",
    rateYourExperience: "Оцените свой опыт от 1 до 10",
    low: "Низкий",
    medium: "Средний",
    high: "Высокий",
    readyToLearnBasics: "Готов изучать основы",
    someExp: "Есть опыт, хочу улучшить",
    yearsOfExp: "Годы опыта",
    
    // Market interests step
    marketInterestsQuestion: "Какие рынки вас больше всего интересуют?",
    selectAll: "Выберите все подходящие",
    stocks: "📈 Акции",
    forex: "💱 Валюты",
    crypto: "₿ Криптовалюты",
    commodities: "🏆 Металлы",
    indices: "📊 Индексы",
    
    // Investment readiness step
    investmentReadinessQuestion: "Насколько готовы вы начать инвестировать?",
    investmentReadinessDescription: "Оцените свою готовность от 1 до 10",
    gettingStarted: "Начинаю",
    buildingFoundations: "Строю крепкий фундамент",
    readyToLearn: "Готов учиться",
    gainingConfidence: "Набираюсь уверенности",
    readyToTrade: "Готов торговать",
    preparedForSuccess: "Готов к успеху",
    intermediate: "Средний",
    expert: "Эксперт",
    
    // Special achievement step
    specialGoalQuestion: "Какую особую цель вы хотели бы достичь?",
    buyHouse: "🏠 Купить дом",
    buyCar: "🚗 Купить машину",
    earlyRetire: "🏖️ Досрочная пенсия",
    travelWorld: "✈️ Путешествовать по миру",
    wedding: "💒 Свадьба",
    education: "🎓 Образование",
    
    // Time commitment step
    timeCommitmentQuestion: "Сколько времени вы можете посвятить изучению трейдинга?",
    timeCommitmentDescription: "Будьте реалистичны в отношении своего расписания",
    oneToTwoHoursDaily: "⏰ 1-2 часа в день",
    threeToFourHoursWeekly: "📅 3-4 часа в неделю",
    fiveToSixHoursMonthly: "📆 5-6 часов в месяц",
    flexible: "🔄 Гибко",
    
    // Trust elements
    trustElement1: "Нас уже выбрали более 3 миллионов человек из 120+ стран. Libertex — платформа, которой доверяют по всему миру.",
    trustElement2Positive: "Переходите на следующий уровень\nВсё, что будет дальше, создано с учётом вашего уровня и целей. Вас ждёт продуманный маршрут на основе экспертных решений и реального опыта.",
    trustElement2Negative: "Разберёмся во всем вместе\nНе нужно торопиться. Мы будем сопровождать вас на каждом шаге, чтобы вы чувствовали уверенность и понимали, что делаете.",
    trustElement3: "Ваши данные в безопасности\nСпасибо, что доверяете нам. Мы бережно относимся к вашим данным и никогда не передаём их третьим лицам.",
    trustElement4Positive: "Первый шаг — самый важный\nЛишь 23% людей уверены в своих финансах (по данным Capital One). Но вы уже движетесь в нужном направлении.",
    trustElement4Negative: "Вы не одни!\n77% беспокоятся о деньгах (Capital One). Мы поможем вам навести порядок и составить понятный план.",
    trustElement5: "Цифры говорят сами за себя\nБолее 220 компаний выросли более чем на 190% за прошлый год (по данным Yahoo Finance). Мы покажем, как находить такие возможности.",
    
    // Wealth growth profile
    checkWealthGrowthProfile: "Проверьте свой финансовый профиль",
    tradingLevel: "Уровень трейдинга",
    beginnerInvestor: "Начинающий инвестор",
    beginnerDescription: "Ваш подход: хочу разобраться\nВы только начинаете интересоваться возможностями рынка. Пока многое кажется новым и сложным, но это именно тот момент, когда можно спокойно вникнуть и найти свою траекторию.",
    confidentParticipant: "Уверенный участник рынка",
    confidentDescription: "Ваш подход: готов развиваться\nБазовые шаги уже позади. Сейчас вы ищете более продуманные решения и начинаете выстраивать стратегию, которая подходит именно вам.",
    advancedUser: "Продвинутый пользователь",
    advancedDescription: "Ваш подход: работаю по своей стратегии\nВы знаете, чего хотите, и уверенно пользуетесь инструментами. Мы поможем усилить ваши результаты точными данными и актуальными идеями.",
    basedOnChosenMarket: "На основе выбранного вами рынка:",
    motivation: "Мотивация",
    potential: "Потенциал",
    income: "Доход",
    fitForInvesting: "Подходит для инвестиций",
    knowledge: "Знания",
    
    // Market recommendations
    stocksRecommendation: "Nvidia (NVDA) выросла на 180% в 2024 году благодаря взрывному спросу на ИИ и устойчивым позициям на рынке.",
    forexRecommendation: "EUR/USD выросла на 5,1% за последний год. Это одна из самых популярных и волатильных валютных пар — подходит для активной торговли",
    cryptoRecommendation: "Биткоин (BTC) подорожал на 135,9% за год и впервые преодолел отметку $100 000. Остается самым сильным на рынке.",
    commoditiesRecommendation: "Золото выросло на 46,5% и достигло исторического максимума $3410 в мае 2025 года. Тренд остаётся восходящим.",
    indicesRecommendation: "Nasdaq вырос на 28,6%, а S&P 500 — на 23% в 2024 году. Основной драйвер — развитие ИИ и рост техсектора.",
    
    // Market descriptions
    stocksDescription: "Акции отдельных компаний, представляющие долю собственности в публично торгуемых компаниях. Популярны для долгосрочного роста и дивидендного дохода.",
    stocksAdvantages: [
      "Потенциал высокой доходности через рост компании",
      "Дивидендный доход от прибыльных компаний",
      "Доля собственности в реальном бизнесе",
      "Высокая ликвидность на основных рынках"
    ],
    stocksTips: [
      "Изучайте фундаментальные показатели компании перед инвестированием",
      "Диверсифицируйте по разным секторам",
      "Рассматривайте как растущие, так и недооцененные акции",
      "Следите за отчетами о прибылях и рыночными новостями"
    ],
    forexDescription: "Торговля валютами включает покупку и продажу различных национальных валют. Самый большой и ликвидный финансовый рынок в мире.",
    forexAdvantages: [
      "Доступность рынка 24/5",
      "Высокая ликвидность и узкие спреды",
      "Возможности кредитного плеча",
      "Прибыль как от роста, так и от падения валют"
    ],
    forexTips: [
      "Начинайте с основных валютных пар",
      "Используйте правильное управление рисками",
      "Следите за экономическими календарями",
      "Сначала практикуйтесь на демо-счетах"
    ],
    cryptoDescription: "Цифровые валюты, построенные на технологии блокчейн. Известны высокой волатильностью и потенциалом значительной доходности.",
    cryptoAdvantages: [
      "Торговля 24/7",
      "Высокий потенциал роста",
      "Децентрализованность и отсутствие границ",
      "Инновации в финансовых технологиях"
    ],
    cryptoTips: [
      "Начинайте с установленных криптовалют",
      "Никогда не инвестируйте больше, чем можете позволить себе потерять",
      "Используйте безопасные кошельки и биржи",
      "Следите за регулятивными изменениями"
    ],
    commoditiesDescription: "Физические товары, такие как золото, нефть, сельскохозяйственная продукция. Часто используются как защита от инфляции и диверсификаторы портфеля.",
    commoditiesAdvantages: [
      "Защита от инфляции",
      "Диверсификация портфеля",
      "Поддержка материальными активами",
      "Глобальные драйверы спроса"
    ],
    commoditiesTips: [
      "Понимайте факторы спроса и предложения",
      "Учитывайте сезонные паттерны",
      "Следите за геополитическими событиями",
      "Используйте ETF для более легкого доступа"
    ],
    indicesDescription: "Корзины акций, представляющие целые рынки или секторы. Обеспечивают широкое рыночное воздействие одной сделкой.",
    indicesAdvantages: [
      "Мгновенная диверсификация",
      "Меньший риск, чем отдельные акции",
      "Отслеживание общей рыночной производительности",
      "Экономически эффективное инвестирование"
    ],
    indicesTips: [
      "Начинайте с широких рыночных индексов",
      "Рассмотрите усреднение долларовой стоимости",
      "Следите за экономическими индикаторами",
      "Понимайте состав индекса"
    ],
    advantages: "Преимущества",
    tradingTips: "Торговые советы",
    
    // Personal wealth challenge
    personalWealthChallenge: "Ваш личный путь к финансовому росту",
    personalWealthChallengeDesc: "На основе вашего профиля, вот ваш персонализированный 6-недельный путь к финансовому росту",
    yourSixWeekJourney: "Ваш 6-недельный путь",
    week12: "Неделя 1-2",
    week34: "Неделя 3-4",
    week56: "Неделя 5-6",
    masterTradingBasics: "Основы трейдинга",
    masterTradingBasicsDesc: "Изучите фундаментальный анализ, рыночную терминологию и базовые торговые стратегии",
    technicalAnalysis: "Технический анализ",
    technicalAnalysisDesc: "Понимайте графики, индикаторы и паттерны для эффективного выбора времени сделок",
    advancedStrategies: "Продвинутые стратегии",
    advancedStrategiesDesc: "Внедрите управление рисками, оптимизацию портфеля и продвинутые торговые техники",
    continueToNextStep: "Перейти к следующему шагу",
    
    // Investing skills
    investingSkillsLevel: "Ваш уровень инвестиционных навыков",
    now: "Сейчас",
    afterSixWeeks: "Через 6 недель",
    week1: "Неделя 1",
    week2: "Неделя 2",
    week4: "Неделя 4",
    week6: "Неделя 6",
    yourPotentialIsHigh: "Ваш потенциал высок!",
    yourPotentialIsHighDesc: "На основе ваших ответов, у вас сильная мотивация и правильный настрой для успешного трейдинга. С правильным руководством вы можете достичь значительного роста.",
    
    // Lead capture
    leadCaptureTitle: "Получите персонализированное руководство по трейдингу",
    leadCaptureDescription: "Создайте аккаунт для доступа к вашей индивидуальной стратегии увеличения капитала",
    firstName: "Имя",
    email: "Электронная почта",
    password: "Пароль",
    phone: "Телефон",
    openAccount: "Открыть счет",
    privacyNotice: "Создавая аккаунт, вы соглашаетесь с нашими Условиями обслуживания и Политикой конфиденциальности.",
    
    // Results page
    stepByStepGuideReady: "Пошаговое руководство по трейдингу ждёт вас",
    guideWaitingDescription: "Заберите его в приложении Libertex — скачайте сейчас и начните преумножать свой капитал!",
    yearsInMarket: "25+ лет на рынке",
    clientsWorldwide: "3+ миллиона клиентов по всему миру",
    support247: "Поддержка 24/7",
    seeWhatUsersSay: "Что говорят о нас пользователи:",
    chatGPT: "ChatGPT",
    tradingSignals: "Торговые сигналы",
    tradingIdeas: "Торговые идеи",
    autoTrading: "Автотрейдинг",
    quickTakeProfit: "Быстрый тейк-профит",
    copyTrading: "Копитрейдинг",
    limitedTimeOffer: "🎁 Ограниченное предложение",
    limitedTimeOfferDesc: "Получите эксклюзивный доступ к нашим премиум торговым инструментам и персонализированной программе наставничества. Это специальное предложение скоро истекает!",
    claimBonusNow: "Получить бонус сейчас",
    offerExpires: "Предложение истекает через 24 часа",
    retakeQuiz: "Пройти тест заново",
    riskWarning: "Предупреждение о рисках:",
    riskWarningText: "Торговля связана с существенным риском и может привести к потере вашего инвестированного капитала. Прошлые результаты не гарантируют будущих результатов. Инвестируйте только то, что можете позволить себе потерять.",
    
    // Loading steps
    creatingProfile: "Создаём ваш профиль роста капитала...",
    analyzingGoals: "Анализируем ваши финансовые цели",
    calculatingPotential: "Рассчитываем потенциал роста",
    preparingRecommendations: "Готовим рыночные рекомендации",
    buildingChallenge: "Готовим ваш индивидуальный план действий...",
    settingMilestones: "Устанавливаем этапы достижений",
    creatingRoadmap: "Создаём дорожную карту обучения",
    customizingStrategies: "Настраиваем торговые стратегии",
    analyzingPotential: "Анализируем ваш торговый потенциал...",
    evaluatingKnowledge: "Оцениваем знания рынка",
    assessingRisk: "Анализируем навыки управления рисками",
    preparingInsights: "Готовим персональные рекомендации",
    preparingResults: "Готовим ваши результаты...",
    analyzingResponses: "Анализируем ваши ответы",
    creatingPersonalizedInsights: "Создаём персональные рекомендации",
    finalizingRecommendations: "Финализируем рекомендации"
  },
  
  es: {
    // Welcome and basic
    wealthGrowthChallenge: "Desafío de Crecimiento de Riqueza",
    oneMinuteBadge: "⏱️ Quiz de 1 minuto",
    takeQuizDescription: "Realiza este quiz rápido para descubrir tu estrategia personalizada de construcción de riqueza",
    male: "Hombre",
    female: "Mujer",
    continue: "Continuar",
    
    // Age step
    ageRangeQuestion: "¿Cuál es tu rango de edad?",
    ageRangeDescription: "Esto nos ayuda a personalizar tus recomendaciones de trading",
    
    // Main goal step
    mainGoalQuestion: "¿Cuál es tu objetivo principal?",
    financialFreedom: "💰 Libertad Financiera",
    professionalGrowth: "📈 Crecimiento Profesional",
    workLifeBalance: "⚖️ Equilibrio Trabajo-Vida",
    beMyOwnBoss: "👑 Ser Mi Propio Jefe",
    
    // Income source step
    incomeSourceQuestion: "¿Cuál es tu principal fuente de ingresos?",
    fullTimeJob: "💼 Trabajo de Tiempo Completo",
    businessOwner: "🏢 Propietario de Negocio",
    freelancer: "💻 Freelancer",
    other: "🔄 Otro",
    
    // Financial situation step
    financialSituationQuestion: "¿Cómo describirías tu situación financiera actual?",
    veryComfortable: "Muy Cómoda",
    comfortable: "Cómoda",
    gettingBy: "Sobreviviendo",
    needImprovement: "Necesita Mejorar",
    
    // Monthly income step
    monthlyIncomeQuestion: "¿Cuál es tu ingreso mensual aproximado?",
    under3000: "Menos de $3,000",
    income3000to5000: "$3,000 - $5,000",
    income5000to10000: "$5,000 - $10,000",
    over10000: "Más de $10,000",
    dontWantToShare: "No quiero compartir",
    incomeDisclaimer: "Esta información nos ayuda a proporcionar mejores recomendaciones y se mantiene confidencial.",
    
    // Job challenges step
    jobChallengesQuestion: "¿Cuál es tu mayor desafío con tu trabajo actual?",
    feelingUnderpaid: "💸 Sentirse mal pagado",
    financialDependence: "🔗 Dependencia financiera",
    constantWorry: "😰 Preocupación constante",
    noFreeTime: "⏰ Sin tiempo libre",
    routine: "🔄 Rutina",
    
    // Life satisfaction step
    lifeSatisfactionQuestion: "¿Qué tan satisfecho estás con tu vida actual?",
    verySatisfied: "Muy Satisfecho",
    verySatisfiedEmoji: "😊",
    somewhatSatisfied: "Algo Satisfecho",
    somewhatSatisfiedEmoji: "🙂",
    neutral: "Neutral",
    neutralEmoji: "😐",
    notSatisfied: "No Satisfecho",
    notSatisfiedEmoji: "😔",
    
    // Money barrier step
    moneyBarrierQuestion: "¿Sientes que el dinero es una barrera para lograr tus sueños?",
    moneyBarrierDescription: "Sé honesto - esto nos ayuda a entender tu motivación",
    definitelyYes: "Definitivamente Sí",
    definitelyYesEmoji: "😤",
    somewhat: "Un Poco",
    somewhatEmoji: "🤔",
    notReally: "No Realmente",
    notReallyEmoji: "😌",
    notAtAll: "Para Nada",
    notAtAllEmoji: "😎",
    
    // Extra money use step
    extraMoneyUseQuestion: "Si tuvieras dinero extra cada mes, ¿qué harías con él?",
    extraMoneyUseDescription: "Elige lo que más resuene contigo",
    travelMore: "✈️ Viajar Más",
    buyAHome: "🏠 Comprar una Casa",
    startBusiness: "🚀 Iniciar Negocio",
    saveFuture: "💰 Ahorrar para el Futuro",
    
    // Financial confidence step
    financialConfidenceQuestion: "¿Qué tan confiado te sientes sobre tu futuro financiero?",
    financialConfidenceDescription: "Tu respuesta honesta nos ayuda a adaptar el enfoque correcto",
    veryConfident: "Muy Confiado",
    veryConfidentEmoji: "💪",
    positiveView: "Vista Positiva",
    positiveViewEmoji: "👍",
    needGuidance: "Necesito Orientación",
    needGuidanceEmoji: "🤝",
    
    // Wealthy retirement step
    wealthyRetirementQuestion: "¿Crees que tendrás una jubilación próspera?",
    probablyYes: "Probablemente Sí",
    notSure: "No Estoy Seguro",
    no: "No",
    
    // Saving money step
    savingMoneyQuestion: "¿Qué tan fácil es para ti ahorrar dinero cada mes?",
    veryEasy: "Muy Fácil",
    veryEasyEmoji: "😊",
    somewhatEasy: "Algo Fácil",
    somewhatEasyEmoji: "🙂",
    difficult: "Difícil",
    difficultEmoji: "😕",
    veryDifficult: "Muy Difícil",
    veryDifficultEmoji: "😰",
    
    // Money earning step
    moneyEarningQuestion: "¿Has intentado alguna vez ganar dinero fuera de tu trabajo principal?",
    yesSuccessfully: "✅ Sí, Exitosamente",
    mixedResults: "⚖️ Resultados Mixtos",
    noInterested: "❌ No, pero Interesado",
    noExperience: "🆕 Sin Experiencia",
    
    // Wealth growth step
    wealthGrowthQuestion: "¿Qué tan interesado estás en hacer crecer tu riqueza a través del trading?",
    veryInterested: "Muy Interesado",
    notInterested: "No Interesado",
    
    // Trading knowledge step
    tradingKnowledgeQuestion: "¿Sabes algo sobre trading o inversión?",
    experiencedWantImprove: "📈 Tengo experiencia",
    heardSomething: "📚 Conozco lo básico",
    noButWantToKnow: "🆕 No, pero me gustaría saber",
    
    // Passive income step
    passiveIncomeQuestion: "¿Cómo calificarías tu conocimiento de estrategias de ingresos pasivos?",
    rateYourExperience: "Califica tu experiencia del 1 al 10",
    low: "Bajo",
    medium: "Medio",
    high: "Alto",
    readyToLearnBasics: "Listo para aprender lo básico",
    someExp: "Algo de experiencia, quiero mejorar",
    yearsOfExp: "Años de experiencia",
    
    // Market interests step
    marketInterestsQuestion: "¿Qué mercados te interesan más?",
    selectAll: "Selecciona todos los que apliquen",
    stocks: "📈 Acciones",
    forex: "💱 Divisas",
    crypto: "₿ Cripto",
    commodities: "🏆 Metales",
    indices: "📊 Índices",
    
    // Investment readiness step
    investmentReadinessQuestion: "¿Qué tan preparado te sientes para comenzar a invertir?",
    investmentReadinessDescription: "Califica tu preparación del 1 al 10",
    gettingStarted: "Comenzando",
    buildingFoundations: "Construyendo bases sólidas",
    readyToLearn: "Listo para Aprender",
    gainingConfidence: "Ganando confianza",
    readyToTrade: "Listo para Operar",
    preparedForSuccess: "Preparado para el éxito",
    intermediate: "Intermedio",
    expert: "Experto",
    
    // Special achievement step
    specialGoalQuestion: "¿Cuál es un objetivo especial que te gustaría lograr?",
    buyHouse: "🏠 Comprar una casa",
    buyCar: "🚗 Comprar un auto",
    earlyRetire: "🏖️ Jubilación temprana",
    travelWorld: "✈️ Viajar por el mundo",
    wedding: "💒 Boda",
    education: "🎓 Educación",
    
    // Time commitment step
    timeCommitmentQuestion: "¿Cuánto tiempo puedes dedicar a aprender sobre trading?",
    timeCommitmentDescription: "Sé realista sobre tu horario",
    oneToTwoHoursDaily: "⏰ 1-2h diarias",
    threeToFourHoursWeekly: "📅 3-4h semanales",
    fiveToSixHoursMonthly: "📆 5-6h mensuales",
    flexible: "🔄 Flexible",
    
    // Trust elements
    trustElement1: "Más de 3 millones de clientes en más de 120 países han elegido Libertex, una plataforma galardonada",
    trustElement2Positive: "¡Estás listo para subir de nivel!\nEste viaje está construido sobre conocimientos expertos y contenido personalizado — hecho para coincidir con tus habilidades y objetivos",
    trustElement2Negative: "Sin estrés — te guiaremos paso a paso\nCada etapa está construida sobre investigación experta y adaptada a tus habilidades, para que puedas crecer con confianza",
    trustElement3: "Apreciamos tu confianza — tu información está segura con nosotros\nÚnete a más de 3 millones de jugadores que ya han comenzado su viaje hacia la libertad financiera—y conquistado sus preocupaciones monetarias en el camino",
    trustElement4Positive: "¡Increíble!\nSolo el 23% se siente confiado sobre el dinero (Encuesta Capital One). La mayoría se queda atascada—pero tú no\n¡Mapearemos tu camino personal hacia el éxito. ¡Vamos!",
    trustElement4Negative: "Sin estrés—¡te tenemos cubierto!\nEl 77% se preocupa por el dinero (Encuesta Capital One). Construiremos tu hoja de ruta personal hacia adelante",
    trustElement5: "¡Genial! ¡Hemos descifrado el código!\nMás de 220 compañías se dispararon 190%+ el año pasado (Datos Yahoo Finance). Te ayudaremos a detectar a los ganadores",
    
    // Wealth growth profile
    checkWealthGrowthProfile: "Revisa Tu Perfil de Crecimiento de Riqueza",
    tradingLevel: "Nivel de Trading",
    beginnerInvestor: "Inversor Principiante",
    beginnerDescription: "¡Apenas estás comenzando — y ese es un gran lugar para estar! Te guiaremos a través de lo básico para que puedas desarrollar habilidades, comenzar a operar con confianza, y desbloquear tu potencial de ganancias paso a paso.",
    confidentParticipant: "Participante Confiado",
    confidentDescription: "Tienes lo básico — ¡ahora es hora de ir más lejos! Refina tu estrategia, explora herramientas más inteligentes, y sube de nivel tu juego de trading mientras te acercas a resultados consistentes.",
    advancedUser: "Usuario Avanzado",
    advancedDescription: "Conoces tu camino en los mercados — ¡ahora optimicemos tu ventaja! Con conocimientos avanzados y herramientas de alto rendimiento, estás listo para operar más inteligentemente y apuntar más alto.",
    basedOnChosenMarket: "Basado en tu mercado elegido:",
    motivation: "Motivación",
    potential: "Potencial",
    income: "Ingresos",
    fitForInvesting: "Apto para invertir",
    knowledge: "Conocimiento",
    
    // Market recommendations
    stocksRecommendation: "Nvidia (NVDA) se disparó 180% en 2024, impulsada por la demanda en auge de tecnología IA y su fuerte liderazgo en el mercado.",
    forexRecommendation: "EUR/USD subió 5.1% durante el año pasado. Es uno de los pares de divisas más negociados y volátiles — ideal para traders activos.",
    cryptoRecommendation: "Bitcoin (BTC) saltó 135.9% en un año, rompiendo por encima de $100,000 por primera vez. El impulso se mantiene fuerte.",
    commoditiesRecommendation: "El oro subió 46.5% durante el año pasado, alcanzando un máximo histórico de $3,410 en mayo de 2025 — y sigue subiendo.",
    indicesRecommendation: "Nasdaq ganó 28.6% y el S&P 500 23% en 2024, impulsado por el boom de IA y el crecimiento de gigantes tecnológicos.",
    
    // Market descriptions
    stocksDescription: "Acciones individuales de empresas que representan propiedad en compañías que cotizan en bolsa. Populares para crecimiento a largo plazo e ingresos por dividendos.",
    stocksAdvantages: [
      "Potencial de altos retornos a través del crecimiento de la empresa",
      "Ingresos por dividendos de empresas rentables",
      "Participación en la propiedad de negocios reales",
      "Alta liquidez en mercados principales"
    ],
    stocksTips: [
      "Investiga los fundamentos de la empresa antes de invertir",
      "Diversifica entre diferentes sectores",
      "Considera tanto acciones de crecimiento como de valor",
      "Monitorea reportes de ganancias y noticias del mercado"
    ],
    forexDescription: "El trading de divisas involucra comprar y vender diferentes monedas nacionales. El mercado financiero más grande y líquido del mundo.",
    forexAdvantages: [
      "Disponibilidad del mercado 24/5",
      "Alta liquidez y spreads ajustados",
      "Oportunidades de apalancamiento",
      "Ganancias tanto de divisas que suben como que bajan"
    ],
    forexTips: [
      "Comienza con pares de divisas principales",
      "Usa gestión de riesgo adecuada",
      "Sigue calendarios económicos",
      "Practica primero con cuentas demo"
    ],
    cryptoDescription: "Monedas digitales construidas sobre tecnología blockchain. Conocidas por alta volatilidad y potencial de retornos significativos.",
    cryptoAdvantages: [
      "Disponibilidad de trading 24/7",
      "Alto potencial de crecimiento",
      "Descentralizado y sin fronteras",
      "Innovación en tecnología financiera"
    ],
    cryptoTips: [
      "Comienza con criptomonedas establecidas",
      "Nunca inviertas más de lo que puedes permitirte perder",
      "Usa billeteras e intercambios seguros",
      "Mantente actualizado sobre cambios regulatorios"
    ],
    commoditiesDescription: "Bienes físicos como oro, petróleo, productos agrícolas. A menudo usados como coberturas contra inflación y diversificadores de portafolio.",
    commoditiesAdvantages: [
      "Protección contra inflación",
      "Diversificación de portafolio",
      "Respaldo de activos tangibles",
      "Impulsores de demanda global"
    ],
    commoditiesTips: [
      "Entiende los factores de oferta y demanda",
      "Considera patrones estacionales",
      "Monitorea eventos geopolíticos",
      "Usa ETFs para acceso más fácil"
    ],
    indicesDescription: "Canastas de acciones que representan mercados enteros o sectores. Proporcionan exposición amplia al mercado con operaciones individuales.",
    indicesAdvantages: [
      "Diversificación instantánea",
      "Menor riesgo que acciones individuales",
      "Seguimiento del rendimiento general del mercado",
      "Inversión costo-efectiva"
    ],
    indicesTips: [
      "Comienza con índices de mercado amplio",
      "Considera el promedio de costo en dólares",
      "Monitorea indicadores económicos",
      "Entiende la composición del índice"
    ],
    advantages: "Ventajas",
    tradingTips: "Consejos de Trading",
    
    // Personal wealth challenge
    personalWealthChallenge: "Tu Desafío Personal de Riqueza",
    personalWealthChallengeDesc: "Basado en tu perfil, aquí está tu viaje personalizado de 6 semanas hacia el crecimiento financiero",
    yourSixWeekJourney: "Tu viaje de 6 Semanas",
    week12: "Semana 1-2",
    week34: "Semana 3-4",
    week56: "Semana 5-6",
    masterTradingBasics: "Dominar básicos de trading",
    masterTradingBasicsDesc: "Aprende análisis fundamental, terminología del mercado, y estrategias básicas de trading",
    technicalAnalysis: "Análisis Técnico",
    technicalAnalysisDesc: "Entiende gráficos, indicadores, y patrones para cronometrar tus operaciones efectivamente",
    advancedStrategies: "Estrategias Avanzadas",
    advancedStrategiesDesc: "Implementa gestión de riesgo, optimización de portafolio, y técnicas avanzadas de trading",
    continueToNextStep: "Continuar al Siguiente Paso",
    
    // Investing skills
    investingSkillsLevel: "Tu nivel de habilidades de inversión",
    now: "Ahora",
    afterSixWeeks: "Después de 6 semanas",
    week1: "Semana 1",
    week2: "Semana 2",
    week4: "Semana 4",
    week6: "Semana 6",
    yourPotentialIsHigh: "¡Tu potencial es alto!",
    yourPotentialIsHighDesc: "Basado en tus respuestas, tienes una fuerte motivación y la mentalidad correcta para el trading exitoso. Con la orientación adecuada, puedes lograr un crecimiento significativo.",
    
    // Lead capture
    leadCaptureTitle: "Obtén tu guía personalizada de trading",
    leadCaptureDescription: "Crea tu cuenta para acceder a tu estrategia personalizada de construcción de riqueza",
    firstName: "Nombre",
    email: "Correo electrónico",
    password: "Contraseña",
    phone: "Teléfono",
    openAccount: "Abrir cuenta",
    privacyNotice: "Al crear una cuenta, aceptas nuestros términos de servicio y política de privacidad.",
    
    // Results page
    stepByStepGuideReady: "Tu guía paso a paso de trading está lista",
    guideWaitingDescription: "¡Tu guía te está esperando en la app de Libertex—descarga ahora y comienza a hacer crecer tu riqueza!",
    yearsInMarket: "25+ Años en el mercado",
    clientsWorldwide: "3M+ Clientes en todo el mundo",
    support247: "Soporte 24/7",
    seeWhatUsersSay: "Ve lo que dicen los usuarios reales sobre nosotros",
    chatGPT: "ChatGPT",
    tradingSignals: "Señales de trading",
    tradingIdeas: "Ideas de trading",
    autoTrading: "Auto-trading",
    quickTakeProfit: "Toma de ganancias rápida",
    copyTrading: "Copy trading",
    limitedTimeOffer: "🎁 Oferta por tiempo limitado",
    limitedTimeOfferDesc: "Obtén acceso exclusivo a nuestras herramientas de trading premium y programa de mentoría personalizada. ¡Esta oferta especial expira pronto!",
    claimBonusNow: "Reclamar bono ahora",
    offerExpires: "La oferta expira en 24 horas",
    retakeQuiz: "Retomar quiz",
    riskWarning: "Advertencia de riesgo:",
    riskWarningText: "El trading involucra riesgo sustancial y puede resultar en la pérdida de tu capital invertido. El rendimiento pasado no garantiza resultados futuros. Solo invierte lo que puedas permitirte perder.",
    
    // Loading steps
    creatingProfile: "Creando tu perfil de crecimiento de riqueza...",
    analyzingGoals: "Analizando tus objetivos financieros",
    calculatingPotential: "Calculando potencial de crecimiento",
    preparingRecommendations: "Preparando recomendaciones de mercado",
    buildingChallenge: "Construyendo tu desafío personal...",
    settingMilestones: "Estableciendo hitos de logro",
    creatingRoadmap: "Creando hoja de ruta de aprendizaje",
    customizingStrategies: "Personalizando estrategias de trading",
    analyzingPotential: "Analizando tu potencial de trading...",
    evaluatingKnowledge: "Evaluando conocimiento del mercado",
    assessingRisk: "Evaluando habilidades de gestión de riesgo",
    preparingInsights: "Preparando conocimientos personalizados",
    preparingResults: "Preparando tus resultados...",
    analyzingResponses: "Analizando tus respuestas",
    creatingPersonalizedInsights: "Creando conocimientos personalizados",
    finalizingRecommendations: "Finalizando recomendaciones"
  }
};

export const useTranslation = (language: Language) => {
  return translations[language];
};