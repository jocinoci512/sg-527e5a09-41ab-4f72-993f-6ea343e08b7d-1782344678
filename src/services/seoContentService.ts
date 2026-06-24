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
    
    return `Professional ${theme} related to ${keyword}, modern cybersecurity aesthetic, dark blue and silver color scheme, high-tech interface elements, clean minimalist design, 16:9 aspect ratio, no text, no logos, suitable for fraud investigation and blockchain intelligence company`;
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
  // BULK OPERATIONS
  // ============================================

  async bulkGenerateTemplates(keywordIds: string[]) {
    const results = [];
    
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

      const template = await this.createContentTemplate({
        keyword_id: keywordId,
        cluster_id: keyword.cluster_id,
        template_type: "long_form_blog",
        ...metadata,
        featured_image_prompt: imagePrompt,
        faq_questions: faqs,
        cta_section: cta,
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

      results.push(template);
    }

    return results;
  }
};