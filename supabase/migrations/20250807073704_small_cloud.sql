/*
  # Add visitor_id tracking to quiz sessions

  1. Schema Changes
    - Add `visitor_id` column to `quiz_sessions` table
    - Update `quiz_analytics_responses` view to include visitor_id
    - Add index for visitor_id for better query performance

  2. Security
    - No RLS changes needed as visitor_id is just an identifier

  3. Notes
    - visitor_id will be generated client-side and stored for each session
    - This allows tracking unique visitors across sessions
*/

-- Add visitor_id column to quiz_sessions table
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'quiz_sessions' AND column_name = 'visitor_id'
  ) THEN
    ALTER TABLE quiz_sessions ADD COLUMN visitor_id text;
  END IF;
END $$;

-- Add index for visitor_id
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_visitor_id 
ON quiz_sessions (visitor_id) 
WHERE visitor_id IS NOT NULL;

-- Update the quiz_analytics_responses view to include visitor_id
DROP VIEW IF EXISTS quiz_analytics_responses;

CREATE VIEW quiz_analytics_responses AS
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
  visitor_id,
  
  -- Response fields
  responses->>'gender' as gender,
  responses->>'age' as age_range,
  responses->>'financialSituation' as financial_situation,
  responses->>'monthlyIncome' as monthly_income,
  responses->>'incomeSource' as income_source,
  responses->>'mainGoal' as main_goal,
  responses->>'specialAchievement' as special_achievement,
  responses->>'extraMoneyUse' as extra_money_use,
  responses->>'tradingKnowledge' as trading_knowledge,
  CAST(responses->>'investmentReadiness' AS numeric) as investment_readiness,
  CAST(responses->>'passiveIncomeKnowledge' AS numeric) as passive_income_knowledge,
  responses->'marketInterests' as market_interests,
  responses->>'timeCommitment' as time_commitment,
  responses->>'financialConfidence' as financial_confidence,
  responses->>'lifeSatisfaction' as life_satisfaction,
  
  -- Tracking fields
  trust_elements_viewed,
  CASE 
    WHEN trust_elements_viewed IS NOT NULL 
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
  
  -- Calculated fields
  CASE 
    WHEN completed_at IS NOT NULL THEN 'completed'
    WHEN form_completed = true THEN 'form_completed'
    WHEN progress_percentage >= 75 THEN 'high_progress'
    WHEN progress_percentage >= 50 THEN 'medium_progress'
    WHEN progress_percentage >= 25 THEN 'low_progress'
    ELSE 'started'
  END as user_status,
  
  CASE 
    WHEN completed_at IS NOT NULL AND created_at IS NOT NULL 
    THEN EXTRACT(EPOCH FROM (completed_at - created_at))/60
    WHEN last_active IS NOT NULL AND created_at IS NOT NULL
    THEN EXTRACT(EPOCH FROM (last_active - created_at))/60
    ELSE NULL 
  END as session_duration_minutes,
  
  CASE 
    WHEN progress_percentage >= 75 THEN 'high'
    WHEN progress_percentage >= 50 THEN 'medium'
    WHEN progress_percentage >= 25 THEN 'low'
    ELSE 'minimal'
  END as progress_category

FROM quiz_sessions
WHERE created_at >= CURRENT_DATE - INTERVAL '90 days'
ORDER BY created_at DESC;