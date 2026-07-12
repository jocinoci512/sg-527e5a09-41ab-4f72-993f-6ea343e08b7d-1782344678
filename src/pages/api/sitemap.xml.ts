import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Base URL for production
    const baseUrl = "https://cipherstraces.com";
    const currentDate = new Date().toISOString();

    // Static pages with SEO priority
    const staticPages = [
      // Highest Priority - Homepage & Core Services
      { path: "", changefreq: "daily", priority: 1.0 },
      { path: "case-review", changefreq: "weekly", priority: 0.95 },
      { path: "report-scam", changefreq: "weekly", priority: 0.95 },
      { path: "contact", changefreq: "monthly", priority: 0.9 },
      
      // Main Navigation
      { path: "about", changefreq: "monthly", priority: 0.9 },
      { path: "services", changefreq: "weekly", priority: 0.95 },
      { path: "scams", changefreq: "weekly", priority: 0.9 },
      { path: "blog", changefreq: "daily", priority: 0.9 },
      { path: "faq", changefreq: "weekly", priority: 0.85 },
      
      // Service Pages - High SEO Priority
      { path: "services/crypto-fraud", changefreq: "weekly", priority: 0.9 },
      
      // Scam Type Pages
      { path: "scams/pig-butchering", changefreq: "weekly", priority: 0.85 },
      
      // Legal Pages
      { path: "privacy", changefreq: "yearly", priority: 0.3 },
      { path: "terms", changefreq: "yearly", priority: 0.3 },
      { path: "disclaimer", changefreq: "yearly", priority: 0.3 },
      { path: "cookies", changefreq: "yearly", priority: 0.3 }
    ];

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${staticPages.map(page => `  <url>
    <loc>${baseUrl}/${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

    // Set proper headers for XML sitemap
    res.setHeader("Content-Type", "text/xml; charset=utf-8");
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}