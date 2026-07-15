-- DEFINITIVE FIX ATTEMPT
-- This will completely reset RLS on case_reviews with the correct permissions

-- Step 1: Disable RLS temporarily
ALTER TABLE case_reviews DISABLE ROW LEVEL SECURITY;

-- Step 2: Drop ALL existing policies
DROP POLICY IF EXISTS "allow_anon_insert_cases" ON case_reviews;
DROP POLICY IF EXISTS "public_can_submit_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_view_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_update_cases" ON case_reviews;
DROP POLICY IF EXISTS "authenticated_can_delete_cases" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can insert case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can update case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can view case reviews" ON case_reviews;

-- Step 3: Grant INSERT permission to anon role explicitly
GRANT INSERT ON case_reviews TO anon;
GRANT SELECT, UPDATE, DELETE ON case_reviews TO authenticated;

-- Step 4: Re-enable RLS
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;

-- Step 5: Create simple, permissive INSERT policy for ALL users (anon + authenticated)
CREATE POLICY "allow_all_inserts"
ON case_reviews
FOR INSERT
TO public
WITH CHECK (true);

-- Step 6: Create SELECT policy for authenticated users only
CREATE POLICY "authenticated_select"
ON case_reviews
FOR SELECT
TO authenticated
USING (true);

-- Step 7: Create UPDATE policy for authenticated users only
CREATE POLICY "authenticated_update"
ON case_reviews
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Step 8: Create DELETE policy for authenticated users only
CREATE POLICY "authenticated_delete"
ON case_reviews
FOR DELETE
TO authenticated
USING (true);

-- Verify the new setup
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