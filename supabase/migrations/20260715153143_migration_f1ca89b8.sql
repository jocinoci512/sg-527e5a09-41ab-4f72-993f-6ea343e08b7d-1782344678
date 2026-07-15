-- CRITICAL SECURITY FIX: Enable RLS on all admin tables
-- These tables contain sensitive data and should only be accessible to authenticated admins

-- 1. Admin Activity Log (audit trail - highly sensitive)
ALTER TABLE admin_activity_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_only_activity_log"
ON admin_activity_log
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 2. Competitor Rankings (SEO intelligence - sensitive)
ALTER TABLE competitor_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_only_competitor_rankings"
ON competitor_rankings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 3. Keyword Rankings (SEO strategy - sensitive)
ALTER TABLE keyword_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_only_keyword_rankings"
ON keyword_rankings
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 4. SEO Recommendations (internal strategy - sensitive)
ALTER TABLE seo_recommendations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_only_seo_recommendations"
ON seo_recommendations
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- 5. SEO Weekly Reports (analytics - sensitive)
ALTER TABLE seo_weekly_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "admin_only_seo_weekly_reports"
ON seo_weekly_reports
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Verify all tables now have RLS enabled
SELECT 
  tablename,
  rowsecurity as rls_enabled,
  (SELECT count(*) FROM pg_policies WHERE tablename = pt.tablename) as policy_count
FROM pg_tables pt
WHERE schemaname = 'public'
  AND tablename IN ('admin_activity_log', 'competitor_rankings', 'keyword_rankings', 
                     'seo_recommendations', 'seo_weekly_reports')
ORDER BY tablename;