---
title: Supabase Integration & Database Schema
status: done
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
- [x] Connect Supabase integration via Softgen settings (top-right → Integrations)
- [x] Create `case_reviews` table schema with all case form fields
- [x] Create `leads` table (contact_leads) for contact form submissions
- [x] Create `reports` table for storing PDF report metadata
- [x] Create `notifications` table for admin notification tracking
- [x] Enable real-time replication on `case_reviews` table (enabled by default)
- [x] Configure Row Level Security (RLS) policies for admin-only access
- [x] Create database triggers for automatic notification creation
- [x] Create indexes for query performance optimization
- [x] Update Supabase TypeScript types
- [x] Create service layer for database operations
- [x] Update forms to persist data to database
- [x] Enable real-time subscriptions in admin dashboard

## Acceptance
- Supabase is connected and database tables are created
- RLS policies secure admin-only data access
- Real-time replication is enabled on required tables
- Environment variables are properly configured
- Database queries work from admin dashboard