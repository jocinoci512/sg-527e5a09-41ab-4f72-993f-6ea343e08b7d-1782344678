import { supabase } from "@/integrations/supabase/client";

export const contentService = {
  // Get all content for a specific page
  async getPageContent(pageSlug: string) {
    const { data, error } = await supabase
      .from("editable_content")
      .select("*")
      .eq("page_slug", pageSlug)
      .eq("is_active", true)
      .order("display_order");
    if (error) throw error;
    return data;
  },

  // Get specific content section
  async getContentSection(pageSlug: string, sectionKey: string) {
    const { data, error } = await supabase
      .from("editable_content")
      .select("*")
      .eq("page_slug", pageSlug)
      .eq("section_key", sectionKey)
      .eq("is_active", true)
      .single();
    if (error) throw error;
    return data;
  },

  // Get all editable content
  async getAllContent() {
    const { data, error } = await supabase
      .from("editable_content")
      .select("*")
      .order("page_slug", { ascending: true })
      .order("display_order", { ascending: true });
    if (error) throw error;
    return data;
  },

  // Update content section
  async updateContent(id: string, updates: any) {
    const { data, error } = await supabase
      .from("editable_content")
      .update({ ...updates, last_updated: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Create new content section
  async createContent(content: any) {
    const { data, error } = await supabase
      .from("editable_content")
      .insert(content)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Delete content section
  async deleteContent(id: string) {
    const { error } = await supabase
      .from("editable_content")
      .delete()
      .eq("id", id);
    if (error) throw error;
  }
};