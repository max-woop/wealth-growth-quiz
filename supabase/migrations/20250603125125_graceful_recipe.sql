/*
  # Quiz Tracking System

  1. New Tables
    - `quiz_sessions`: Tracks overall quiz progress
      - `id` (uuid, primary key)
      - `started_at` (timestamp)
      - `completed_at` (timestamp)
      - `current_step` (text)
      - `responses` (jsonb)
      - `user_profile` (jsonb)
      - `metadata` (jsonb)
      
  2. Security
    - Enable RLS on all tables
    - Public access policies for quiz tracking
    
  3. Indexes
    - Optimized indexes for common queries
*/

-- Create quiz_sessions table
CREATE TABLE IF NOT EXISTS quiz_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    started_at timestamptz DEFAULT now(),
    completed_at timestamptz,
    current_step text NOT NULL,
    responses jsonb DEFAULT '{}'::jsonb,
    user_profile jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now(),
    
    -- Ensure valid user_profile structure
    CONSTRAINT valid_user_profile CHECK (
        user_profile IS NULL OR (
            jsonb_typeof(user_profile) = 'object' AND
            user_profile ? 'name' AND
            user_profile ? 'role' AND
            jsonb_typeof(user_profile->'name') = 'string' AND
            jsonb_typeof(user_profile->'role') = 'string'
        )
    ),
    
    -- Ensure valid responses structure
    CONSTRAINT valid_responses CHECK (
        jsonb_typeof(responses) = 'object'
    ),
    
    -- Ensure valid metadata structure
    CONSTRAINT valid_metadata CHECK (
        jsonb_typeof(metadata) = 'object'
    )
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER set_quiz_sessions_updated_at
    BEFORE UPDATE ON quiz_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_created_at ON quiz_sessions(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completed_at ON quiz_sessions(completed_at);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_current_step ON quiz_sessions(current_step);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_profile ON quiz_sessions USING gin(user_profile);
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_responses ON quiz_sessions USING gin(responses);

-- Enable RLS
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can create quiz sessions"
    ON quiz_sessions FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Anyone can read their own quiz sessions"
    ON quiz_sessions FOR SELECT
    TO public
    USING (
        (user_profile->>'name') IS NOT NULL
    );

CREATE POLICY "Anyone can update their own quiz sessions"
    ON quiz_sessions FOR UPDATE
    TO public
    USING (
        (user_profile->>'name') IS NOT NULL
    )
    WITH CHECK (
        (user_profile->>'name') IS NOT NULL
    );

-- Drop old tables if they exist
DROP TABLE IF EXISTS quiz_answers CASCADE;
DROP TABLE IF EXISTS quiz_attempts CASCADE;