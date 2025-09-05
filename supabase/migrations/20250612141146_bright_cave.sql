/*
  # Add tracking fields for Trust Elements and Facebook events
  
  1. New Fields
    - trust_elements_viewed (jsonb): Track which trust elements user has seen
    - form_completed (boolean): Track if user completed the lead capture form
    - results_viewed (boolean): Track if user reached results page
    - facebook_events (jsonb): Track Facebook pixel events fired
    - user_agent (text): Track user's browser/device info
    - referrer (text): Track where user came from
    - utm_params (jsonb): Track UTM parameters
  
  2. Changes
    - Add tracking fields to quiz_sessions table
    - Add indexes for analytics queries
*/

-- Add new tracking columns to quiz_sessions
ALTER TABLE quiz_sessions 
ADD COLUMN IF NOT EXISTS trust_elements_viewed jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS form_completed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS results_viewed boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS facebook_events jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS user_agent text,
ADD COLUMN IF NOT EXISTS referrer text,
ADD COLUMN IF NOT EXISTS utm_params jsonb DEFAULT '{}'::jsonb;

-- Add indexes for analytics queries
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_trust_elements ON quiz_sessions USING gin(trust_elements_viewed);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_form_completed ON quiz_sessions(form_completed);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_results_viewed ON quiz_sessions(results_viewed);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_facebook_events ON quiz_sessions USING gin(facebook_events);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_utm_params ON quiz_sessions USING gin(utm_params);

-- Add constraints for JSONB validation
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_trust_elements_viewed' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_trust_elements_viewed
    CHECK (jsonb_typeof(trust_elements_viewed) = 'array');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_facebook_events' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_facebook_events
    CHECK (jsonb_typeof(facebook_events) = 'array');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_utm_params' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_utm_params
    CHECK (jsonb_typeof(utm_params) = 'object');
  END IF;
END $$;