-- Homepage Statistics table
CREATE TABLE IF NOT EXISTS homepage_statistics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value integer NOT NULL,
  suffix text DEFAULT '',
  prefix text DEFAULT '',
  color text NOT NULL DEFAULT 'text-blue-600',
  icon_name text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Live Updates table
CREATE TABLE IF NOT EXISTS homepage_live_updates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL,
  message text NOT NULL,
  location text NOT NULL,
  time_ago text NOT NULL,
  icon_name text NOT NULL,
  color text NOT NULL DEFAULT 'text-blue-600',
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Global Regions table
CREATE TABLE IF NOT EXISTS homepage_global_regions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL,
  countries text NOT NULL,
  investigations text NOT NULL,
  support text NOT NULL DEFAULT '24/7 Available',
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Fraud Categories table
CREATE TABLE IF NOT EXISTS homepage_fraud_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category text NOT NULL,
  cases integer NOT NULL,
  success_rate integer NOT NULL,
  trend text NOT NULL,
  color text NOT NULL DEFAULT 'text-blue-600',
  bg_color text NOT NULL DEFAULT 'bg-blue-100 dark:bg-blue-900/20',
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Success Stories table
CREATE TABLE IF NOT EXISTS homepage_success_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  fraud_type text NOT NULL,
  country text NOT NULL,
  amount text NOT NULL,
  timeline text NOT NULL,
  description text NOT NULL,
  outcome text NOT NULL,
  outcome_type text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Testimonials table
CREATE TABLE IF NOT EXISTS homepage_testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  role text NOT NULL,
  location text NOT NULL,
  amount text NOT NULL,
  text text NOT NULL,
  rating integer NOT NULL DEFAULT 5,
  fraud_type text NOT NULL,
  outcome text NOT NULL,
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Homepage Dashboard Metrics table
CREATE TABLE IF NOT EXISTS homepage_dashboard_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  label text NOT NULL,
  value integer NOT NULL,
  change text NOT NULL,
  icon_name text NOT NULL,
  color text NOT NULL DEFAULT 'text-blue-600',
  display_order integer NOT NULL DEFAULT 0,
  is_enabled boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE homepage_statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_live_updates ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_global_regions ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_fraud_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_success_stories ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE homepage_dashboard_metrics ENABLE ROW LEVEL SECURITY;

-- RLS Policies (admin-only access for all tables)
CREATE POLICY "Authenticated users can view homepage_statistics"
  ON homepage_statistics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_statistics"
  ON homepage_statistics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_live_updates"
  ON homepage_live_updates FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_live_updates"
  ON homepage_live_updates FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_global_regions"
  ON homepage_global_regions FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_global_regions"
  ON homepage_global_regions FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_fraud_categories"
  ON homepage_fraud_categories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_fraud_categories"
  ON homepage_fraud_categories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_success_stories"
  ON homepage_success_stories FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_success_stories"
  ON homepage_success_stories FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_testimonials"
  ON homepage_testimonials FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_testimonials"
  ON homepage_testimonials FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view homepage_dashboard_metrics"
  ON homepage_dashboard_metrics FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can manage homepage_dashboard_metrics"
  ON homepage_dashboard_metrics FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create indexes for performance
CREATE INDEX idx_homepage_statistics_order ON homepage_statistics(display_order);
CREATE INDEX idx_homepage_live_updates_order ON homepage_live_updates(display_order);
CREATE INDEX idx_homepage_global_regions_order ON homepage_global_regions(display_order);
CREATE INDEX idx_homepage_fraud_categories_order ON homepage_fraud_categories(display_order);
CREATE INDEX idx_homepage_success_stories_order ON homepage_success_stories(display_order);
CREATE INDEX idx_homepage_testimonials_order ON homepage_testimonials(display_order);
CREATE INDEX idx_homepage_dashboard_metrics_order ON homepage_dashboard_metrics(display_order);

