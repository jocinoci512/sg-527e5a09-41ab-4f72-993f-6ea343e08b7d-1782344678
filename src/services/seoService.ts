import { supabase } from "@/integrations/supabase/client";

export const seoService = {
  // Get SEO data for a specific page
  async getPageSEO(pageSlug: string) {
    const { data, error } = await supabase
      .from("page_seo")
      .select("*")
      .eq("page_slug", pageSlug)
      .single();
    if (error) throw error;
    return data;
  },

  // Get all page SEO records
  async getAllPageSEO() {
    const { data, error } = await supabase
      .from("page_seo")
      .select("*")
      .order("page_slug");
    if (error) throw error;
    return data;
  },

  // Update page SEO
  async updatePageSEO(pageSlug: string, updates: any) {
    const { data, error } = await supabase
      .from("page_seo")
      .update({ ...updates, last_updated: new Date().toISOString() })
      .eq("page_slug", pageSlug)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Create new page SEO
  async createPageSEO(seoData: any) {
    const { data, error } = await supabase
      .from("page_seo")
      .insert(seoData)
      .select()
      .single();
    if (error) throw error;
    return data;
  }
};