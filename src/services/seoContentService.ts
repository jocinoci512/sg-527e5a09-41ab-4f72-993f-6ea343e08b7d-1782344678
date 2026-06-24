import { supabase } from "@/integrations/supabase/client";

export const seoContentService = {
  async getKeywords(filters?: { cluster_id?: string; status?: string; type?: string }) {
    let query = supabase
      .from("seo_keywords")
      .select("*, cluster:seo_topic_clusters(*)")
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

  async getClusters() {
    const { data, error } = await supabase
      .from("seo_topic_clusters")
      .select("*, keywords:seo_keywords(count)")
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

  async getContentTemplates(filters?: { cluster_id?: string; status?: string; type?: string }) {
    let query = supabase
      .from("seo_content_templates")
      .select("*, keyword:seo_keywords(*), cluster:seo_topic_clusters(*), blog_post:blog_posts(*)")
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

  generateFeaturedImagePrompt(keyword: string) {
    const themes = [
      "blockchain network visualization with glowing nodes",
      "digital forensics interface dashboard",
      "cybersecurity shield with circuit patterns",
      "cryptocurrency tracing network diagram",
      "fraud investigation command center",
      "digital asset protection concept"
    ];
    
    const theme = themes[Math.floor(Math.random() * themes.length)];
    
    return `Professional ${theme} representing ${keyword}, modern cybersecurity aesthetic, deep navy blue (#1C3A70) and light silver (#D4E4F7) color palette matching Cipher Trace brand identity, high-tech interface elements, clean minimalist enterprise design, abstract geometric patterns, no text overlays, no logos, suitable for fraud investigation and blockchain intelligence platform hero image`;
  },

  generateFAQQuestions(keyword: string) {
    return [
      {
        question: `What is ${keyword}?`,
        answer: `${this.capitalizeWords(keyword)} refers to professional investigation and analysis services provided by blockchain intelligence experts to help victims and organizations address fraud-related incidents.`
      },
      {
        question: `How does ${keyword} work?`,
        answer: `Our team uses advanced blockchain tracing technology, forensic analysis tools, and investigative methodologies to track digital assets, identify perpetrators, and gather evidence for ${keyword} cases.`
      },
      {
        question: `What are the costs associated with ${keyword}?`,
        answer: `Pricing for ${keyword} services varies based on case complexity, investigation scope, and required resources. We offer free initial case reviews and transparent consultation pricing.`
      },
      {
        question: `How long does ${keyword} take?`,
        answer: `Timeline for ${keyword} investigations depends on case specifics, blockchain complexity, evidence availability, and third-party cooperation. Initial assessments typically complete within 24-48 hours.`
      },
      {
        question: `Is ${keyword} legal and compliant?`,
        answer: `All ${keyword} services are conducted in full compliance with applicable laws, regulations, and industry standards. We work closely with law enforcement and legal professionals.`
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
      const imagePrompt = this.generateFeaturedImagePrompt(keyword.keyword);
      const faqs = this.generateFAQQuestions(keyword.keyword);
      const cta = this.generateCTASection(keyword.keyword);

      const imageFileName = `${metadata.url_slug}-featured.png`;

      const template = await this.createContentTemplate({
        keyword_id: keywordId,
        cluster_id: keyword.cluster_id,
        template_type: "long_form_blog",
        ...metadata,
        featured_image_prompt: imagePrompt,
        featured_image_url: `/generated/${imageFileName}`,
        faq_questions: faqs,
        cta_section: cta,
        main_sections: [
          { heading: `Understanding ${this.capitalizeWords(keyword.keyword)}`, outline: "Introduction and overview of key concepts" },
          { heading: "How It Works", outline: "Detailed methodology and investigative process" },
          { heading: "Warning Signs and Red Flags", outline: "Identification and prevention strategies" },
          { heading: "Investigation Process", outline: "Professional approach and evidence gathering" },
          { heading: "Recovery Options", outline: "Available solutions and next steps" }
        ],
        internal_links: [],
        target_word_count: 2000,
        estimated_reading_time: 10
      });

      results.push({
        template,
        imageGeneration: {
          prompt: imagePrompt,
          fileName: imageFileName,
          path: `public/generated/${imageFileName}`
        }
      });
    }

    return results;
  }
};