-- Insert default data from current homepage
INSERT INTO homepage_statistics (label, value, suffix, prefix, color, icon_name, display_order) VALUES
  ('Cases Reviewed', 2847, '+', '', 'text-blue-600', 'FileText', 1),
  ('Countries Served', 127, '', '', 'text-green-600', 'Globe', 2),
  ('Active Investigations', 456, '+', '', 'text-orange-600', 'TrendingUp', 3),
  ('Client Satisfaction', 98, '%', '', 'text-purple-600', 'Award', 4),
  ('Blockchain Transactions Traced', 12500, '+', '', 'text-indigo-600', 'BarChart3', 5),
  ('Victims Assisted', 3200, '+', '', 'text-pink-600', 'Users', 6),
  ('Funds Identified', 85, 'M+', '$', 'text-emerald-600', 'DollarSign', 7),
  ('Investigation Success Rate', 94, '%', '', 'text-cyan-600', 'Target', 8);

INSERT INTO homepage_live_updates (type, message, location, time_ago, icon_name, color, display_order) VALUES
  ('investigation', 'New cryptocurrency fraud investigation opened', 'United States', '2 minutes ago', 'FileText', 'text-blue-600', 1),
  ('tracing', 'Blockchain tracing completed for $420K case', 'United Kingdom', '15 minutes ago', 'Search', 'text-green-600', 2),
  ('completed', 'Investment fraud investigation completed', 'Australia', '1 hour ago', 'CheckCircle', 'text-emerald-600', 3),
  ('network', 'International scam network identified', 'Multiple Countries', '3 hours ago', 'Globe', 'text-purple-600', 4),
  ('consultation', 'Recovery consultation scheduled', 'Canada', '4 hours ago', 'Clock', 'text-orange-600', 5);

INSERT INTO homepage_global_regions (region, countries, investigations, support, display_order) VALUES
  ('North America', 'USA, Canada, Mexico', '1,240+', '24/7 Available', 1),
  ('Europe', 'UK, Germany, France, Spain', '850+', '24/7 Available', 2),
  ('Asia-Pacific', 'Australia, Singapore, Japan, India', '620+', '24/7 Available', 3),
  ('Latin America', 'Brazil, Argentina, Chile', '180+', '24/7 Available', 4),
  ('Middle East', 'UAE, Saudi Arabia, Israel', '145+', '24/7 Available', 5),
  ('Africa', 'South Africa, Nigeria, Kenya', '95+', '24/7 Available', 6);

INSERT INTO homepage_fraud_categories (category, cases, success_rate, trend, color, bg_color, display_order) VALUES
  ('Cryptocurrency Fraud', 847, 92, '+15%', 'text-orange-600', 'bg-orange-100 dark:bg-orange-900/20', 1),
  ('Investment Fraud', 623, 89, '+22%', 'text-blue-600', 'bg-blue-100 dark:bg-blue-900/20', 2),
  ('Romance Scams', 456, 87, '+18%', 'text-pink-600', 'bg-pink-100 dark:bg-pink-900/20', 3),
  ('Forex Scams', 389, 91, '+12%', 'text-green-600', 'bg-green-100 dark:bg-green-900/20', 4),
  ('NFT Scams', 234, 85, '+28%', 'text-indigo-600', 'bg-indigo-100 dark:bg-indigo-900/20', 5),
  ('Wire Fraud', 298, 88, '+9%', 'text-purple-600', 'bg-purple-100 dark:bg-purple-900/20', 6);

INSERT INTO homepage_dashboard_metrics (label, value, change, icon_name, color, display_order) VALUES
  ('Active Cases', 456, '+12%', 'FileText', 'text-blue-600', 1),
  ('Investigations Completed', 2847, '+8%', 'CheckCircle', 'text-green-600', 2),
  ('Victims Assisted', 3200, '+15%', 'Users', 'text-purple-600', 3),
  ('Countries Supported', 127, '+3', 'Globe', 'text-orange-600', 4),
  ('Blockchain Transactions Analyzed', 12500, '+22%', 'Search', 'text-indigo-600', 5),
  ('Scam Networks Identified', 89, '+18%', 'Target', 'text-pink-600', 6);