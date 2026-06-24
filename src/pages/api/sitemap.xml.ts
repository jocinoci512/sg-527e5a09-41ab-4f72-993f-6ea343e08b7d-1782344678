import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/integrations/supabase/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    // Fetch all published blog posts - handle potential errors gracefully
    const { data: posts, error } = await supabase
      .from("blog_posts")
      .select("slug, updated_at, created_at")
      .eq("status", "published")
      .order("created_at", { ascending: false });

    // Log any query errors but continue with sitemap generation
    if (error) {
      console.error("Error fetching blog posts for sitemap:", error);
    }

    // Static pages
    const staticPages = [
      { path: "/", changefreq: "daily", priority: 1.0 },
      { path: "/about", changefreq: "monthly", priority: 0.8 },
      { path: "/services", changefreq: "weekly", priority: 0.9 },
      { path: "/services/crypto-fraud", changefreq: "weekly", priority: 0.9 },
      { path: "/scams", changefreq: "weekly", priority: 0.8 },
      { path: "/scams/pig-butchering", changefreq: "weekly", priority: 0.8 },
      { path: "/case-review", changefreq: "monthly", priority: 0.9 },
      { path: "/report-scam", changefreq: "monthly", priority: 0.9 },
      { path: "/contact", changefreq: "monthly", priority: 0.8 },
      { path: "/blog", changefreq: "daily", priority: 0.9 },
      { path: "/faq", changefreq: "monthly", priority: 0.7 },
      { path: "/privacy", changefreq: "yearly", priority: 0.5 },
      { path: "/terms", changefreq: "yearly", priority: 0.5 },
      { path: "/disclaimer", changefreq: "yearly", priority: 0.5 },
      { path: "/cookies", changefreq: "yearly", priority: 0.5 }
    ];

    const baseUrl = "https://cipherstraces.com";

    // Generate XML
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages
    .map(
      (page) => `
  <url>
    <loc>${baseUrl}${page.path}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
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
    <priority>0.7</priority>
  </url>`
          )
          .join("")
      : ""
  }
</urlset>`;

    res.setHeader("Content-Type", "text/xml");
    res.setHeader("Cache-Control", "s-maxage=86400, stale-while-revalidate");
    res.status(200).send(sitemap);
  } catch (error) {
    console.error("Sitemap generation error:", error);
    res.status(500).json({ error: "Failed to generate sitemap" });
  }
}