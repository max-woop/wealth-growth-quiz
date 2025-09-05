// Analytics utility functions for quiz statistics
import { supabase } from '../lib/supabase';

export interface QuizStats {
  metric: string;
  value: number;
  changePercent: number;
}

export interface ConversionFunnel {
  date: string;
  totalSessions: number;
  trustEngaged: number;
  quarterCompleted: number;
  halfCompleted: number;
  threeQuarterCompleted: number;
  formCompletions: number;
  emailsCollected: number;
  resultsViews: number;
  fullCompletions: number;
  trustEngagementRate: number;
  formCompletionRate: number;
  emailCollectionRate: number;
  resultsViewRate: number;
  completionRate: number;
}

export interface UserSegment {
  gender: string;
  ageRange: string;
  financialSituation: string;
  monthlyIncome: string;
  tradingKnowledge: string;
  avgInvestmentReadiness: number;
  segmentSize: number;
  conversions: number;
  emailsCollected: number;
  resultsViews: number;
  conversionRate: number;
  emailRate: number;
  avgProgress: number;
  avgSessionMinutes: number;
}

export interface MarketAnalysis {
  marketInterest: string;
  selections: number;
  conversions: number;
  emailsCollected: number;
  conversionRate: number;
  emailRate: number;
  avgProgress: number;
}

export interface UTMPerformance {
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
  sessions: number;
  engagedSessions: number;
  conversions: number;
  emailsCollected: number;
  resultsViews: number;
  engagementRate: number;
  conversionRate: number;
  emailCollectionRate: number;
  avgProgress: number;
  avgSessionMinutes: number;
}

export interface TrustElementAnalysis {
  trustElement: string;
  views: number;
  conversions: number;
  emailsCollected: number;
  conversionRate: number;
  emailRate: number;
}

export interface UserResponse {
  id: string;
  createdAt: string;
  completedAt: string | null;
  userEmail: string | null;
  userName: string | null;
  currentStep: string;
  progressPercentage: number;
  completedSteps: number;
  totalSteps: number;
  formCompleted: boolean;
  resultsViewed: boolean;
  gender: string;
  ageRange: string;
  financialSituation: string;
  monthlyIncome: string;
  incomeSource: string;
  mainGoal: string;
  specialAchievement: string;
  extraMoneyUse: string;
  tradingKnowledge: string;
  investmentReadiness: number;
  passiveIncomeKnowledge: number;
  marketInterests: string[];
  timeCommitment: string;
  financialConfidence: string;
  lifeSatisfaction: string;
  trustElementsViewed: string[];
  trustElementsCount: number;
  facebookEvents: any[];
  utmParams: Record<string, string>;
  utmSource: string;
  utmCampaign: string;
  utmMedium: string;
  userAgent: string;
  referrer: string;
  userStatus: string;
  visitorId: string;
  sessionDurationMinutes: number;
  progressCategory: string;
}

// Get real-time quiz statistics
export const getQuizStats = async (daysBack: number = 7): Promise<QuizStats[]> => {
  try {
    const { data, error } = await supabase.rpc('get_quiz_stats', { days_back: daysBack });
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      metric: row.metric,
      value: parseFloat(row.value),
      changePercent: parseFloat(row.change_percent)
    }));
  } catch (error) {
    console.error('Error fetching quiz stats:', error);
    throw error;
  }
};

// Get conversion funnel data
export const getConversionFunnel = async (days: number = 30): Promise<ConversionFunnel[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_conversion_funnel')
      .select('*')
      .order('date', { ascending: false })
      .limit(days);
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      date: row.date,
      totalSessions: row.total_sessions,
      trustEngaged: row.trust_engaged,
      quarterCompleted: row.quarter_completed,
      halfCompleted: row.half_completed,
      threeQuarterCompleted: row.three_quarter_completed,
      formCompletions: row.form_completions,
      emailsCollected: row.emails_collected,
      resultsViews: row.results_views,
      fullCompletions: row.full_completions,
      trustEngagementRate: row.trust_engagement_rate,
      formCompletionRate: row.form_completion_rate,
      emailCollectionRate: row.email_collection_rate,
      resultsViewRate: row.results_view_rate,
      completionRate: row.completion_rate
    }));
  } catch (error) {
    console.error('Error fetching conversion funnel:', error);
    throw error;
  }
};

