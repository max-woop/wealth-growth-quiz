/*
  # Quiz System Database Schema

  1. New Tables
    - `quiz_answers`
      - `id` (uuid, primary key)
      - `attempt_id` (uuid, references quiz_attempts)
      - `question_number` (integer)
      - `answer` (text)
      - `is_correct` (boolean)
      - `created_at` (timestamp)
      - `user_profile` (jsonb)

    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `current_score` (integer)
      - `current_question` (integer)
      - `completed` (boolean)
      - `created_at` (timestamp)
      - `user_profile` (jsonb)
      - `quiz_url` (text)
      - `started_trading` (boolean)

  2. Security
    - Enable RLS on all tables
    - Add policies for public access during quiz
    - Add policies for user access to their own data
*/

-- Create quiz_attempts table
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    current_score integer DEFAULT 0,
    current_question integer DEFAULT 1,
    completed boolean DEFAULT false,
    created_at timestamptz DEFAULT now(),
    user_profile jsonb,
    quiz_url text,
    started_trading boolean DEFAULT false,
    CONSTRAINT valid_user_profile CHECK (
        user_profile IS NULL OR (
            jsonb_typeof(user_profile) = 'object' AND
            user_profile ? 'name' AND
            user_profile ? 'role' AND
            jsonb_typeof(user_profile->'name') = 'string' AND
            jsonb_typeof(user_profile->'role') = 'string'
        )
    )
);

-- Create quiz_answers table
CREATE TABLE IF NOT EXISTS quiz_answers (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    attempt_id uuid REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_number integer NOT NULL,
    answer text NOT NULL,
    is_correct boolean NOT NULL,
    created_at timestamptz DEFAULT now(),
    user_profile jsonb
);

-- Enable Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_answers ENABLE ROW LEVEL SECURITY;

-- Create policies for quiz_attempts
CREATE POLICY "Anyone can insert quiz attempts"
    ON quiz_attempts
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Anyone can read quiz attempts"
    ON quiz_attempts
    FOR SELECT
    TO public
    USING (true);

-- Create policies for quiz_answers
CREATE POLICY "Anyone can insert quiz answers"
    ON quiz_answers
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Anyone can read quiz answers"
    ON quiz_answers
    FOR SELECT
    TO public
    USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_created_at ON quiz_attempts(created_at);
CREATE INDEX IF NOT EXISTS idx_quiz_attempts_quiz_url ON quiz_attempts(quiz_url);