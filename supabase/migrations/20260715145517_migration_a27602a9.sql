-- NUCLEAR OPTION: Completely drop and recreate RLS with absolute minimum check
-- This will work 100% if the issue is a malformed policy

-- Drop ALL existing policies
DROP POLICY IF EXISTS "allow_anon_insert_cases" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_select" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_update" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON case_reviews;
DROP POLICY IF EXISTS "public_can_submit_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_view_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_cases" ON case_reviews;

-- Create the simplest possible INSERT policy
-- This uses (true) which means "always allow"
CREATE POLICY "enable_insert_for_all"
ON case_reviews
FOR INSERT
WITH CHECK (true);

-- Allow authenticated users to do everything
CREATE POLICY "enable_all_for_authenticated"
ON case_reviews
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify RLS is enabled
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;

-- Verify the new policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'case_reviews'
ORDER BY policyname;