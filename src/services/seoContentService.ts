import { supabase } from "@/integrations/supabase/client";

export const seoContentService = {
  // ============================================
  // KEYWORD MANAGEMENT
  // ============================================
  
  async getKeywords(filters?: { cluster_id?: string; status?: string; type?: string }) {
    let query = supabase
      .from("seo_keywords")
      .select(`
        *,
        cluster:seo_topic_clusters(*)
      `)
      .order("priority", { ascending: false });

    if (filters?.cluster_id) query = query.eq("cluster_id", filters.cluster_id);
    if (filters?.status) query = query.eq("content_status", filters.status);
    if (filters?.type) query = query.eq("keyword_type", filters.type);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createKeyword(keywordData: any) {
    const { data, error } = await supabase
      .from("seo_keywords")
      .insert(keywordData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateKeyword(id: string, keywordData: any) {
    const { data, error } = await supabase
      .from("seo_keywords")
      .update({ ...keywordData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteKeyword(id: string) {
    const { error } = await supabase
      .from("seo_keywords")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // ============================================
  // TOPIC CLUSTERS
  // ============================================

  async getClusters() {
    const { data, error } = await supabase
      .from("seo_topic_clusters")
      .select(`
        *,
        keywords:seo_keywords(count)
      `)
      .order("priority", { ascending: false });
    if (error) throw error;
    return data || [];
  },

  async createCluster(clusterData: any) {
    const { data, error } = await supabase
      .from("seo_topic_clusters")
      .insert(clusterData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateCluster(id: string, clusterData: any) {
    const { data, error } = await supabase
      .from("seo_topic_clusters")
      .update({ ...clusterData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // ============================================
  // CONTENT TEMPLATES
  // ============================================

  async getContentTemplates(filters?: { cluster_id?: string; status?: string; type?: string }) {
    let query = supabase
      .from("seo_content_templates")
      .select(`
        *,
        keyword:seo_keywords(*),
        cluster:seo_topic_clusters(*),
        blog_post:blog_posts(*)
      `)
      .order("created_at", { ascending: false });

    if (filters?.cluster_id) query = query.eq("cluster_id", filters.cluster_id);
    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.type) query = query.eq("template_type", filters.type);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createContentTemplate(templateData: any) {
    const { data, error } = await supabase
      .from("seo_content_templates")
      .insert(templateData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateContentTemplate(id: string, templateData: any) {
    const { data, error } = await supabase
      .from("seo_content_templates")
      .update({ ...templateData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteContentTemplate(id: string) {
    const { error } = await supabase
      .from("seo_content_templates")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // ============================================
  // INTERNAL LINKING ENGINE
  // ============================================

  async generateInternalLinks(keyword: string, currentTemplateId?: string) {
    // Fetch all published blog posts
    const { data: blogPosts } = await supabase
      .from("blog_posts")
      .select("id, title, slug, excerpt, content")
      .eq("status", "published");

    if (!blogPosts || blogPosts.length === 0) return [];

    // Fetch all content templates
    const { data: templates } = await supabase
      .from("seo_content_templates")
      .select("id, seo_title, url_slug, meta_description");

    const allContent = [
      ...(blogPosts || []).map((post: any) => ({
        id: post.id,
        title: post.title,
        url: `/blog/${post.slug}`,
        excerpt: post.excerpt,
        type: "blog_post",
        relevanceScore: this.calculateRelevance(keyword, post.title + " " + post.excerpt + " " + (post.content || "").substring(0, 500))
      })),
      ...(templates || [])
        .filter((t: any) => t.id !== currentTemplateId)
        .map((t: any) => ({
          id: t.id,
          title: t.seo_title,
          url: `/blog/${t.url_slug}`,
          excerpt: t.meta_description,
          type: "template",
          relevanceScore: this.calculateRelevance(keyword, t.seo_title + " " + t.meta_description)
        }))
    ];

    // Sort by relevance and return top 5
    return allContent
      .filter(content => content.relevanceScore > 0.3)
      .sort((a, b) => b.relevanceScore - a.relevanceScore)
      .slice(0, 5)
      .map(content => ({
        title: content.title,
        url: content.url,
        anchor_text: this.suggestAnchorText(keyword, content.title),
        relevance: Math.round(content.relevanceScore * 100)
      }));
  },

  calculateRelevance(keyword: string, content: string): number {
    const keywordLower = keyword.toLowerCase();
    const contentLower = content.toLowerCase();
    const keywordWords = keywordLower.split(/\s+/);
    
    let score = 0;
    
    // Exact match = high score
    if (contentLower.includes(keywordLower)) {
      score += 0.8;
    }
    
    // Partial matches
    keywordWords.forEach(word => {
      if (word.length > 3 && contentLower.includes(word)) {
        score += 0.15;
      }
    });
    
    // Related terms (simple semantic matching)
    const relatedTerms = this.getRelatedTerms(keywordLower);
    relatedTerms.forEach(term => {
      if (contentLower.includes(term)) {
        score += 0.1;
      }
    });
    
    return Math.min(score, 1.0);
  },

  getRelatedTerms(keyword: string): string[] {
    const semanticMap: Record<string, string[]> = {
      "crypto": ["cryptocurrency", "bitcoin", "blockchain", "digital asset", "btc", "eth"],
      "scam": ["fraud", "fraudulent", "scammer", "phishing", "theft"],
      "recovery": ["recover", "restore", "retrieve", "reclaim"],
      "investigation": ["investigate", "investigator", "trace", "tracing", "forensic"],
      "blockchain": ["crypto", "ledger", "transaction", "wallet", "address"],
      "fraud": ["scam", "deception", "criminal", "theft", "stolen"]
    };

    const terms: string[] = [];
    Object.keys(semanticMap).forEach(key => {
      if (keyword.includes(key)) {
        terms.push(...semanticMap[key]);
      }
    });

    return terms;
  },

  suggestAnchorText(keyword: string, linkTitle: string): string {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    const titleWords = linkTitle.toLowerCase().split(/\s+/);
    
    // Find common words
    const commonWords = keywordWords.filter(word => 
      titleWords.some(titleWord => titleWord.includes(word) || word.includes(titleWord))
    );
    
    if (commonWords.length > 0) {
      return commonWords.slice(0, 3).join(" ");
    }
    
    return keyword;
  },

  // ============================================
  // EXPORT SYSTEM
  // ============================================

  exportToMarkdown(template: any): string {
    const markdown = `---
title: ${template.seo_title}
slug: ${template.url_slug}
excerpt: ${template.meta_description}
featured_image: ${template.featured_image_url || ""}
category: ${template.cluster?.cluster_name || "Uncategorized"}
date: ${new Date().toISOString().split("T")[0]}
seo_title: ${template.meta_title}
seo_description: ${template.meta_description}
keywords: ${template.keyword?.keyword || ""}
---

# ${template.headline}

${template.subheadline}

${template.main_sections?.map((section: any) => `
## ${section.heading}

${section.outline}

[Content to be written based on this outline]

`).join("\n") || ""}

## Frequently Asked Questions

${template.faq_questions?.map((faq: any) => `
### ${faq.question}

${faq.answer}

`).join("\n") || ""}

## ${template.cta_section?.headline || "Take Action Today"}

${template.cta_section?.description || ""}

[${template.cta_section?.primary_cta || "Get Started"}](${template.cta_section?.primary_cta_url || "#"})

---

**Internal Links:** ${template.internal_links?.map((link: any) => `[${link.title}](${link.url})`).join(", ") || "No links yet"}

**Featured Image Prompt:** ${template.featured_image_prompt}

**Target Word Count:** ${template.target_word_count || 2000} words
**Estimated Reading Time:** ${template.estimated_reading_time || 10} minutes
`;
    return markdown;
  },

  exportToJSON(template: any): string {
    const exportData = {
      metadata: {
        title: template.seo_title,
        slug: template.url_slug,
        excerpt: template.meta_description,
        featured_image: template.featured_image_url,
        category: template.cluster?.cluster_name,
        created_at: new Date().toISOString(),
        template_type: template.template_type,
        status: template.status
      },
      seo: {
        meta_title: template.meta_title,
        meta_description: template.meta_description,
        canonical_url: template.canonical_url,
        keywords: template.keyword?.keyword,
        og_title: template.og_title,
        og_description: template.og_description
      },
      content: {
        headline: template.headline,
        subheadline: template.subheadline,
        main_sections: template.main_sections,
        faq_questions: template.faq_questions,
        cta_section: template.cta_section,
        internal_links: template.internal_links,
        target_word_count: template.target_word_count,
        estimated_reading_time: template.estimated_reading_time
      },
      images: {
        featured_image_url: template.featured_image_url,
        featured_image_prompt: template.featured_image_prompt
      }
    };
    return JSON.stringify(exportData, null, 2);
  },

  downloadFile(content: string, filename: string, mimeType: string) {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  },

  // ============================================
  // AUTOMATED KEYWORD CLUSTERING
  // ============================================

  async autoClusterKeywords(keywordIds: string[]) {
    // Fetch keywords and existing clusters
    const { data: keywords } = await supabase
      .from("seo_keywords")
      .select("*")
      .in("id", keywordIds);

    const { data: clusters } = await supabase
      .from("seo_topic_clusters")
      .select("*");

    if (!keywords || !clusters) return [];

    const suggestions: any[] = [];

    keywords.forEach((keyword: any) => {
      // Calculate similarity score with each cluster
      const clusterScores = clusters.map((cluster: any) => ({
        cluster,
        score: this.calculateSemanticSimilarity(
          keyword.keyword,
          cluster.cluster_name + " " + cluster.pillar_keyword + " " + cluster.description
        )
      }));

      // Sort by score and get best match
      clusterScores.sort((a, b) => b.score - a.score);
      const bestMatch = clusterScores[0];

      if (bestMatch.score > 0.4) {
        suggestions.push({
          keyword_id: keyword.id,
          keyword: keyword.keyword,
          suggested_cluster: bestMatch.cluster,
          confidence: Math.round(bestMatch.score * 100),
          alternatives: clusterScores.slice(1, 3).map(cs => ({
            cluster: cs.cluster,
            confidence: Math.round(cs.score * 100)
          }))
        });
      } else {
        // Suggest creating new cluster
        suggestions.push({
          keyword_id: keyword.id,
          keyword: keyword.keyword,
          suggested_cluster: null,
          confidence: 0,
          suggestion: "Create new cluster",
          alternatives: []
        });
      }
    });

    return suggestions;
  },

  calculateSemanticSimilarity(text1: string, text2: string): number {
    const words1 = text1.toLowerCase().split(/\s+/);
    const words2 = text2.toLowerCase().split(/\s+/);
    
    let matches = 0;
    const totalWords = Math.max(words1.length, words2.length);
    
    // Direct word matches
    words1.forEach(word1 => {
      if (word1.length > 3 && words2.some(word2 => word2.includes(word1) || word1.includes(word2))) {
        matches++;
      }
    });
    
    // Semantic similarity using related terms
    words1.forEach(word1 => {
      const related = this.getRelatedTerms(word1);
      if (related.some(term => words2.join(" ").includes(term))) {
        matches += 0.5;
      }
    });
    
    return Math.min(matches / totalWords, 1.0);
  },

  async applyClusteringSuggestions(suggestions: any[]) {
    for (const suggestion of suggestions) {
      if (suggestion.suggested_cluster) {
        await this.updateKeyword(suggestion.keyword_id, {
          cluster_id: suggestion.suggested_cluster.id
        });
      }
    }
  },

  // ============================================
  // CONTENT GENERATION HELPERS
  // ============================================

  generateSEOMetadata(keyword: string, templateType: string) {
    const slug = keyword.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    
    const templates = {
      long_form_blog: {
        seo_title: `${this.capitalizeWords(keyword)} | Complete Guide 2026`,
        meta_title: `${this.capitalizeWords(keyword)}: Expert Guide & Solutions`,
        meta_description: `Professional guide to ${keyword}. Learn from blockchain intelligence experts. Investigation services, recovery consultation, and fraud prevention strategies.`,
        headline: `${this.capitalizeWords(keyword)}: Complete Professional Guide`,
        subheadline: `Expert insights from Cipher Trace's fraud investigation and blockchain intelligence team`
      },
      resource_article: {
        seo_title: `${this.capitalizeWords(keyword)} Resources | Cipher Trace`,
        meta_title: `${this.capitalizeWords(keyword)}: Professional Resources & Tools`,
        meta_description: `Comprehensive ${keyword} resources from cybersecurity experts. Investigation tools, prevention guides, and victim support information.`,
        headline: `${this.capitalizeWords(keyword)} Resources`,
        subheadline: `Professional tools and guidance for fraud victims and investigators`
      },
      homepage_block: {
        seo_title: `${this.capitalizeWords(keyword)} Services`,
        meta_title: `Expert ${this.capitalizeWords(keyword)} Consultation`,
        meta_description: `Professional ${keyword} services. Contact our investigation team for confidential consultation and expert guidance.`,
        headline: this.capitalizeWords(keyword),
        subheadline: `Trusted by victims, businesses, and law enforcement worldwide`
      }
    };

    const template = templates[templateType as keyof typeof templates] || templates.long_form_blog;

    return {
      ...template,
      url_slug: slug,
      canonical_url: `https://cipherstraces.com/blog/${slug}`,
      og_title: template.seo_title,
      og_description: template.meta_description
    };
  },

  generateFeaturedImagePrompt(keyword: string, templateType: string) {
    const themes = [
      "blockchain network visualization",
      "digital forensics interface",
      "cybersecurity shield concept",
      "cryptocurrency tracing diagram",
      "fraud investigation scene",
      "digital asset protection"
    ];
    
    const theme = themes[Math.floor(Math.random() * themes.length)];
    
    return `Professional ${theme} related to ${keyword}, modern cybersecurity aesthetic, dark blue (#1C3A70) and silver (#D4E4F7) color scheme matching Cipher Trace brand, high-tech interface elements, clean minimalist design, no text, no logos, suitable for enterprise fraud investigation and blockchain intelligence platform`;
  },

  generateFAQQuestions(keyword: string) {
    return [
      {
        question: `What is ${keyword}?`,
        answer: `Professional explanation of ${keyword} and its relevance to fraud investigation and blockchain intelligence.`
      },
      {
        question: `How does ${keyword} work?`,
        answer: `Detailed methodology and process explanation from cybersecurity experts.`
      },
      {
        question: `What are the costs associated with ${keyword}?`,
        answer: `Transparent pricing information and consultation options.`
      },
      {
        question: `How long does ${keyword} take?`,
        answer: `Timeline expectations based on case complexity and investigation scope.`
      },
      {
        question: `Is ${keyword} legal and compliant?`,
        answer: `Legal framework and regulatory compliance information.`
      }
    ];
  },

  generateCTASection(keyword: string) {
    return {
      headline: "Need Professional Assistance?",
      description: `Our team of fraud investigation and blockchain intelligence experts can help with ${keyword}. Contact us for a confidential consultation.`,
      primary_cta: "Start Free Case Review",
      primary_cta_url: "/case-review",
      secondary_cta: "Contact Our Team",
      secondary_cta_url: "/contact"
    };
  },

  capitalizeWords(str: string) {
    return str.replace(/\b\w/g, (char) => char.toUpperCase());
  },

  // ============================================
  // BULK OPERATIONS WITH AI IMAGE GENERATION
  // ============================================

  async bulkGenerateTemplates(keywordIds: string[], options?: { generateImages?: boolean }) {
    const results = [];
    const generateImages = options?.generateImages !== false;
    
    for (const keywordId of keywordIds) {
      const { data: keyword } = await supabase
        .from("seo_keywords")
        .select("*, cluster:seo_topic_clusters(*)")
        .eq("id", keywordId)
        .single();

      if (!keyword) continue;

      const metadata = this.generateSEOMetadata(keyword.keyword, "long_form_blog");
      const imagePrompt = this.generateFeaturedImagePrompt(keyword.keyword, "long_form_blog");
      const faqs = this.generateFAQQuestions(keyword.keyword);
      const cta = this.generateCTASection(keyword.keyword);
      const internalLinks = await this.generateInternalLinks(keyword.keyword);

      const imageFileName = `${metadata.url_slug}-featured.png`;
      const imagePath = `public/generated/${imageFileName}`;

      const template = await this.createContentTemplate({
        keyword_id: keywordId,
        cluster_id: keyword.cluster_id,
        template_type: "long_form_blog",
        ...metadata,
        featured_image_prompt: imagePrompt,
        featured_image_url: generateImages ? `/generated/${imageFileName}` : null,
        faq_questions: faqs,
        cta_section: cta,
        internal_links: internalLinks,
        main_sections: [
          { heading: `Understanding ${this.capitalizeWords(keyword.keyword)}`, outline: "Introduction and overview" },
          { heading: "How It Works", outline: "Detailed methodology and process" },
          { heading: "Warning Signs and Red Flags", outline: "Identification and prevention" },
          { heading: "Investigation Process", outline: "Professional investigation approach" },
          { heading: "Recovery Options", outline: "Available solutions and next steps" }
        ],
        target_word_count: 2000,
        estimated_reading_time: 10
      });

      if (generateImages) {
        results.push({
          template,
          imageGeneration: {
            prompt: imagePrompt,
            path: imagePath,
            aspect_ratio: "16:9"
          }
        });
      } else {
        results.push({ template });
      }
    }

    return results;
  }
};