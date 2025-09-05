-- Add enhanced email tracking with better indexing
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_email_extracted 
ON quiz_sessions ((user_profile->>'email')) 
WHERE user_profile->>'email' IS NOT NULL;

-- Add completion funnel indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completion_funnel 
ON quiz_sessions (form_completed, results_viewed, completed_at);

-- Add response analysis indexes (using specific response fields instead of jsonb_object_keys)
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_gender 
ON quiz_sessions ((responses->>'gender')) 
WHERE responses->>'gender' IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_age 
ON quiz_sessions ((responses->>'age')) 
WHERE responses->>'age' IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_trading_knowledge 
ON quiz_sessions ((responses->>'tradingKnowledge')) 
WHERE responses->>'tradingKnowledge' IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_financial_situation 
ON quiz_sessions ((responses->>'financialSituation')) 
WHERE responses->>'financialSituation' IS NOT NULL;

-- Add user journey tracking indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_journey 
ON quiz_sessions (created_at, current_step, progress_percentage);

-- Add UTM campaign analysis indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_utm_source 
ON quiz_sessions ((utm_params->>'utm_source')) 
WHERE utm_params->>'utm_source' IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_quiz_sessions_utm_campaign 
ON quiz_sessions ((utm_params->>'utm_campaign')) 
WHERE utm_params->>'utm_campaign' IS NOT NULL;

-- Create analytics view for user responses
CREATE OR REPLACE VIEW quiz_analytics_responses AS
SELECT 
  id,
  created_at,
  completed_at,
  user_profile->>'email' as user_email,
  user_profile->>'name' as user_name,
  current_step,
  progress_percentage,
  completed_steps,
  total_steps,
  form_completed,
  results_viewed,
  
  -- Demographics
  responses->>'gender' as gender,
  responses->>'age' as age_range,
  
  -- Financial Profile
  responses->>'financialSituation' as financial_situation,
  responses->>'monthlyIncome' as monthly_income,
  responses->>'incomeSource' as income_source,
  
  -- Goals and Motivations
  responses->>'mainGoal' as main_goal,
  responses->>'specialAchievement' as special_achievement,
  responses->>'extraMoneyUse' as extra_money_use,
  
  -- Trading Knowledge
  responses->>'tradingKnowledge' as trading_knowledge,
  (responses->>'investmentReadiness')::numeric as investment_readiness,
  (responses->>'passiveIncomeKnowledge')::numeric as passive_income_knowledge,
  
  -- Market Interests (as array)
  responses->'marketInterests' as market_interests,
  
  -- Behavioral Data
  responses->>'timeCommitment' as time_commitment,
  responses->>'financialConfidence' as financial_confidence,
  responses->>'lifeSatisfaction' as life_satisfaction,
  
  -- Tracking Data
  trust_elements_viewed,
  CASE 
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_typeof(trust_elements_viewed) = 'array' 
    THEN jsonb_array_length(trust_elements_viewed) 
    ELSE 0 
  END as trust_elements_count,
  facebook_events,
  utm_params,
  utm_params->>'utm_source' as utm_source,
  utm_params->>'utm_campaign' as utm_campaign,
  utm_params->>'utm_medium' as utm_medium,
  user_agent,
  referrer,
  
  -- Calculated Fields
  CASE 
    WHEN completed_at IS NOT NULL THEN 'completed'
    WHEN results_viewed THEN 'results_viewed'
    WHEN form_completed THEN 'form_completed'
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_array_length(trust_elements_viewed) > 0 THEN 'trust_engaged'
    ELSE 'started'
  END as user_status,
  
  EXTRACT(EPOCH FROM (COALESCE(completed_at, last_active) - created_at))/60 as session_duration_minutes,
  
  CASE 
    WHEN progress_percentage >= 100 THEN 'completed'
    WHEN progress_percentage >= 75 THEN 'high_progress'
    WHEN progress_percentage >= 50 THEN 'medium_progress'
    WHEN progress_percentage >= 25 THEN 'low_progress'
    ELSE 'just_started'
  END as progress_category

FROM quiz_sessions
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'; -- Last 90 days for performance

