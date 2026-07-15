-- Drop existing restrictive policies
DROP POLICY IF EXISTS "Authenticated users can insert case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can update case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can view case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Authenticated users can select their own case reviews" ON case_reviews;
DROP POLICY IF EXISTS "Users can insert their own case reviews" ON case_reviews;

-- Allow PUBLIC/ANONYMOUS to submit cases (INSERT)
CREATE POLICY "public_can_submit_cases" 
ON case_reviews 
FOR INSERT 
TO public
WITH CHECK (true);

-- Allow AUTHENTICATED users (admin) to view all cases
CREATE POLICY "authenticated_can_view_cases" 
ON case_reviews 
FOR SELECT 
TO authenticated
USING (true);

-- Allow AUTHENTICATED users (admin) to update cases
CREATE POLICY "authenticated_can_update_cases" 
ON case_reviews 
FOR UPDATE 
TO authenticated
USING (true);

-- Allow AUTHENTICATED users (admin) to delete cases
CREATE POLICY "authenticated_can_delete_cases" 
ON case_reviews 
FOR DELETE 
TO authenticated
USING (true);