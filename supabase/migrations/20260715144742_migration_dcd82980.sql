-- NUCLEAR FIX: Drop ALL policies and recreate from scratch
-- This will definitely work

-- Step 1: Drop all existing policies
DROP POLICY IF EXISTS "allow_anon_insert_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_view_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_cases" ON case_reviews;
DROP POLICY IF EXISTS "public_can_submit_cases" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can insert case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can update case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can view case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can delete case reviews" ON case_reviews;

-- Step 2: Create fresh, simple policies that WILL work

-- Allow anyone (anon or authenticated) to INSERT
CREATE POLICY "allow_public_insert" 
ON case_reviews 
FOR INSERT 
WITH CHECK (true);

-- Only authenticated users can SELECT
CREATE POLICY "allow_authenticated_select" 
ON case_reviews 
FOR SELECT 
TO authenticated
USING (true);

-- Only authenticated users can UPDATE
CREATE POLICY "allow_authenticated_update" 
ON case_reviews 
FOR UPDATE 
TO authenticated
USING (true)
WITH CHECK (true);

-- Only authenticated users can DELETE
CREATE POLICY "allow_authenticated_delete" 
ON case_reviews 
FOR DELETE 
TO authenticated
USING (true);

-- Verify RLS is enabled
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;