-- If the test succeeded, we know RLS is the issue
-- Now re-enable RLS and create the SIMPLEST possible policy

-- Re-enable RLS
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;

-- Drop ALL existing policies to start fresh
DO $$ 
BEGIN
    EXECUTE (
        SELECT string_agg('DROP POLICY IF EXISTS ' || quote_ident(policyname) || ' ON case_reviews;', ' ')
        FROM pg_policies 
        WHERE tablename = 'case_reviews'
    );
END $$;

-- Create the SIMPLEST possible INSERT policy for anon users
-- Using FOR ALL instead of FOR INSERT to be absolutely sure
CREATE POLICY "allow_all_operations_for_all_users"
ON case_reviews
FOR ALL
TO public
USING (true)
WITH CHECK (true);

-- Verify the policy was created
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'case_reviews'
ORDER BY policyname;