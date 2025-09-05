/*
  # Quiz Sessions Schema
  
  1. New Tables
    - quiz_sessions: Stores user quiz progress and responses
  
  2. Security
    - Enable RLS
    - Policies for anonymous and authenticated access
    
  3. Indexes & Constraints
    - Timestamps, responses, and user profile indexes
    - JSON validation constraints
*/

-- Drop existing tables if they exist
DROP TABLE IF EXISTS quiz_answers CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;
DROP TABLE IF EXISTS users CASCADE;

-- Create the quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  started_at timestamptz DEFAULT now(),
  completed_at timestamptz,
  current_step text NOT NULL,
  responses jsonb DEFAULT '{}'::jsonb,
  user_profile jsonb,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create indexes for better query performance
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_quiz_sessions_completed_at'
  ) THEN
    CREATE INDEX idx_quiz_sessions_completed_at ON quiz_sessions(completed_at);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_quiz_sessions_created_at'
  ) THEN
    CREATE INDEX idx_quiz_sessions_created_at ON quiz_sessions(created_at);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_quiz_sessions_current_step'
  ) THEN
    CREATE INDEX idx_quiz_sessions_current_step ON quiz_sessions(current_step);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_quiz_sessions_responses'
  ) THEN
    CREATE INDEX idx_quiz_sessions_responses ON quiz_sessions USING gin(responses);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_indexes 
    WHERE indexname = 'idx_quiz_sessions_user_profile'
  ) THEN
    CREATE INDEX idx_quiz_sessions_user_profile ON quiz_sessions USING gin(user_profile);
  END IF;
END $$;

-- Enable Row Level Security
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow anonymous session creation'
    AND tablename = 'quiz_sessions'
  ) THEN
    CREATE POLICY "Allow anonymous session creation"
      ON quiz_sessions
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow reading own sessions'
    AND tablename = 'quiz_sessions'
  ) THEN
    CREATE POLICY "Allow reading own sessions"
      ON quiz_sessions
      FOR SELECT
      TO public
      USING ((user_profile IS NULL) OR ((user_profile->>'name') IS NOT NULL));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE policyname = 'Allow updating own sessions'
    AND tablename = 'quiz_sessions'
  ) THEN
    CREATE POLICY "Allow updating own sessions"
      ON quiz_sessions
      FOR UPDATE
      TO public
      USING ((user_profile IS NULL) OR ((user_profile->>'name') IS NOT NULL))
      WITH CHECK ((user_profile IS NULL) OR ((user_profile->>'name') IS NOT NULL));
  END IF;
END $$;

-- Create trigger for updating updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'set_quiz_sessions_updated_at'
  ) THEN
    CREATE TRIGGER set_quiz_sessions_updated_at
      BEFORE UPDATE ON quiz_sessions
      FOR EACH ROW
      EXECUTE FUNCTION update_updated_at_column();
  END IF;
END $$;

-- Add constraints for JSONB validation
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_responses' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_responses
    CHECK (jsonb_typeof(responses) = 'object');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_metadata' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_metadata
    CHECK (jsonb_typeof(metadata) = 'object');
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.table_constraints 
    WHERE constraint_name = 'valid_user_profile' 
    AND table_name = 'quiz_sessions'
  ) THEN
    ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_user_profile
    CHECK (
      user_profile IS NULL OR (
        jsonb_typeof(user_profile) = 'object' AND
        user_profile ? 'name' AND
        user_profile ? 'role' AND
        jsonb_typeof(user_profile->'name') = 'string' AND
        jsonb_typeof(user_profile->'role') = 'string'
      )
    );
  END IF;
END $$;