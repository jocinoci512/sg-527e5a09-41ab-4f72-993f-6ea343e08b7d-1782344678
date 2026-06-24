---
title: Real-Time Case Monitoring with Supabase
status: todo
priority: high
type: feature
tags: [admin, realtime, supabase, notifications]
created_by: agent
created_at: 2026-06-24T00:31:43Z
position: 13
---

## Notes
Implement Supabase real-time subscriptions for instant case submission notifications and live dashboard updates. When a new case review is submitted on the public site, the admin dashboard should immediately display the new case without page refresh, show a notification popup, update counters, and optionally play a sound alert. This requires Supabase connection for real-time channels and database subscriptions.

## Checklist
- [ ] Set up Supabase real-time channel subscription in admin dashboard
- [ ] Create `case_reviews` table with real-time replication enabled
- [ ] Implement real-time notification popup component with case details
- [ ] Add notification badge counter to admin header showing unread cases
- [ ] Create live dashboard counters (Total Cases, Open, Pending, Closed, Today)
- [ ] Build notification center page at `/admin/notifications` with activity feed
- [ ] Add sound alert toggle in admin settings (enable/disable)
- [ ] Implement mark as read/unread functionality for notifications
- [ ] Add real-time reconnection logic if connection drops
- [ ] Ensure only authenticated admins can subscribe to real-time channels
- [ ] Add notification filtering (by date, scam type, status)
- [ ] Create activity log showing real-time case status changes

## Acceptance
- Dashboard updates instantly when a new case is submitted (no refresh needed)
- Notification popup appears with case details
- Live counters reflect real-time case statistics
- Notification center displays all recent activity
- Sound alerts work when enabled
- Multiple admin sessions stay synchronized
- Connection automatically recovers if lost