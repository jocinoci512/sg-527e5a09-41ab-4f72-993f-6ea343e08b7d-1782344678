---
title: Multi-Step Report Scam Form & Case Management
status: in_progress
priority: urgent
type: feature
tags: [forms, case-management, admin, file-upload]
created_by: agent
created_at: 2026-06-24T03:55:40Z
position: 19
---

## Notes
Create professional multi-step fraud case submission form at /report-scam with 5 steps: Personal Info, Fraud Details, Blockchain Info, Case Description, Evidence Upload. Generate unique case reference IDs (CT-2026-XXXXXX format). Integrate WhatsApp follow-up. Enhance admin case management with status workflow, evidence viewing, and export capabilities.

## Checklist
- [ ] Create /report-scam page with multi-step form component
- [ ] Implement Step 1: Personal Information (name, email, phone, country, contact method)
- [ ] Implement Step 2: Fraud Details (type, date, amount, currency, platform, scammer name)
- [ ] Implement Step 3: Blockchain Info (wallet address, transaction hash, exchange, crypto type)
- [ ] Implement Step 4: Case Description (detailed description, timeline, notes)
- [ ] Implement Step 5: Evidence Upload (drag & drop, multi-file, progress indicators)
- [ ] Implement form validation (required fields, email validation, error messages)
- [ ] Generate unique case reference IDs (CT-2026-XXXXXX format)
- [ ] Create confirmation page with reference ID, submission date, estimated review time
- [ ] Add WhatsApp button with pre-filled message including case reference ID
- [ ] Update database schema for file uploads (Supabase Storage)
- [ ] Send email notifications to support@cipherstraces.com
- [ ] Enhance admin case management with status workflow (Submitted, Under Review, Investigation Started, Awaiting Information, Active Investigation, Consultation Scheduled, Closed)
- [ ] Add case assignment, internal notes, evidence viewing in admin
- [ ] Add case export functionality
- [ ] Add case search and filtering

## Acceptance
- Multi-step form works smoothly with validation
- Files upload to Supabase Storage successfully
- Unique case reference IDs generated
- Confirmation page displays with WhatsApp integration
- Admin can view, manage, and update cases
- Email notifications sent on submission