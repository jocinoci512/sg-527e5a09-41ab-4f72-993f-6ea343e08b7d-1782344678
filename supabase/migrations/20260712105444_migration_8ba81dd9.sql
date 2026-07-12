-- ============================================
-- VIDEO LIBRARY & EMAIL NOTIFICATIONS
-- Fixed to use correct table name: case_reviews
-- ============================================

-- Video Library Table
CREATE TABLE IF NOT EXISTS video_library (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vimeo_video_id TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  embed_url TEXT NOT NULL,
  duration INTEGER,
  views INTEGER DEFAULT 0,
  category TEXT,
  tags TEXT[],
  upload_date TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Email Notifications Log Table
CREATE TABLE IF NOT EXISTS email_notifications_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  notification_type TEXT NOT NULL,
  recipient_email TEXT NOT NULL,
  subject TEXT NOT NULL,
  template_name TEXT,
  case_id UUID REFERENCES case_reviews(id),
  lead_id UUID REFERENCES contact_leads(id),
  sent_at TIMESTAMPTZ DEFAULT now(),
  status TEXT DEFAULT 'sent',
  error_message TEXT,
  metadata JSONB,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_video_library_vimeo_id ON video_library(vimeo_video_id);
CREATE INDEX IF NOT EXISTS idx_video_library_category ON video_library(category);
CREATE INDEX IF NOT EXISTS idx_video_library_status ON video_library(status);
CREATE INDEX IF NOT EXISTS idx_email_notifications_type ON email_notifications_log(notification_type);
CREATE INDEX IF NOT EXISTS idx_email_notifications_recipient ON email_notifications_log(recipient_email);
CREATE INDEX IF NOT EXISTS idx_email_notifications_case_id ON email_notifications_log(case_id);
CREATE INDEX IF NOT EXISTS idx_email_notifications_sent_at ON email_notifications_log(sent_at);

-- Row Level Security
ALTER TABLE video_library ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_notifications_log ENABLE ROW LEVEL SECURITY;

-- Public can view active videos
CREATE POLICY "public_view_active_videos" ON video_library
  FOR SELECT USING (status = 'active');

-- Authenticated users can manage videos
CREATE POLICY "auth_manage_videos" ON video_library
  FOR ALL USING (auth.uid() IS NOT NULL);

-- Only authenticated users can view notification logs
CREATE POLICY "auth_view_notifications" ON email_notifications_log
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Only authenticated users can insert notifications
CREATE POLICY "auth_insert_notifications" ON email_notifications_log
  FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);

COMMENT ON TABLE video_library IS 'Stores Vimeo video metadata for case reviews and educational content';
COMMENT ON TABLE email_notifications_log IS 'Audit trail for all automated email notifications';