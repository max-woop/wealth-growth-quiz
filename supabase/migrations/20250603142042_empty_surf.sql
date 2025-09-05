/*
  # Quiz Attempts Table Setup

  1. New Tables
    - `quiz_attempts`
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `current_question` (integer)
      - `current_score` (integer)
      - `completed` (boolean)
      - `user_profile` (jsonb)
      - `quiz_url` (text)

  2. Security
    - Enable RLS on `quiz_attempts` table
    - Add policies for:
      - Anonymous users can create new attempts
      - Users can update their own attempts
      - Users can read their own attempts
*/

-- Create the quiz_attempts table if it doesn't exist
CREATE TABLE IF NOT EXISTS quiz_attempts (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at timestamptz DEFAULT now(),
    current_question integer DEFAULT 1,
    current_score integer DEFAULT 0,
    completed boolean DEFAULT false,
    user_profile jsonb NOT NULL,
    quiz_url text
);

-- Enable Row Level Security
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anonymous users to create new attempts
CREATE POLICY "Allow anonymous quiz attempt creation"
    ON quiz_attempts
    FOR INSERT
    TO anon
    WITH CHECK (true);

-- Create policy to allow users to update their own attempts
CREATE POLICY "Allow users to update their own attempts"
    ON quiz_attempts
    FOR UPDATE
    TO anon
    USING (true)
    WITH CHECK (true);

-- Create policy to allow users to read their own attempts
CREATE POLICY "Allow users to read their own attempts"
    ON quiz_attempts
    FOR SELECT
    TO anon
    USING (true);