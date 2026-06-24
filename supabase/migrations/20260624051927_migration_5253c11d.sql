-- ============================================
-- SEO COMMAND CENTER - ANALYTICS & AUTOMATION
-- ============================================

-- Keyword Rankings Tracking
CREATE TABLE IF NOT EXISTS keyword_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id UUID REFERENCES seo_keywords(id) ON DELETE CASCADE,
  ranking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  ranking_position INTEGER,
  previous_position INTEGER,
  position_change INTEGER,
  search_volume INTEGER DEFAULT 0,
  keyword_difficulty INTEGER CHECK (keyword_difficulty >= 0 AND keyword_difficulty <= 100),
  difficulty_level TEXT CHECK (difficulty_level IN ('easy', 'medium', 'hard', 'very_competitive')),
  seo_opportunity_score INTEGER CHECK (seo_opportunity_score >= 0 AND seo_opportunity_score <= 100),
  organic_click_estimate INTEGER DEFAULT 0,
  click_through_rate DECIMAL(5,2),
  ranking_url TEXT,
  page_title TEXT,
  meta_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_keyword_rankings_keyword ON keyword_rankings(keyword_id);
CREATE INDEX idx_keyword_rankings_date ON keyword_rankings(ranking_date);
CREATE INDEX idx_keyword_rankings_position ON keyword_rankings(ranking_position);

-- Competitor Rankings
CREATE TABLE IF NOT EXISTS competitor_rankings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id UUID REFERENCES seo_keywords(id) ON DELETE CASCADE,
  ranking_date DATE NOT NULL DEFAULT CURRENT_DATE,
  competitor_domain TEXT NOT NULL,
  competitor_position INTEGER NOT NULL,
  competitor_url TEXT,
  competitor_page_title TEXT,
  estimated_domain_authority INTEGER CHECK (estimated_domain_authority >= 0 AND estimated_domain_authority <= 100),
  estimated_traffic_value INTEGER DEFAULT 0,
  content_score INTEGER CHECK (content_score >= 0 AND content_score <= 100),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_competitor_rankings_keyword ON competitor_rankings(keyword_id);
CREATE INDEX idx_competitor_rankings_date ON competitor_rankings(ranking_date);
CREATE INDEX idx_competitor_rankings_position ON competitor_rankings(competitor_position);

-- SEO Recommendations
CREATE TABLE IF NOT EXISTS seo_recommendations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  recommendation_type TEXT CHECK (recommendation_type IN ('keyword_target', 'content_gap', 'competitor_weakness', 'internal_linking', 'page_optimization', 'content_refresh')),
  priority TEXT CHECK (priority IN ('low', 'medium', 'high', 'urgent')) DEFAULT 'medium',
  title TEXT NOT NULL,
  description TEXT,
  action_items JSONB,
  related_keyword_id UUID REFERENCES seo_keywords(id),
  related_url TEXT,
  impact_score INTEGER CHECK (impact_score >= 0 AND impact_score <= 100),
  effort_score INTEGER CHECK (effort_score >= 0 AND effort_score <= 100),
  status TEXT CHECK (status IN ('pending', 'in_progress', 'completed', 'dismissed')) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seo_recommendations_type ON seo_recommendations(recommendation_type);
CREATE INDEX idx_seo_recommendations_status ON seo_recommendations(status);
CREATE INDEX idx_seo_recommendations_priority ON seo_recommendations(priority);

-- Weekly SEO Reports
CREATE TABLE IF NOT EXISTS seo_weekly_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  report_date DATE NOT NULL DEFAULT CURRENT_DATE,
  week_start_date DATE NOT NULL,
  week_end_date DATE NOT NULL,
  total_organic_traffic INTEGER DEFAULT 0,
  weekly_traffic_growth DECIMAL(5,2),
  monthly_traffic_growth DECIMAL(5,2),
  keywords_gained INTEGER DEFAULT 0,
  keywords_lost INTEGER DEFAULT 0,
  top_ranking_keywords JSONB,
  top_landing_pages JSONB,
  competitor_movements JSONB,
  best_performing_articles JSONB,
  recommendations JSONB,
  email_sent BOOLEAN DEFAULT FALSE,
  email_sent_at TIMESTAMP WITH TIME ZONE,
  pdf_report_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_seo_weekly_reports_date ON seo_weekly_reports(report_date);
CREATE INDEX idx_seo_weekly_reports_email_sent ON seo_weekly_reports(email_sent);

-- Publishing State Tracking (extend blog_posts with new states)
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'review_status'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN review_status TEXT CHECK (review_status IN ('draft', 'review', 'scheduled', 'published', 'archived')) DEFAULT 'draft';
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'scheduled_publish_at'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN scheduled_publish_at TIMESTAMP WITH TIME ZONE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'blog_posts' AND column_name = 'validation_errors'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN validation_errors JSONB;
  END IF;
END $$;

-- Admin Activity Log
CREATE TABLE IF NOT EXISTS admin_activity_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email TEXT NOT NULL,
  action_type TEXT NOT NULL,
  action_description TEXT,
  entity_type TEXT,
  entity_id TEXT,
  metadata JSONB,
  ip_address TEXT,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_admin_activity_log_admin ON admin_activity_log(admin_email);
CREATE INDEX idx_admin_activity_log_type ON admin_activity_log(action_type);
CREATE INDEX idx_admin_activity_log_date ON admin_activity_log(created_at);

-- Comments
COMMENT ON TABLE keyword_rankings IS 'Keyword ranking position tracking with difficulty and opportunity scores';
COMMENT ON TABLE competitor_rankings IS 'Competitor ranking tracking per keyword';
COMMENT ON TABLE seo_recommendations IS 'AI-generated SEO optimization recommendations';
COMMENT ON TABLE seo_weekly_reports IS 'Automated weekly SEO performance summaries';
COMMENT ON TABLE admin_activity_log IS 'Audit trail for all admin actions';