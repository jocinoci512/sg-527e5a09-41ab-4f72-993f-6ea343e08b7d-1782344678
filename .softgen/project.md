
---
title: Cipher Trace Enterprise Platform
---

## Vision
Cipher Trace is a premium enterprise-grade fraud investigation, blockchain intelligence, and digital asset recovery consultation firm. The platform serves victims, businesses, attorneys, and law enforcement. The tone is highly professional, authoritative, secure, and transparent. The site includes a public-facing marketing/lead-generation frontend and a secure private admin dashboard for CRM/CMS management.

## Design
- **Theme**: Modern Cybersecurity / Financial Intelligence. Clean lines, generous whitespace, strict grid alignments.
- **Colors**:
  - `--primary`: 220 95% 16% (Deep Navy Blue - matching logo)
  - `--background`: 0 0% 100% (Pure White)
  - `--foreground`: 222 47% 11% (Dark Slate)
  - `--accent`: 214 32% 91% (Silver/Gray)
  - `--muted`: 210 40% 96% (Light Gray)
- **Typography**: 
  - Headings: `IBM Plex Sans` (authoritative, technical, enterprise)
  - Body: `Inter` (highly legible, trustworthy)
- **Branding**: Use the uploaded PNG logo (`uploads/image_52b6b659-de58-4916-9afc-3bc59ccc854b.png`) as the primary brand asset (copy to public folder).
- **Mandatory Disclaimer**: Must be displayed prominently across the site, especially in footers and case review pages: *"Cipher Trace provides fraud investigation, blockchain tracing, intelligence gathering, scam analysis, and recovery consultation services. Recovery outcomes cannot be guaranteed and vary depending on available evidence, jurisdiction, blockchain activity, third-party cooperation, and individual case circumstances."*

## Features
- Full public marketing site (Home, About, Services, Scams, Contact, FAQ, Blog).
- Advanced Case Review intake form with file/screenshot upload capability.
- Lead Generation: Sticky CTAs, floating WhatsApp button, exit intent concepts.
- Secure Admin Dashboard: Leads/Case management (CRM) and Blog/FAQ management (CMS).
- SEO Optimized: Dynamic meta tags, semantic HTML, robust content architecture.
- Backend note: Persistence for Cases, Leads, and CMS requires Supabase Postgres.
  