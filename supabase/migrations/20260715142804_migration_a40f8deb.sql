-- First, disable RLS temporarily to see current policies
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public' AND tablename = 'case_reviews';

-- Drop ALL existing policies on case_reviews
DROP POLICY IF EXISTS "public_can_submit_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_view_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_cases" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can insert case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can update case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can view case reviews" ON case_reviews;

-- Create simple, working policies
-- Policy 1: Allow ANYONE (anon + authenticated) to INSERT case reviews
CREATE POLICY "allow_anon_insert_cases" 
ON case_reviews 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Policy 2: Allow ONLY authenticated users to SELECT (view) cases
CREATE POLICY "allow_auth_select_cases" 
ON case_reviews 
FOR SELECT 
TO authenticated
USING (true);

-- Policy 3: Allow ONLY authenticated users to UPDATE cases
CREATE POLICY "allow_auth_update_cases" 
ON case_reviews 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy 4: Allow ONLY authenticated users to DELETE cases
CREATE POLICY "allow_auth_delete_cases" 
ON case_reviews 
FOR DELETE 
TO authenticated
USING (true);

-- Verify RLS is enabled
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;

-- Show final policies
SELECT tablename, policyname, permissive, roles, cmd 
FROM pg_policies 
WHERE schemaname = 'public' AND tablename = 'case_reviews';