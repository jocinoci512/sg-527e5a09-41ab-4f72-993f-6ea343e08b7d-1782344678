import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all published blog posts
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching blog posts for sitemap:", error);
    }

    // Static pages with proper priority and change frequency
    const staticPages = [
      // Homepage - Highest priority
      { path: "/", changefreq: "daily", priority: 1.0 },
      
      // Core service pages - Very high priority
      { path: "/case-review", changefreq: "weekly", priority: 0.95 },
      { path: "/report-scam", changefreq: "weekly", priority: 0.95 },
      { path: "/contact", changefreq: "monthly", priority: 0.9 },
      
      // Main navigation pages
      { path: "/about", changefreq: "monthly", priority: 0.9 },
      { path: "/services", changefreq: "weekly", priority: 0.95 },
      { path: "/scams", changefreq: "weekly", priority: 0.9 },
      { path: "/blog", changefreq: "daily", priority: 0.9 },
      { path: "/faq", changefreq: "weekly", priority: 0.85 },
      
      // Service pages - High priority for SEO
      { path: "/services/crypto-fraud", changefreq: "weekly", priority: 0.9 },
      
      // Scam type pages - High priority for SEO
      { path: "/scams/pig-butchering", changefreq: "weekly", priority: 0.85 },
      
      // Legal pages - Lower priority but necessary
      { path: "/privacy", changefreq: "yearly", priority: 0.3 },
      { path: "/terms", changefreq: "yearly", priority: 0.3 },
      { path: "/disclaimer", changefreq: "yearly", priority: 0.3 },
      { path: "/cookies", changefreq: "yearly", priority: 0.3 }
    ];

    const baseUrl = "https://cipherstraces.com";
    const currentDate = new Date().toISOString();

    // Generate XML sitemap
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" 
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`
    )
    .join("")}
  ${
    posts && posts.length > 0
      ? posts
          .map(
            (post) => `
  <url>
    <loc>${baseUrl}/blog/${post.slug}</loc>
    <lastmod>${new Date(post.updated_at || post.created_at).toISOString()}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`
          )
          .join("")
      : ""
  }
</urlset>`;

    res.setHeader("Content-Type", "text/xml; charset=UTF-8");
    res.setHeader("Cache-Control", "public, s-maxage=86400, stale-while-revalidate=43200");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}