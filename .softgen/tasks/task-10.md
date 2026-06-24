---
title: Global Site-Wide Search Modal
status: todo
priority: high
type: feature
tags: [search, navigation, ux]
created_by: agent
created_at: 2026-06-24T00:23:54Z
position: 10
---

## Notes
Create a global command-palette style search modal that users can access via keyboard shortcut (Cmd+K / Ctrl+K) or button click. The modal should allow quick navigation to scam types, services, legal pages, and blog articles.

## Checklist
- [ ] Create SearchModal component using Command component from shadcn/ui
- [ ] Add keyboard shortcut support (Cmd+K / Ctrl+K)
- [ ] Index all major pages: services, scam types, legal docs, FAQs
- [ ] Add search trigger button to Header
- [ ] Implement fuzzy search filtering
- [ ] Add keyboard navigation within results

## Acceptance
- Users can open search modal via keyboard shortcut or button
- Search returns relevant results across all site sections
- Keyboard navigation works smoothly within the modal