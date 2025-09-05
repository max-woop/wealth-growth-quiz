/*
  # Update quiz attempts table permissions

  1. Changes
    - Add RLS policies for quiz attempts table to allow proper access
    - Add policies for inserting and updating quiz attempts
    - Add policies for reading quiz attempts
  
  2. Security
    - Enable RLS on quiz_attempts table (already enabled)
    - Add policies for public access to allow quiz functionality
*/

-- Drop existing policies to recreate them with proper permissions
DROP POLICY IF EXISTS "Anyone can insert quiz attempts" ON quiz_attempts;
DROP POLICY IF EXISTS "Anyone can read quiz attempts" ON quiz_attempts;

-- Create comprehensive policies for quiz attempts
CREATE POLICY "Enable insert access for all users" 
ON quiz_attempts FOR INSERT 
TO public 
WITH CHECK (true);

CREATE POLICY "Enable read access for all users" 
ON quiz_attempts FOR SELECT 
TO public 
USING (true);

CREATE POLICY "Enable update access for all users" 
ON quiz_attempts FOR UPDATE 
TO public 
USING (true)
WITH CHECK (true);

-- Ensure RLS is enabled (although it already is according to schema)
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;