-- Create conversion funnel view
CREATE OR REPLACE VIEW quiz_conversion_funnel AS
SELECT 
  DATE(created_at) as date,
  COUNT(*) as total_sessions,
  
  -- Engagement Metrics
  COUNT(CASE 
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_array_length(trust_elements_viewed) > 0 
    THEN 1 
  END) as trust_engaged,
  COUNT(CASE WHEN progress_percentage >= 25 THEN 1 END) as quarter_completed,
  COUNT(CASE WHEN progress_percentage >= 50 THEN 1 END) as half_completed,
  COUNT(CASE WHEN progress_percentage >= 75 THEN 1 END) as three_quarter_completed,
  
  -- Conversion Metrics
  COUNT(CASE WHEN form_completed THEN 1 END) as form_completions,
  COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails_collected,
  COUNT(CASE WHEN results_viewed THEN 1 END) as results_views,
  COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END) as full_completions,
  
  -- Conversion Rates (with proper type casting)
  ROUND(COUNT(CASE 
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_array_length(trust_elements_viewed) > 0 
    THEN 1 
  END)::numeric * 100.0 / COUNT(*)::numeric, 2) as trust_engagement_rate,
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as form_completion_rate,
  ROUND(COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as email_collection_rate,
  ROUND(COUNT(CASE WHEN results_viewed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as results_view_rate,
  ROUND(COUNT(CASE WHEN completed_at IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as completion_rate

FROM quiz_sessions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY DATE(created_at)
ORDER BY date DESC;

-- Create user segmentation view
CREATE OR REPLACE VIEW quiz_user_segments AS
SELECT 
  -- Demographics
  responses->>'gender' as gender,
  responses->>'age' as age_range,
  responses->>'financialSituation' as financial_situation,
  responses->>'monthlyIncome' as monthly_income,
  responses->>'tradingKnowledge' as trading_knowledge,
  ROUND(AVG((responses->>'investmentReadiness')::numeric)::numeric, 2) as avg_investment_readiness,
  
  -- Segment Metrics
  COUNT(*) as segment_size,
  COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
  COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails_collected,
  COUNT(CASE WHEN results_viewed THEN 1 END) as results_views,
  
  -- Conversion Rates (with proper type casting)
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as conversion_rate,
  ROUND(COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as email_rate,
  ROUND(AVG(progress_percentage::numeric)::numeric, 2) as avg_progress,
  ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(completed_at, last_active) - created_at))/60)::numeric, 2) as avg_session_minutes

FROM quiz_sessions
WHERE created_at >= CURRENT_DATE - INTERVAL '30 days'
  AND responses IS NOT NULL
GROUP BY 
  responses->>'gender',
  responses->>'age',
  responses->>'financialSituation',
  responses->>'monthlyIncome',
  responses->>'tradingKnowledge'
HAVING COUNT(*) >= 5 -- Only show segments with at least 5 users
ORDER BY conversion_rate DESC, segment_size DESC;

-- Create market interest analysis view
CREATE OR REPLACE VIEW quiz_market_analysis AS
SELECT 
  market_interest,
  COUNT(*) as selections,
  COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
  COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails_collected,
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as conversion_rate,
  ROUND(COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as email_rate,
  ROUND(AVG(progress_percentage::numeric)::numeric, 2) as avg_progress

FROM quiz_sessions,
LATERAL jsonb_array_elements_text(responses->'marketInterests') as market_interest
WHERE responses->'marketInterests' IS NOT NULL
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY market_interest
ORDER BY conversion_rate DESC, selections DESC;

-- Create UTM campaign performance view
CREATE OR REPLACE VIEW quiz_utm_performance AS
SELECT 
  utm_params->>'utm_source' as utm_source,
  utm_params->>'utm_campaign' as utm_campaign,
  utm_params->>'utm_medium' as utm_medium,
  
  COUNT(*) as sessions,
  COUNT(CASE 
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_array_length(trust_elements_viewed) > 0 
    THEN 1 
  END) as engaged_sessions,
  COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
  COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails_collected,
  COUNT(CASE WHEN results_viewed THEN 1 END) as results_views,
  
  -- Rates with proper type casting
  ROUND(COUNT(CASE 
    WHEN trust_elements_viewed IS NOT NULL AND jsonb_array_length(trust_elements_viewed) > 0 
    THEN 1 
  END)::numeric * 100.0 / COUNT(*)::numeric, 2) as engagement_rate,
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as conversion_rate,
  ROUND(COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as email_collection_rate,
  ROUND(AVG(progress_percentage::numeric)::numeric, 2) as avg_progress,
  ROUND(AVG(EXTRACT(EPOCH FROM (COALESCE(completed_at, last_active) - created_at))/60)::numeric, 2) as avg_session_minutes

FROM quiz_sessions
WHERE utm_params->>'utm_source' IS NOT NULL
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY 
  utm_params->>'utm_source',
  utm_params->>'utm_campaign', 
  utm_params->>'utm_medium'
ORDER BY conversion_rate DESC, sessions DESC;

-- Create trust element effectiveness view
CREATE OR REPLACE VIEW quiz_trust_elements AS
SELECT 
  trust_element,
  COUNT(*) as views,
  COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
  COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails_collected,
  ROUND(COUNT(CASE WHEN form_completed THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as conversion_rate,
  ROUND(COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END)::numeric * 100.0 / COUNT(*)::numeric, 2) as email_rate

FROM quiz_sessions,
LATERAL jsonb_array_elements_text(trust_elements_viewed) as trust_element
WHERE trust_elements_viewed != '[]'::jsonb
  AND created_at >= CURRENT_DATE - INTERVAL '30 days'
GROUP BY trust_element
ORDER BY conversion_rate DESC, views DESC;

-- Create function for real-time analytics
CREATE OR REPLACE FUNCTION get_quiz_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  metric TEXT,
  value NUMERIC,
  change_percent NUMERIC
) AS $$
DECLARE
  current_period_start DATE := CURRENT_DATE - INTERVAL '1 day' * days_back;
  previous_period_start DATE := CURRENT_DATE - INTERVAL '1 day' * (days_back * 2);
  previous_period_end DATE := CURRENT_DATE - INTERVAL '1 day' * days_back;
BEGIN
  RETURN QUERY
  WITH current_stats AS (
    SELECT 
      COUNT(*) as total_sessions,
      COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
      COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails,
      COUNT(CASE WHEN results_viewed THEN 1 END) as results_views,
      AVG(progress_percentage::numeric) as avg_progress
    FROM quiz_sessions 
    WHERE created_at >= current_period_start
  ),
  previous_stats AS (
    SELECT 
      COUNT(*) as total_sessions,
      COUNT(CASE WHEN form_completed THEN 1 END) as conversions,
      COUNT(CASE WHEN user_profile->>'email' IS NOT NULL THEN 1 END) as emails,
      COUNT(CASE WHEN results_viewed THEN 1 END) as results_views,
      AVG(progress_percentage::numeric) as avg_progress
    FROM quiz_sessions 
    WHERE created_at >= previous_period_start AND created_at < previous_period_end
  )
  SELECT 'Total Sessions'::TEXT, 
         c.total_sessions::NUMERIC,
         CASE WHEN p.total_sessions > 0 THEN 
           ROUND(((c.total_sessions - p.total_sessions)::numeric * 100.0 / p.total_sessions::numeric), 2)
         ELSE 0 END
  FROM current_stats c, previous_stats p
  
  UNION ALL
  
  SELECT 'Conversions'::TEXT, 
         c.conversions::NUMERIC,
         CASE WHEN p.conversions > 0 THEN 
           ROUND(((c.conversions - p.conversions)::numeric * 100.0 / p.conversions::numeric), 2)
         ELSE 0 END
  FROM current_stats c, previous_stats p
  
  UNION ALL
  
  SELECT 'Emails Collected'::TEXT, 
         c.emails::NUMERIC,
         CASE WHEN p.emails > 0 THEN 
           ROUND(((c.emails - p.emails)::numeric * 100.0 / p.emails::numeric), 2)
         ELSE 0 END
  FROM current_stats c, previous_stats p
  
  UNION ALL
  
  SELECT 'Results Views'::TEXT, 
         c.results_views::NUMERIC,
         CASE WHEN p.results_views > 0 THEN 
           ROUND(((c.results_views - p.results_views)::numeric * 100.0 / p.results_views::numeric), 2)
         ELSE 0 END
  FROM current_stats c, previous_stats p
  
  UNION ALL
  
  SELECT 'Avg Progress %'::TEXT, 
         ROUND(c.avg_progress::numeric, 2),
         CASE WHEN p.avg_progress > 0 THEN 
           ROUND(((c.avg_progress - p.avg_progress)::numeric * 100.0 / p.avg_progress::numeric), 2)
         ELSE 0 END
  FROM current_stats c, previous_stats p;
END;
$$ LANGUAGE plpgsql;

-- Add comments for documentation
COMMENT ON VIEW quiz_analytics_responses IS 'Comprehensive view of user responses with calculated fields for analytics';
COMMENT ON VIEW quiz_conversion_funnel IS 'Daily conversion funnel metrics showing user progression through quiz';
COMMENT ON VIEW quiz_user_segments IS 'User segmentation analysis by demographics and behavior';
COMMENT ON VIEW quiz_market_analysis IS 'Market interest analysis with conversion rates';
COMMENT ON VIEW quiz_utm_performance IS 'UTM campaign performance metrics';
COMMENT ON VIEW quiz_trust_elements IS 'Trust element effectiveness analysis';
COMMENT ON FUNCTION get_quiz_stats IS 'Real-time quiz statistics with period-over-period comparison';