---
title: Advanced SEO Features - Linking, Export, Auto-Clustering
status: done
priority: high
type: feature
tags: [seo, automation, export, clustering, navigation]
created_by: agent
created_at: 2026-06-24T05:05:00Z
position: 26
---

## Notes
Implement automated internal linking engine that maps keywords to existing content, content export system for external CMS use, smart keyword clustering using semantic similarity, and add homepage navigation links to all admin pages for consistent UX.

## Checklist
- [x] Create automated internal linking algorithm in seoContentService
- [x] Implement relevance scoring system (keyword matching + semantic terms)
- [x] Generate anchor text suggestions based on keyword overlap
- [x] Display internal link suggestions in template details dialog
- [x] Show relevance scores (percentage match) for each suggested link
- [x] Create Markdown export formatter with frontmatter
- [x] Create JSON export formatter for external CMS integration
- [x] Add download functionality for both formats
- [x] Add MD and JSON export buttons to Templates tab
- [x] Implement semantic similarity algorithm for auto-clustering
- [x] Calculate keyword-to-cluster similarity scores
- [x] Build auto-clustering dialog with confidence percentages
- [x] Show alternative cluster suggestions
- [x] Add "Apply All Suggestions" bulk action
- [x] Add homepage link to /admin navigation
- [x] Add homepage link to /admin/seo-content navigation
- [x] Add homepage link to /admin/cases navigation
- [x] Add homepage link to /admin/blog navigation
- [x] Add homepage link to /admin/content navigation
- [x] Add homepage link to /admin/seo navigation

## Acceptance
- Internal linking engine suggests up to 5 relevant links per template
- Relevance scores display as percentages (>30% threshold)
- Anchor text auto-generated based on keyword overlap
- Templates export successfully as Markdown with proper frontmatter
- Templates export successfully as JSON with nested metadata structure
- Auto-clustering analyzes unassigned keywords and suggests clusters
- Confidence scores show match quality (>40% = good match)
- Alternative clusters display for manual override
- All admin pages have consistent navigation with homepage link
- Users can review clustering suggestions before applying
- All admin pages have homepage link in navigation