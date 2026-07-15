-- Fix the DEFAULT value mismatch
-- Change status DEFAULT from 'pending' to 'submitted' to match CHECK constraint

ALTER TABLE case_reviews 
ALTER COLUMN status SET DEFAULT 'submitted';

-- Verify the fix
SELECT 
  column_name,
  column_default,
  is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
AND table_name = 'case_reviews'
AND column_name = 'status';