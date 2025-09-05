/*
  # Add email tracking to quiz sessions

  1. Changes
    - Update user_profile constraint to include optional email field
    - Add index for email queries
    - Update existing constraint to allow email in user_profile

  2. Security
    - Maintain existing RLS policies
    - Ensure email data is properly validated
*/

-- Update the user_profile constraint to allow email field
ALTER TABLE quiz_sessions DROP CONSTRAINT IF EXISTS valid_user_profile;

ALTER TABLE quiz_sessions
ADD CONSTRAINT valid_user_profile
CHECK (
  user_profile IS NULL OR (
    jsonb_typeof(user_profile) = 'object' AND
    user_profile ? 'name' AND
    user_profile ? 'role' AND
    jsonb_typeof(user_profile->'name') = 'string' AND
    jsonb_typeof(user_profile->'role') = 'string' AND
    (
      NOT user_profile ? 'email' OR 
      jsonb_typeof(user_profile->'email') = 'string'
    )
  )
);

-- Add index for email queries in user_profile
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_email 
ON quiz_sessions USING gin((user_profile->'email'));

-- Add comment explaining the email tracking
COMMENT ON COLUMN quiz_sessions.user_profile IS 'User profile information including name, role, and optional email address';
COMMENT ON COLUMN quiz_sessions.responses IS 'Complete user responses to all quiz questions for analysis';