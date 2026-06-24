---
title: SEO Management System & Dynamic Sitemap
status: in_progress
priority: high
type: feature
tags: [seo, sitemap, meta-tags, admin]
created_by: agent
created_at: 2026-06-24T04:10:00Z
position: 20
---

## Notes
Create comprehensive SEO management system allowing admins to edit meta titles, descriptions, keywords, canonical URLs, and Open Graph data for all pages. Build dynamic XML sitemap generator that auto-updates when content changes. Implement blog discovery to auto-include new blog posts in sitemap.

## Checklist
- [ ] Create SEO settings database table (page_seo)
- [ ] Create admin SEO management interface at /admin/seo
- [ ] Allow editing SEO for: Home, About, Services, Blog, Contact, Report Scam, individual blog posts
- [ ] Build dynamic sitemap.xml API route (/api/sitemap.xml)
- [ ] Auto-scan /blog/ directory and include all published posts
- [ ] Update sitemap when new content published
- [ ] Add priority values and change frequency to sitemap
- [ ] Implement robots.txt optimization
- [ ] Add structured data / schema markup generation

## Acceptance
- Admins can edit SEO settings for all pages
- Sitemap.xml generates dynamically
- Sitemap updates automatically when content changes
- Blog posts auto-discovered and added to sitemap