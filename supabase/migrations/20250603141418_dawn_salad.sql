/*
  # Quiz System Database Setup

  1. Tables
    - quiz_attempts: Stores quiz session data
      - id (uuid, primary key)
      - user_id (uuid, foreign key to users)
      - current_score (integer)
      - current_question (integer)
      - completed (boolean)
      - created_at (timestamp)
      - user_profile (jsonb)
      - quiz_url (text)
      - started_trading (boolean)
    
    - quiz_answers: Stores individual answers for each attempt
      - id (uuid, primary key)
      - attempt_id (uuid, foreign key to quiz_attempts)
      - question_number (integer)
      - answer (text)
      - is_correct (boolean)
      - created_at (timestamp)
      - user_profile (jsonb)

  2. Security
    - Enable RLS on all tables
    - Public access policies for quiz_attempts and quiz_answers
    - Authenticated user access policy for users table
*/

-- Create users table if it doesn't exist
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now()
);

-- Create quiz_attempts table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  current_score integer DEFAULT 0,
  current_question integer DEFAULT 1,
  completed boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  user_profile jsonb,
  quiz_url text,
  started_trading boolean DEFAULT false,
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

-- Create quiz_answers table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_answers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  attempt_id uuid REFERENCES quiz_attempts(id) ON DELETE CASCADE,
  question_number integer NOT NULL,
  answer text NOT NULL,
  is_correct boolean NOT NULL,
  created_at timestamptz DEFAULT now(),
  user_profile jsonb
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_url ON quiz_attempts(quiz_url);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'users' AND policyname = 'Users can read own data'
  ) THEN
    CREATE POLICY "Users can read own data" ON users
      FOR SELECT
      TO authenticated
      USING (auth.uid() = id);
  END IF;
END $$;

-- Create policies for quiz_attempts table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'quiz_attempts' AND policyname = 'Anyone can insert quiz attempts'
  ) THEN
    CREATE POLICY "Anyone can insert quiz attempts" ON quiz_attempts
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'quiz_attempts' AND policyname = 'Anyone can read quiz attempts'
  ) THEN
    CREATE POLICY "Anyone can read quiz attempts" ON quiz_attempts
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;

-- Create policies for quiz_answers table
DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Anyone can insert quiz answers'
  ) THEN
    CREATE POLICY "Anyone can insert quiz answers" ON quiz_answers
      FOR INSERT
      TO public
      WITH CHECK (true);
  END IF;
END $$;

DO $$ BEGIN
  IF NOT EXISTS (
    SELECT FROM pg_policies WHERE tablename = 'quiz_answers' AND policyname = 'Anyone can read quiz answers'
  ) THEN
    CREATE POLICY "Anyone can read quiz answers" ON quiz_answers
      FOR SELECT
      TO public
      USING (true);
  END IF;
END $$;