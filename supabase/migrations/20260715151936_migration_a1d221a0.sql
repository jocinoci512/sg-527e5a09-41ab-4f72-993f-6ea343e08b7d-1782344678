-- FIX: Make assigned_to column NULLABLE so anonymous users can submit cases
-- The column will be NULL initially, then admins can assign cases to investigators

ALTER TABLE case_reviews 
ALTER COLUMN assigned_to DROP NOT NULL;

-- Verify the change
SELECT 
  column_name,
  is_nullable,
  column_default
FROM information_schema.columns
WHERE table_schema = 'public'
  AND table_name = 'case_reviews'
  AND column_name = 'assigned_to';