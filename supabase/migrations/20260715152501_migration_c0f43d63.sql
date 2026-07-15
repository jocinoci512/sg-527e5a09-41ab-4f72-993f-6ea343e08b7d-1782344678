-- FINAL FIX: Allow public INSERT into notifications table for case-related notifications
-- This is safe because we'll add a check to only allow specific notification types

-- Drop existing restrictive policy
DROP POLICY IF EXISTS "Authenticated users can insert notifications" ON notifications;

-- Create new policy allowing public to insert case-related notifications
CREATE POLICY "allow_public_insert_case_notifications"
ON notifications
FOR INSERT
TO public
WITH CHECK (
  type IN ('case_review', 'contact_lead')
);

-- Keep authenticated-only policies for viewing and updating
DROP POLICY IF EXISTS "Authenticated users can view their notifications" ON notifications;
CREATE POLICY "authenticated_view_notifications"
ON notifications
FOR SELECT
TO authenticated
USING (true);

DROP POLICY IF EXISTS "Authenticated users can update notifications" ON notifications;
CREATE POLICY "authenticated_update_notifications"
ON notifications
FOR UPDATE
TO authenticated
USING (true);

-- Verify policies
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'notifications'
ORDER BY cmd, policyname;