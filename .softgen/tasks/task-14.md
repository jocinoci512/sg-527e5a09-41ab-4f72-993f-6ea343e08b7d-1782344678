---
title: Supabase Integration & Database Schema
status: in_progress
priority: urgent
type: chore
tags: [supabase, database, backend]
created_by: agent
created_at: 2026-06-24T00:31:43Z
position: 14
---

## Notes
This is the foundational task required before implementing Tasks 11, 12, and 13. Set up Supabase connection, create database schema for case reviews, leads, reports, and notifications. Configure Row Level Security (RLS) policies, enable real-time replication, and prepare Edge Functions infrastructure.

## Checklist
- [ ] Connect Supabase integration via Softgen settings (top-right → Integrations)
- [ ] Create `case_reviews` table schema with all case form fields
- [ ] Create `leads` table schema for contact form submissions
- [ ] Create `reports` table for storing PDF report metadata
- [ ] Create `notifications` table for admin notification tracking
- [ ] Enable real-time replication on `case_reviews` table
- [ ] Configure Row Level Security (RLS) policies for admin-only access
- [ ] Set up Supabase authentication for admin users
- [ ] Create admin user roles table and permissions
- [ ] Install Supabase client library in project
- [ ] Configure environment variables for Supabase connection
- [ ] Test database connection and CRUD operations

## Acceptance
- Supabase is connected and database tables are created
- RLS policies secure admin-only data access
- Real-time replication is enabled on required tables
- Environment variables are properly configured
- Database queries work from admin dashboard