
---
title: Case Review Intake and Contact Hub
status: todo
priority: high
type: feature
tags: [forms, leads, contact]
position: 5
---

## Notes
This is the core conversion engine. The Case Review form must be comprehensive but frictionless, securely collecting sensitive fraud details. 

## Checklist
- [ ] Build the Case Review page with a multi-step or well-organized long form.
- [ ] Include form fields: Full Name, Email, Phone, Country, Scam Type, Amount Lost, Crypto Used, Wallet Address, Scammer Website, and Description.
- [ ] Implement file upload UI (dropzone) for evidence/screenshots (requires backend storage for persistence, mock UI if disconnected).
- [ ] Build the standard Contact page featuring Email (Support@cipherstraces.com), Phone/WhatsApp (+1 (646) 244-0064), business hours, and a general inquiry form.
- [ ] Add an embedded Google Maps section (placeholder or generic global HQ map) to the Contact page.
- [ ] Connect form submissions to save to the database (if Supabase is active) or local state/console for demonstration.

## Acceptance
- Case Review form captures all requested data points and supports file attachments.
- Contact page clearly displays all official communication channels.
  