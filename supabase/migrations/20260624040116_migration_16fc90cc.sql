-- Add new columns to case_reviews table one by one
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS case_reference_id text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS incident_date date;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS currency text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS platform_involved text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS scammer_name text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS transaction_hash text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS exchange_used text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS preferred_contact_method text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS timeline_of_events text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS additional_notes text;
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS assigned_to uuid REFERENCES profiles(id);
ALTER TABLE case_reviews ADD COLUMN IF NOT EXISTS estimated_review_date date;

-- Add unique constraint to case_reference_id
ALTER TABLE case_reviews DROP CONSTRAINT IF EXISTS case_reviews_case_reference_id_key;
ALTER TABLE case_reviews ADD CONSTRAINT case_reviews_case_reference_id_key UNIQUE (case_reference_id);

-- Update status constraint
ALTER TABLE case_reviews DROP CONSTRAINT IF EXISTS case_reviews_status_check;
ALTER TABLE case_reviews ADD CONSTRAINT case_reviews_status_check 
  CHECK (status IN ('submitted', 'under_review', 'investigation_started', 'awaiting_information', 'active_investigation', 'consultation_scheduled', 'closed'));

-- Create function to generate unique case reference IDs
CREATE OR REPLACE FUNCTION generate_case_reference_id()
RETURNS text AS $$
DECLARE
  ref_id text;
  year_part text;
  counter int;
BEGIN
  year_part := TO_CHAR(NOW(), 'YYYY');
  
  SELECT COUNT(*) + 1 INTO counter
  FROM case_reviews
  WHERE EXTRACT(YEAR FROM created_at) = EXTRACT(YEAR FROM NOW());
  
  ref_id := 'CT-' || year_part || '-' || LPAD(counter::text, 6, '0');
  
  RETURN ref_id;
END;
$$ LANGUAGE plpgsql;

-- Create trigger function
CREATE OR REPLACE FUNCTION set_case_reference_id()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.case_reference_id IS NULL THEN
    NEW.case_reference_id := generate_case_reference_id();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Drop and recreate trigger
DROP TRIGGER IF EXISTS trigger_set_case_reference_id ON case_reviews;
CREATE TRIGGER trigger_set_case_reference_id
  BEFORE INSERT ON case_reviews
  FOR EACH ROW
  EXECUTE FUNCTION set_case_reference_id();

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_case_reviews_reference_id ON case_reviews(case_reference_id);
CREATE INDEX IF NOT EXISTS idx_case_reviews_assigned_to ON case_reviews(assigned_to);
CREATE INDEX IF NOT EXISTS idx_case_reviews_incident_date ON case_reviews(incident_date);

-- Create storage bucket for case evidence (without policies in this query)
INSERT INTO storage.buckets (id, name, public)
VALUES ('case-evidence', 'case-evidence', false)
ON CONFLICT (id) DO NOTHING;