// Get user segmentation data
export const getUserSegments = async (): Promise<UserSegment[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_user_segments')
      .select('*')
      .order('conversion_rate', { ascending: false });
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      gender: row.gender,
      ageRange: row.age_range,
      financialSituation: row.financial_situation,
      monthlyIncome: row.monthly_income,
      tradingKnowledge: row.trading_knowledge,
      avgInvestmentReadiness: row.avg_investment_readiness,
      segmentSize: row.segment_size,
      conversions: row.conversions,
      emailsCollected: row.emails_collected,
      resultsViews: row.results_views,
      conversionRate: row.conversion_rate,
      emailRate: row.email_rate,
      avgProgress: row.avg_progress,
      avgSessionMinutes: row.avg_session_minutes
    }));
  } catch (error) {
    console.error('Error fetching user segments:', error);
    throw error;
  }
};

// Get market interest analysis
export const getMarketAnalysis = async (): Promise<MarketAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_market_analysis')
      .select('*')
      .order('conversion_rate', { ascending: false });
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      marketInterest: row.market_interest,
      selections: row.selections,
      conversions: row.conversions,
      emailsCollected: row.emails_collected,
      conversionRate: row.conversion_rate,
      emailRate: row.email_rate,
      avgProgress: row.avg_progress
    }));
  } catch (error) {
    console.error('Error fetching market analysis:', error);
    throw error;
  }
};

// Get UTM campaign performance
export const getUTMPerformance = async (): Promise<UTMPerformance[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_utm_performance')
      .select('*')
      .order('conversion_rate', { ascending: false });
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      utmSource: row.utm_source,
      utmCampaign: row.utm_campaign,
      utmMedium: row.utm_medium,
      sessions: row.sessions,
      engagedSessions: row.engaged_sessions,
      conversions: row.conversions,
      emailsCollected: row.emails_collected,
      resultsViews: row.results_views,
      engagementRate: row.engagement_rate,
      conversionRate: row.conversion_rate,
      emailCollectionRate: row.email_collection_rate,
      avgProgress: row.avg_progress,
      avgSessionMinutes: row.avg_session_minutes
    }));
  } catch (error) {
    console.error('Error fetching UTM performance:', error);
    throw error;
  }
};

// Get trust element effectiveness
export const getTrustElementAnalysis = async (): Promise<TrustElementAnalysis[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_trust_elements')
      .select('*')
      .order('conversion_rate', { ascending: false });
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      trustElement: row.trust_element,
      views: row.views,
      conversions: row.conversions,
      emailsCollected: row.emails_collected,
      conversionRate: row.conversion_rate,
      emailRate: row.email_rate
    }));
  } catch (error) {
    console.error('Error fetching trust element analysis:', error);
    throw error;
  }
};

// Get detailed user responses
export const getUserResponses = async (limit: number = 100): Promise<UserResponse[]> => {
  try {
    const { data, error } = await supabase
      .from('quiz_analytics_responses')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (error) throw error;
    
    return data.map((row: any) => ({
      id: row.id,
      createdAt: row.created_at,
      completedAt: row.completed_at,
      userEmail: row.user_email,
      userName: row.user_name,
      currentStep: row.current_step,
      progressPercentage: row.progress_percentage,
      completedSteps: row.completed_steps,
      totalSteps: row.total_steps,
      formCompleted: row.form_completed,
      resultsViewed: row.results_viewed,
      gender: row.gender,
      ageRange: row.age_range,
      financialSituation: row.financial_situation,
      monthlyIncome: row.monthly_income,
      incomeSource: row.income_source,
      mainGoal: row.main_goal,
      specialAchievement: row.special_achievement,
      extraMoneyUse: row.extra_money_use,
      tradingKnowledge: row.trading_knowledge,
      investmentReadiness: row.investment_readiness,
      passiveIncomeKnowledge: row.passive_income_knowledge,
      marketInterests: row.market_interests || [],
      timeCommitment: row.time_commitment,
      financialConfidence: row.financial_confidence,
      lifeSatisfaction: row.life_satisfaction,
      trustElementsViewed: row.trust_elements_viewed || [],
      trustElementsCount: row.trust_elements_count,
      facebookEvents: row.facebook_events || [],
      utmParams: row.utm_params || {},
      utmSource: row.utm_source,
      utmCampaign: row.utm_campaign,
      utmMedium: row.utm_medium,
      userAgent: row.user_agent,
      referrer: row.referrer,
      userStatus: row.user_status,
      visitorId: row.visitor_id,
      sessionDurationMinutes: row.session_duration_minutes,
      progressCategory: row.progress_category
    }));
  } catch (error) {
    console.error('Error fetching user responses:', error);
    throw error;
  }
};

// Export all analytics functions
export const analytics = {
  getQuizStats,
  getConversionFunnel,
  getUserSegments,
  getMarketAnalysis,
  getUTMPerformance,
  getTrustElementAnalysis,
  getUserResponses
};