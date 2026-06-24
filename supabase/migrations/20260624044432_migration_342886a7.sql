-- ============================================
-- SEO CONTENT GENERATION SYSTEM (Corrected Order)
-- ============================================

-- Step 1: Topic Clusters (no dependencies)
CREATE TABLE IF NOT EXISTS seo_topic_clusters (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  cluster_name text NOT NULL UNIQUE,
  pillar_keyword text NOT NULL,
  description text,
  target_audience text,
  content_type text CHECK (content_type IN ('blog', 'resource', 'service_page', 'homepage_block')),
  priority integer DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  internal_links_count integer DEFAULT 0,
  published_articles_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 2: Keywords (references clusters)
CREATE TABLE IF NOT EXISTS seo_keywords (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword text NOT NULL UNIQUE,
  keyword_type text NOT NULL CHECK (keyword_type IN ('primary', 'secondary', 'long_tail', 'semantic')),
  search_volume integer DEFAULT 0,
  competition_level text CHECK (competition_level IN ('low', 'medium', 'high')),
  priority integer DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
  cluster_id uuid REFERENCES seo_topic_clusters(id) ON DELETE SET NULL,
  target_page text,
  current_ranking integer,
  content_status text DEFAULT 'pending' CHECK (content_status IN ('pending', 'drafted', 'published', 'optimized')),
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Step 3: Content Templates (references both keywords and clusters)
CREATE TABLE IF NOT EXISTS seo_content_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  keyword_id uuid REFERENCES seo_keywords(id) ON DELETE CASCADE,
  cluster_id uuid REFERENCES seo_topic_clusters(id) ON DELETE CASCADE,
  template_type text NOT NULL CHECK (template_type IN ('long_form_blog', 'resource_article', 'homepage_block')),
  
  -- SEO Metadata
  seo_title text NOT NULL,
  meta_title text,
  meta_description text,
  url_slug text NOT NULL,
  canonical_url text,
  
  -- Open Graph
  og_title text,
  og_description text,
  og_image_prompt text,
  
  -- Content Structure
  headline text NOT NULL,
  subheadline text,
  introduction text,
  main_sections jsonb DEFAULT '[]',
  faq_questions jsonb DEFAULT '[]',
  cta_section jsonb DEFAULT '{}',
  
  -- Internal Linking
  suggested_internal_links jsonb DEFAULT '[]',
  related_keywords text[],
  
  -- Featured Image
  featured_image_prompt text,
  featured_image_url text,
  
  -- Content Quality
  target_word_count integer DEFAULT 1500,
  estimated_reading_time integer,
  eeat_score integer DEFAULT 0 CHECK (eeat_score >= 0 AND eeat_score <= 100),
  content_quality_notes text,
  
  -- Status
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'ready_for_review', 'published', 'archived')),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE SET NULL,
  
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz
);

-- Step 4: Internal Linking Map
CREATE TABLE IF NOT EXISTS seo_internal_links (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  source_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  target_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  anchor_text text NOT NULL,
  link_strength text DEFAULT 'medium' CHECK (link_strength IN ('weak', 'medium', 'strong')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(source_post_id, target_post_id)
);

-- Step 5: Analytics
CREATE TABLE IF NOT EXISTS seo_content_analytics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  keyword_id uuid REFERENCES seo_keywords(id) ON DELETE SET NULL,
  
  organic_views integer DEFAULT 0,
  avg_time_on_page integer DEFAULT 0,
  bounce_rate decimal(5,2) DEFAULT 0,
  
  google_ranking integer,
  featured_snippet boolean DEFAULT false,
  backlinks_count integer DEFAULT 0,
  
  shares_count integer DEFAULT 0,
  conversions_count integer DEFAULT 0,
  
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- RLS Policies
ALTER TABLE seo_keywords ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_topic_clusters ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_content_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_internal_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE seo_content_analytics ENABLE ROW LEVEL SECURITY;

CREATE POLICY "public_read_keywords" ON seo_keywords FOR SELECT USING (true);
CREATE POLICY "public_read_clusters" ON seo_topic_clusters FOR SELECT USING (true);
CREATE POLICY "public_read_templates" ON seo_content_templates FOR SELECT USING (status = 'published');
CREATE POLICY "admin_all_keywords" ON seo_keywords FOR ALL USING (true);
CREATE POLICY "admin_all_clusters" ON seo_topic_clusters FOR ALL USING (true);
CREATE POLICY "admin_all_templates" ON seo_content_templates FOR ALL USING (true);
CREATE POLICY "admin_all_internal_links" ON seo_internal_links FOR ALL USING (true);
CREATE POLICY "admin_all_analytics" ON seo_content_analytics FOR ALL USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_keywords_cluster ON seo_keywords(cluster_id);
CREATE INDEX IF NOT EXISTS idx_keywords_status ON seo_keywords(content_status);
CREATE INDEX IF NOT EXISTS idx_keywords_priority ON seo_keywords(priority DESC);
CREATE INDEX IF NOT EXISTS idx_templates_keyword ON seo_content_templates(keyword_id);
CREATE INDEX IF NOT EXISTS idx_templates_cluster ON seo_content_templates(cluster_id);
CREATE INDEX IF NOT EXISTS idx_templates_status ON seo_content_templates(status);
CREATE INDEX IF NOT EXISTS idx_internal_links_source ON seo_internal_links(source_post_id);
CREATE INDEX IF NOT EXISTS idx_internal_links_target ON seo_internal_links(target_post_id);
CREATE INDEX IF NOT EXISTS idx_analytics_post ON seo_content_analytics(blog_post_id);

-- Helper Functions
CREATE OR REPLACE FUNCTION generate_seo_slug(title text)
RETURNS text
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN lower(regexp_replace(regexp_replace(title, '[^a-zA-Z0-9\s-]', '', 'g'), '\s+', '-', 'g'));
END;
$$;

CREATE OR REPLACE FUNCTION calculate_reading_time(word_count integer)
RETURNS integer
LANGUAGE plpgsql
AS $$
BEGIN
  RETURN CEIL(word_count::decimal / 200);
END;
$$;

-- Seed Topic Clusters
INSERT INTO seo_topic_clusters (cluster_name, pillar_keyword, description, content_type, priority) VALUES
('Cryptocurrency Recovery', 'crypto recovery', 'Comprehensive guides on recovering stolen cryptocurrency and digital assets', 'blog', 10),
('Blockchain Tracing', 'blockchain tracing', 'Advanced blockchain forensics and transaction tracing techniques', 'blog', 10),
('Fraud Investigation', 'fraud investigation', 'Professional fraud investigation services and methodologies', 'blog', 9),
('Scam Prevention', 'scam prevention', 'Educational content on identifying and preventing various types of scams', 'blog', 9),
('Digital Asset Recovery', 'digital asset recovery', 'Recovery consultation services for stolen digital assets', 'resource', 8),
('Investment Fraud', 'investment scams', 'Investment fraud awareness and investigation resources', 'blog', 8),
('Romance Scams', 'romance scam investigation', 'Romance fraud detection, investigation, and victim support', 'blog', 7),
('Cybersecurity Awareness', 'cybersecurity fraud', 'Cybersecurity best practices and fraud awareness', 'blog', 7)
ON CONFLICT (cluster_name) DO NOTHING;

COMMENT ON TABLE seo_keywords IS 'SEO keyword management with clustering and tracking';
COMMENT ON TABLE seo_topic_clusters IS 'Topic clusters for organizing content authority';
COMMENT ON TABLE seo_content_templates IS 'Auto-generated content templates with SEO metadata';