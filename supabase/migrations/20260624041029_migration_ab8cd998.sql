-- ============================================
-- TASK 20: SEO MANAGEMENT SYSTEM
-- ============================================

-- Table for page-level SEO metadata
CREATE TABLE IF NOT EXISTS page_seo (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text UNIQUE NOT NULL,
  page_title text NOT NULL,
  seo_title text NOT NULL,
  meta_description text NOT NULL,
  keywords text[],
  canonical_url text,
  og_title text,
  og_description text,
  og_image text,
  twitter_card text DEFAULT 'summary_large_image',
  twitter_title text,
  twitter_description text,
  twitter_image text,
  is_indexed boolean DEFAULT true,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- RLS policies for page_seo
ALTER TABLE page_seo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "page_seo_public_read" ON page_seo FOR SELECT USING (true);
CREATE POLICY "page_seo_auth_all" ON page_seo FOR ALL USING (auth.uid() IS NOT NULL);

-- Seed initial SEO data for core pages
INSERT INTO page_seo (page_slug, page_title, seo_title, meta_description, keywords, og_image)
VALUES 
  ('home', 'Home', 'Cipher Trace - Professional Fraud Investigation & Blockchain Intelligence', 'Expert cryptocurrency scam investigation, blockchain tracing, and digital asset recovery consultation. Helping victims fight back against financial fraud worldwide.', ARRAY['crypto recovery', 'blockchain tracing', 'fraud investigation', 'cryptocurrency scam', 'digital asset recovery'], '/og-image.png'),
  ('about', 'About Us', 'About Cipher Trace - Expert Fraud Investigators', 'Learn about our team of professional fraud investigators specializing in cryptocurrency scams, blockchain forensics, and digital asset recovery consultation services.', ARRAY['fraud investigators', 'blockchain experts', 'crypto investigation team'], '/og-image.png'),
  ('services', 'Services', 'Fraud Investigation Services | Cipher Trace', 'Comprehensive fraud investigation services including cryptocurrency scam tracing, blockchain forensics, digital asset recovery consultation, and expert witness testimony.', ARRAY['investigation services', 'crypto tracing', 'fraud consultation'], '/og-image.png'),
  ('case-review', 'Case Review', 'Free Case Review - Cipher Trace', 'Submit your fraud case for professional review by our blockchain investigation team. Confidential, expert analysis of cryptocurrency scams and financial fraud.', ARRAY['case review', 'fraud consultation', 'crypto scam help'], '/og-image.png'),
  ('report-scam', 'Report a Scam', 'Report Fraud - Multi-Step Scam Reporting Form', 'Report cryptocurrency fraud, investment scams, romance scams, and financial fraud. Our professional investigation team will review your case within 24-48 hours.', ARRAY['report scam', 'fraud reporting', 'scam submission'], '/og-image.png'),
  ('contact', 'Contact', 'Contact Cipher Trace - 24/7 Fraud Investigation Support', 'Contact our fraud investigation team for immediate case review, consultation, and support. Available 24/7 to help victims of cryptocurrency scams and financial fraud.', ARRAY['contact investigators', 'fraud support', '24/7 consultation'], '/og-image.png'),
  ('blog', 'Blog', 'Fraud Prevention Blog - Cipher Trace Insights', 'Expert insights on cryptocurrency fraud prevention, blockchain security, scam alerts, and digital asset protection from professional fraud investigators.', ARRAY['fraud prevention blog', 'crypto security', 'scam alerts'], '/og-image.png'),
  ('faq', 'FAQ', 'Frequently Asked Questions - Fraud Investigation FAQs', 'Common questions about cryptocurrency fraud investigation, blockchain tracing, digital asset recovery, and fraud consultation services.', ARRAY['fraud investigation faq', 'crypto recovery questions'], '/og-image.png')
ON CONFLICT (page_slug) DO NOTHING;

-- ============================================
-- TASK 21: BLOG CMS SYSTEM
-- ============================================

-- Blog categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Blog authors table
CREATE TABLE IF NOT EXISTS blog_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text,
  bio text,
  avatar_url text,
  created_at timestamptz DEFAULT now()
);

-- Blog posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  excerpt text,
  content text NOT NULL,
  featured_image text,
  author_id uuid REFERENCES blog_authors(id),
  category_id uuid REFERENCES blog_categories(id),
  seo_title text,
  seo_description text,
  keywords text[],
  status text DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'unpublished')),
  publish_date timestamptz,
  reading_time integer,
  views integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blog tags table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Blog post tags junction table
CREATE TABLE IF NOT EXISTS blog_post_tags (
  post_id uuid REFERENCES blog_posts(id) ON DELETE CASCADE,
  tag_id uuid REFERENCES blog_tags(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, tag_id)
);

