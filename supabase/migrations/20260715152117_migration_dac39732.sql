-- DIAGNOSTIC STEP 1: Temporarily disable RLS to test if inserts work without it
-- This will tell us if RLS is the real issue or if something else is blocking inserts

-- First, check current RLS status
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'case_reviews';

-- Disable RLS temporarily
ALTER TABLE case_reviews DISABLE ROW LEVEL SECURITY;

-- Verify it's disabled
SELECT 
  schemaname,
  tablename,
  rowsecurity AS rls_enabled
FROM pg_tables
WHERE schemaname = 'public'
AND tablename = 'case_reviews';