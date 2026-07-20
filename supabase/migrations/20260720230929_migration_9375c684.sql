-- Add social media link columns to blog_authors table
ALTER TABLE blog_authors 
ADD COLUMN IF NOT EXISTS twitter_url TEXT,
ADD COLUMN IF NOT EXISTS linkedin_url TEXT,
ADD COLUMN IF NOT EXISTS website_url TEXT;