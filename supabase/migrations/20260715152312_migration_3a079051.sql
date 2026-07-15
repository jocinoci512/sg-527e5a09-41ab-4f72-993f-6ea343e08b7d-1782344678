-- FIX: Allow public/anon inserts into email_notifications_log
-- This is safe because it's just logging outgoing emails

-- First, verify RLS is enabled
ALTER TABLE email_notifications_log ENABLE ROW LEVEL SECURITY;

-- Drop any existing restrictive INSERT policies
DROP POLICY IF EXISTS "authenticated_can_insert_notifications" ON email_notifications_log;
DROP POLICY IF EXISTS "Authenticated users can insert email notifications" ON email_notifications_log;

-- Create policy to allow public INSERT (for logging email sends)
CREATE POLICY "allow_public_insert_email_logs"
ON email_notifications_log
FOR INSERT
TO public
WITH CHECK (true);

-- Only authenticated users (admins) can view email logs
DROP POLICY IF EXISTS "authenticated_can_view_notifications" ON email_notifications_log;
CREATE POLICY "authenticated_can_view_email_logs"
ON email_notifications_log
FOR SELECT
TO authenticated
USING (true);

-- Verify policies were created
SELECT 
  policyname,
  cmd,
  roles,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'email_notifications_log'
ORDER BY cmd, policyname;