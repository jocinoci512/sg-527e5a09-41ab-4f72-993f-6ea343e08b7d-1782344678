
---
title: Admin Dashboard - CRM and Cases
status: todo
priority: high
type: feature
tags: [admin, crm, dashboard]
position: 7
---

## Notes
The private portal for Cipher Trace administrators to manage operations (`/admin/login`). This task focuses on layout, auth, and lead management.

## Checklist
- [ ] Build a secure Admin Login page.
- [ ] Create the Admin App Shell featuring a sidebar navigation (Dashboard, Leads, Cases, Content, Users, Settings).
- [ ] Implement the main Dashboard view with overview analytics cards (Total Leads, Active Cases, Traffic stats).
- [ ] Build the Lead Management view: a data table to view inquiries, filter, and export leads.
- [ ] Build the Case Management view: detailed case view allowing admins to update status (New, Investigating, Closed) and add internal notes.
- [ ] Wire these views to read/write from Supabase (if connected) or provide functional mock data.

## Acceptance
- Accessing `/admin` routes to a professional dashboard interface.
- Admins can view submitted Case Reviews and update their statuses.
  