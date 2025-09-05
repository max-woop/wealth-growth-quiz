-- Add new tracking columns to quiz_sessions
ALTER TABLE quiz_sessions 
ADD COLUMN IF NOT EXISTS progress_percentage float DEFAULT 0,
ADD COLUMN IF NOT EXISTS total_steps integer DEFAULT 20,
ADD COLUMN IF NOT EXISTS completed_steps integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS last_active timestamptz DEFAULT now();

-- Create function to calculate progress percentage
CREATE OR REPLACE FUNCTION calculate_quiz_progress()
RETURNS TRIGGER AS $$
BEGIN
  -- Update completed steps count based on responses
  NEW.completed_steps := (
    SELECT count(*)
    FROM jsonb_object_keys(NEW.responses)
  );
  
  -- Calculate progress percentage
  NEW.progress_percentage := 
    CASE 
      WHEN NEW.total_steps > 0 THEN 
        (NEW.completed_steps::float / NEW.total_steps::float) * 100
      ELSE 0 
    END;
  
  -- Update last active timestamp
  NEW.last_active := now();
  
  -- Mark as completed if all steps are done
  IF NEW.completed_steps >= NEW.total_steps THEN
    NEW.completed_at := now();
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to automatically update progress
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger 
    WHERE tgname = 'update_quiz_progress'
  ) THEN
    CREATE TRIGGER update_quiz_progress
      BEFORE UPDATE ON quiz_sessions
      FOR EACH ROW
      EXECUTE FUNCTION calculate_quiz_progress();
  END IF;
END $$;