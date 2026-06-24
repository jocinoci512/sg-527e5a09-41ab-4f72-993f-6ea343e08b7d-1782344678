---
title: Supabase Email Notifications
status: todo
priority: medium
type: feature
tags: [backend, supabase, notifications]
created_by: agent
created_at: 2026-06-24T00:23:54Z
position: 11
---

## Notes
Set up Supabase edge functions to automatically send email notifications to Support@cipherstraces.com when new case review forms are submitted. This requires Supabase to be connected and configured first.

## Checklist
- [ ] Connect Supabase integration in project settings
- [ ] Create database schema for case_reviews table
- [ ] Create Supabase edge function for email notifications
- [ ] Configure SMTP settings or email service integration
- [ ] Test email delivery on form submission
- [ ] Add retry logic for failed email sends

## Acceptance
- Admin receives email notification when a case review is submitted
- Emails contain relevant case details
- Failed emails are logged and retried