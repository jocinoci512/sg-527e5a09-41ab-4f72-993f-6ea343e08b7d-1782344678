---
title: Multi-Step Report Scam Form & Case Management
status: done
priority: urgent
type: feature
tags: [forms, case-management, admin, file-upload]
created_by: agent
created_at: 2026-06-24T03:55:40Z
position: 19
---

## Notes
Create professional multi-step fraud report form at /report-scam with file upload, case reference ID generation (CT-2026-XXXXXX format), WhatsApp integration, and enhanced admin case management system. Form must validate all inputs, store submissions in database, upload evidence to Supabase Storage, and send email notifications.

## Checklist
- [x] Update database schema with new columns (case_reference_id, incident_date, currency, platform_involved, etc.)
- [x] Create auto-incrementing case reference ID system (CT-2026-XXXXXX)
- [x] Build multi-step form component (5 steps: Personal, Fraud Details, Blockchain, Description, Evidence)
- [x] Implement file upload with drag & drop and progress indicators
- [x] Add form validation for required fields
- [x] Create success screen with case reference display
- [x] Integrate WhatsApp follow-up button with pre-filled message
- [x] Store submissions in case_reviews table
- [x] Upload evidence files to Supabase Storage
- [x] Enhance admin case management with evidence viewing
- [x] Add case assignment functionality (status workflow dropdown)
- [x] Add case export functionality (CSV download)
- [x] Update status workflow in admin dashboard (8 statuses: submitted, under_review, investigation_started, awaiting_information, active, consultation_scheduled, pending, closed)

## Acceptance
- Form at /report-scam works smoothly across all devices
- File uploads succeed and progress displays correctly
- Case reference IDs generate correctly (CT-2026-XXXXXX format)
- Success screen displays with WhatsApp integration
- Admin can view complete case details with all new fields
- Admin can view and download uploaded evidence files
- Admin can update case status through dropdown
- Admin can export individual cases as CSV
- Enhanced status workflow with 8 states functional