-- RLS policies for blog tables
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "blog_categories_public_read" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "blog_categories_auth_all" ON blog_categories FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "blog_authors_public_read" ON blog_authors FOR SELECT USING (true);
CREATE POLICY "blog_authors_auth_all" ON blog_authors FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "blog_posts_public_read" ON blog_posts FOR SELECT USING (status = 'published' OR auth.uid() IS NOT NULL);
CREATE POLICY "blog_posts_auth_all" ON blog_posts FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "blog_tags_public_read" ON blog_tags FOR SELECT USING (true);
CREATE POLICY "blog_tags_auth_all" ON blog_tags FOR ALL USING (auth.uid() IS NOT NULL);

CREATE POLICY "blog_post_tags_public_read" ON blog_post_tags FOR SELECT USING (true);
CREATE POLICY "blog_post_tags_auth_all" ON blog_post_tags FOR ALL USING (auth.uid() IS NOT NULL);

-- Seed blog categories
INSERT INTO blog_categories (name, slug, description, display_order)
VALUES 
  ('Crypto Recovery', 'crypto-recovery', 'Cryptocurrency recovery strategies and case studies', 1),
  ('Fraud Prevention', 'fraud-prevention', 'Tips and guidance for preventing fraud and scams', 2),
  ('Scam Alerts', 'scam-alerts', 'Latest scam warnings and fraud alerts', 3),
  ('Blockchain Intelligence', 'blockchain-intelligence', 'Blockchain forensics and investigation techniques', 4),
  ('Cybersecurity', 'cybersecurity', 'Digital security and online safety', 5),
  ('Consumer Protection', 'consumer-protection', 'Legal rights and consumer protection resources', 6),
  ('Investigation Reports', 'investigation-reports', 'Professional investigation case reports', 7)
ON CONFLICT (slug) DO NOTHING;

-- Seed default blog author
INSERT INTO blog_authors (name, email, bio)
VALUES 
  ('Cipher Trace Team', 'support@cipherstraces.com', 'Professional fraud investigators specializing in cryptocurrency scams and blockchain forensics.')
ON CONFLICT DO NOTHING;

-- ============================================
-- TASK 22: CONTENT MANAGEMENT SYSTEM
-- ============================================

-- Editable website content sections
CREATE TABLE IF NOT EXISTS editable_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  page_slug text NOT NULL,
  section_key text NOT NULL,
  section_type text NOT NULL CHECK (section_type IN ('text', 'heading', 'paragraph', 'button', 'list', 'json')),
  content text NOT NULL,
  metadata jsonb,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now(),
  UNIQUE(page_slug, section_key)
);

-- RLS policies for editable_content
ALTER TABLE editable_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "editable_content_public_read" ON editable_content FOR SELECT USING (is_active = true);
CREATE POLICY "editable_content_auth_all" ON editable_content FOR ALL USING (auth.uid() IS NOT NULL);

-- Seed some editable content for homepage
INSERT INTO editable_content (page_slug, section_key, section_type, content, metadata)
VALUES 
  ('home', 'hero_headline', 'heading', 'Helping Victims Fight Back Against Financial Fraud', '{"max_length": 100, "required": true}'::jsonb),
  ('home', 'hero_subheadline', 'paragraph', 'Professional blockchain tracing, scam investigations, fraud intelligence, and recovery consultation services.', '{"max_length": 300, "required": true}'::jsonb),
  ('home', 'hero_cta_primary', 'button', 'Start Free Case Review', '{"link": "/case-review", "required": true}'::jsonb),
  ('home', 'hero_cta_secondary', 'button', 'Speak With An Expert', '{"link": "/contact", "required": true}'::jsonb),
  ('home', 'about_heading', 'heading', 'Professional Fraud Investigation & Blockchain Intelligence', '{"max_length": 150}'::jsonb),
  ('home', 'about_description', 'paragraph', 'Cipher Trace provides comprehensive fraud investigation, blockchain tracing, and digital asset recovery consultation services. Our team of experienced investigators helps victims of cryptocurrency scams, investment fraud, romance scams, and financial crimes recover evidence and work with law enforcement.', '{"max_length": 500}'::jsonb),
  ('contact', 'email', 'text', 'Support@cipherstraces.com', '{"format": "email", "required": true}'::jsonb),
  ('contact', 'phone', 'text', '+1 (646) 244-0064', '{"format": "phone", "required": true}'::jsonb),
  ('contact', 'whatsapp', 'text', '+1 (646) 244-0064', '{"format": "phone", "required": true}'::jsonb)
ON CONFLICT (page_slug, section_key) DO NOTHING;

-- Comments
COMMENT ON TABLE page_seo IS 'SEO metadata for all website pages - editable from admin dashboard';
COMMENT ON TABLE blog_posts IS 'Blog CMS system with full content management capabilities';
COMMENT ON TABLE editable_content IS 'Editable website sections and content blocks';