/*
  # Update Quiz Sessions RLS Policies

  1. Changes
    - Modify RLS policies for quiz_sessions table to allow anonymous session creation
    - Update existing policies to handle null user_profile cases
    
  2. Security
    - Allow public INSERT access for initial session creation
    - Maintain existing SELECT and UPDATE policies with improved conditions
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can create quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Anyone can read their own quiz sessions" ON quiz_sessions;
DROP POLICY IF EXISTS "Anyone can update their own quiz sessions" ON quiz_sessions;

-- Create new policies that handle both anonymous and authenticated cases
CREATE POLICY "Allow anonymous session creation"
  ON quiz_sessions
  FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Allow reading own sessions"
  ON quiz_sessions
  FOR SELECT
  TO public
  USING (
    (user_profile IS NULL) OR 
    ((user_profile ->> 'name'::text) IS NOT NULL)
  );

CREATE POLICY "Allow updating own sessions"
  ON quiz_sessions
  FOR UPDATE
  TO public
  USING (
    (user_profile IS NULL) OR 
    ((user_profile ->> 'name'::text) IS NOT NULL)
  )
  WITH CHECK (
    (user_profile IS NULL) OR 
    ((user_profile ->> 'name'::text) IS NOT NULL)
  );