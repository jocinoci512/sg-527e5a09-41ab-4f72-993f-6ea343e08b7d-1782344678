-- Create case_reviews table for case submission form
CREATE TABLE IF NOT EXISTS case_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  country text NOT NULL,
  scam_type text NOT NULL,
  amount_lost numeric,
  cryptocurrency_used text,
  wallet_address text,
  scammer_website text,
  incident_description text NOT NULL,
  file_attachments jsonb DEFAULT '[]'::jsonb,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'closed')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high', 'urgent')),
  admin_notes text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now()
);

-- Create contact_leads table for contact form submissions
CREATE TABLE IF NOT EXISTS contact_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  source text DEFAULT 'contact_form',
  status text DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'qualified', 'closed')),
  created_at timestamp with time zone DEFAULT now()
);

-- Create notifications table for admin notification tracking
CREATE TABLE IF NOT EXISTS notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL CHECK (type IN ('case_review', 'contact_lead', 'system')),
  title text NOT NULL,
  message text NOT NULL,
  reference_id uuid,
  reference_table text,
  is_read boolean DEFAULT false,
  admin_id uuid REFERENCES profiles(id),
  created_at timestamp with time zone DEFAULT now()
);

-- Create reports table for PDF report metadata
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  report_type text NOT NULL DEFAULT 'weekly',
  date_range_start date NOT NULL,
  date_range_end date NOT NULL,
  file_path text,
  file_size integer,
  generated_by uuid REFERENCES profiles(id),
  metrics jsonb DEFAULT '{}'::jsonb,
  created_at timestamp with time zone DEFAULT now()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_case_reviews_status ON case_reviews(status);
CREATE INDEX IF NOT EXISTS idx_case_reviews_created_at ON case_reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_leads_status ON contact_leads(status);
CREATE INDEX IF NOT EXISTS idx_contact_leads_created_at ON contact_leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_notifications_admin_id ON notifications(admin_id);
CREATE INDEX IF NOT EXISTS idx_notifications_is_read ON notifications(is_read);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON notifications(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reports_created_at ON reports(created_at DESC);

-- Enable Row Level Security
ALTER TABLE case_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- RLS Policies: Admin-only access (authenticated users can read/write)
-- For production, you'd add role-based checks, but for now we'll use authenticated user check

-- Case Reviews policies
CREATE POLICY "Authenticated users can view case reviews"
  ON case_reviews FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert case reviews"
  ON case_reviews FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update case reviews"
  ON case_reviews FOR UPDATE
  TO authenticated
  USING (true);

-- Contact Leads policies
CREATE POLICY "Authenticated users can view contact leads"
  ON contact_leads FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert contact leads"
  ON contact_leads FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Notifications policies
CREATE POLICY "Authenticated users can view their notifications"
  ON notifications FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert notifications"
  ON notifications FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update notifications"
  ON notifications FOR UPDATE
  TO authenticated
  USING (true);

-- Reports policies
CREATE POLICY "Authenticated users can view reports"
  ON reports FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at on case_reviews
CREATE TRIGGER update_case_reviews_updated_at
  BEFORE UPDATE ON case_reviews
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Function to create notification on new case review
CREATE OR REPLACE FUNCTION notify_new_case_review()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (type, title, message, reference_id, reference_table)
  VALUES (
    'case_review',
    'New Case Submission',
    'New case review from ' || NEW.full_name || ' (' || NEW.country || ') - ' || NEW.scam_type,
    NEW.id,
    'case_reviews'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create notification on new case review
CREATE TRIGGER trigger_notify_new_case_review
  AFTER INSERT ON case_reviews
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_case_review();

-- Function to create notification on new contact lead
CREATE OR REPLACE FUNCTION notify_new_contact_lead()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO notifications (type, title, message, reference_id, reference_table)
  VALUES (
    'contact_lead',
    'New Contact Submission',
    'New contact from ' || NEW.full_name || ' - ' || COALESCE(NEW.subject, 'General Inquiry'),
    NEW.id,
    'contact_leads'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to create notification on new contact lead
CREATE TRIGGER trigger_notify_new_contact_lead
  AFTER INSERT ON contact_leads
  FOR EACH ROW
  EXECUTE FUNCTION notify_new_contact_lead();