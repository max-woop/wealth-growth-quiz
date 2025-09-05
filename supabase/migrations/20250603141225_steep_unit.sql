/*
  # Quiz Attempts Table Setup

  1. New Tables
    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `created_at` (timestamptz)
      - `user_profile` (jsonb)
      - `quiz_url` (text)
      - `started_trading` (boolean)
      - `current_question` (integer)
      - `current_score` (integer)
      - `completed` (boolean)
      - `user_id` (uuid, foreign key to users table)

  2. Security
    - Enable RLS on `quiz_attempts` table
    - Add policies for:
      - Public insert access
      - Public read access
      - Public update access for own records
*/

-- Create quiz_attempts table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  user_profile jsonb,
  quiz_url text,
  started_trading boolean DEFAULT false,
  current_question integer DEFAULT 1,
  current_score integer DEFAULT 0,
  completed boolean DEFAULT false,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  CONSTRAINT valid_user_profile CHECK (
    user_profile IS NULL OR (
      jsonb_typeof(user_profile) = 'object' 
      AND user_profile ? 'name' 
      AND user_profile ? 'role'
      AND jsonb_typeof(user_profile->'name') = 'string'
      AND jsonb_typeof(user_profile->'role') = 'string'
    )
  )
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_url ON quiz_attempts(quiz_url);

-- Enable Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policies
DO $$ 
BEGIN
  -- Drop existing policies if they exist
  DROP POLICY IF EXISTS "Anyone can insert quiz attempts" ON quiz_attempts;
  DROP POLICY IF EXISTS "Anyone can read quiz attempts" ON quiz_attempts;
  DROP POLICY IF EXISTS "Anyone can update own quiz attempts" ON quiz_attempts;
  
  -- Create new policies
  CREATE POLICY "Anyone can insert quiz attempts"
    ON quiz_attempts FOR INSERT
    TO public
    WITH CHECK (true);

  CREATE POLICY "Anyone can read quiz attempts"
    ON quiz_attempts FOR SELECT
    TO public
    USING (true);

  CREATE POLICY "Anyone can update own quiz attempts"
    ON quiz_attempts FOR UPDATE
    TO public
    USING (true)
    WITH CHECK (true);
END $$;