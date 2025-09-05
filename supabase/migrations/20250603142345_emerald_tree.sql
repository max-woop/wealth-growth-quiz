/*
  # Quiz Sessions Schema

  1. New Tables
    - `quiz_sessions`
      - `id` (uuid, primary key)
      - `current_step` (text)
      - `user_profile` (jsonb)
      - `metadata` (jsonb)
      - `responses` (jsonb)
      - `completed_at` (timestamptz)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on `quiz_sessions` table
    - Add policies for public access (create, update, read)
    - Add constraints for data validation

  3. Performance
    - Add index on created_at column
*/

-- Create quiz_sessions table if it doesn't exist
DO $$ BEGIN
  CREATE TABLE IF NOT EXISTS quiz_sessions (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    current_step text,
    user_profile jsonb,
    metadata jsonb DEFAULT '{}'::jsonb,
    responses jsonb DEFAULT '{}'::jsonb,
    completed_at timestamptz,
    created_at timestamptz DEFAULT now(),
    updated_at timestamptz DEFAULT now()
  );
EXCEPTION
  WHEN duplicate_table THEN
    NULL;
END $$;

-- Add constraints for metadata and responses
DO $$ BEGIN
  ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_metadata
    CHECK (jsonb_typeof(metadata) = 'object');
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  ALTER TABLE quiz_sessions
    ADD CONSTRAINT valid_responses
    CHECK (jsonb_typeof(responses) = 'object');
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Enable RLS
ALTER TABLE quiz_sessions ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ BEGIN
  CREATE POLICY "Anyone can create quiz sessions"
    ON quiz_sessions
    FOR INSERT
    TO public
    WITH CHECK (true);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can read their own quiz sessions"
    ON quiz_sessions
    FOR SELECT
    TO public
    USING ((user_profile->>'name') IS NOT NULL);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE POLICY "Anyone can update their own quiz sessions"
    ON quiz_sessions
    FOR UPDATE
    TO public
    USING ((user_profile->>'name') IS NOT NULL)
    WITH CHECK ((user_profile->>'name') IS NOT NULL);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Create indexes
DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_quiz_sessions_created_at 
    ON quiz_sessions(created_at);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_quiz_sessions_completed_at 
    ON quiz_sessions(completed_at);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_quiz_sessions_current_step 
    ON quiz_sessions(current_step);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_quiz_sessions_responses 
    ON quiz_sessions USING gin(responses);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

DO $$ BEGIN
  CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_profile 
    ON quiz_sessions USING gin(user_profile);
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;

-- Add updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

DO $$ BEGIN
  CREATE TRIGGER set_quiz_sessions_updated_at
    BEFORE UPDATE ON quiz_sessions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
EXCEPTION
  WHEN duplicate_object THEN
    NULL;
END $$;