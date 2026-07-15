-- COMPLETE CLEANUP: Drop ALL policies and start fresh with clean slate
-- This removes all the duplicate conflicting policies

-- Drop all existing policies (there are many duplicates causing conflicts)
DROP POLICY IF EXISTS "allow_all_inserts" ON case_reviews;
DROP POLICY IF EXISTS "allow_auth_delete_cases" ON case_reviews;
DROP POLICY IF EXISTS "allow_auth_select_cases" ON case_reviews;
DROP POLICY IF EXISTS "allow_auth_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_delete" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_select" ON case_reviews;
DROP POLICY IF EXISTS "allow_authenticated_update" ON case_reviews;
DROP POLICY IF EXISTS "allow_public_insert" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_delete" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_select" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_update" ON case_reviews;
DROP POLICY IF EXISTS "enable_all_for_authenticated" ON case_reviews;
DROP POLICY IF EXISTS "enable_insert_for_all" ON case_reviews;
DROP POLICY IF EXISTS "public_can_submit_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_view_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_cases" ON case_reviews;
DROP POLICY IF EXISTS "allow_anon_insert_cases" ON case_reviews;

-- Now create CLEAN policies with no duplicates
-- Policy 1: Allow anyone (anon, authenticated, public) to INSERT cases
CREATE POLICY "allow_case_submission"
ON case_reviews
FOR INSERT
TO public
WITH CHECK (true);

-- Policy 2: Allow authenticated users to SELECT (view) all cases
CREATE POLICY "allow_admin_select"
ON case_reviews
FOR SELECT
TO authenticated
USING (true);

-- Policy 3: Allow authenticated users to UPDATE cases
CREATE POLICY "allow_admin_update"
ON case_reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Allow authenticated users to DELETE cases
CREATE POLICY "allow_admin_delete"
ON case_reviews
FOR DELETE
TO authenticated
USING (true);

-- Ensure RLS is enabled
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;

-- Verify the new clean policies
SELECT 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'case_reviews'
ORDER BY cmd, policyname;