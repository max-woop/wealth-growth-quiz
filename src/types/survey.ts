export interface SurveyResponse {
  gender: string;
  age: string;
  experience: string;
  riskTolerance: number;
  tradingGoal: string;
  tradingInstruments: string[];
  tradingFrequency: string;
  name: string;
  email: string;
  isPremium?: boolean;
  mainGoal?: string;
  incomeSource?: string;
  financialSituation?: string;
  monthlyIncome?: string;
  jobChallenges?: string;
  lifeSatisfaction?: string;
  moneyBarrier?: string;
  extraMoneyUse?: string;
  financialConfidence?: string;
  wealthyRetirement?: string;
  savingMoney?: string;
  moneyEarningExperience?: string;
  wealthGrowthInterest?: string;
  tradingKnowledge?: string;
  passiveIncomeKnowledge?: string;
  marketInterests?: string[];
  investmentReadiness?: number;
  specialAchievement?: string;
  timeCommitment?: string;
  language?: 'en' | 'ru' | 'es';
}

export interface TradingPersona {
  title: string;
  description: string;
  tips: string[];
  premiumTips?: string[];
  recommendedInstruments?: string[];
  riskManagement?: string[];
  tradingPlan?: string[];
}

export type SurveyStep = 
  | 'language'
  | 'welcome'
  | 'age'
  | 'trust-element-1'
  | 'main-goal'
  | 'income-source'
  | 'financial-situation'
  | 'trust-element-2'
  | 'monthly-income'
  | 'job-challenges'
  | 'trust-element-3'
  | 'life-satisfaction'
  | 'money-barrier'
  | 'extra-money-use'
  | 'financial-confidence'
  | 'trust-element-4'
  | 'wealthy-retirement'
  | 'saving-money'
  | 'money-earning'
  | 'wealth-growth'
  | 'trading-knowledge'
  | 'trust-element-5'
  | 'passive-income'
  | 'market-interests'
  | 'investment-readiness'
  | 'special-achievement'
  | 'time-commitment'
  | 'loading-challenge'
  | 'wealth-growth-profile'
  | 'testimonials'
  | 'lead-capture'
  | 'registration'
  | 'download'
  | 'personal-wealth-challenge'
  | 'results'
  | 'download-app';