import { supabase } from "@/integrations/supabase/client";

export const blogService = {
  // Categories
  async getCategories() {
    const { data, error } = await supabase
      .from("blog_categories")
      .select("*")
      .order("display_order");
    if (error) throw error;
    return data;
  },

  async createCategory(category: any) {
    const { data, error } = await supabase
      .from("blog_categories")
      .insert(category)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Authors
  async getAuthors() {
    const { data, error } = await supabase
      .from("blog_authors")
      .select("*");
    if (error) throw error;
    return data;
  },

  // Posts
  async getPosts(filters?: { status?: string; category?: string; search?: string }) {
    let query = supabase
      .from("blog_posts")
      .select(`
        *,
        author:blog_authors(*),
        category:blog_categories(*)
      `)
      .order("created_at", { ascending: false });

    if (filters?.status && filters.status !== 'all') {
      query = query.eq("status", filters.status);
    }

    if (filters?.category && filters.category !== 'all') {
      query = query.eq("category_id", filters.category);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,content.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data;
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select(`
        *,
        author:blog_authors(*),
        category:blog_categories(*)
      `)
      .eq("slug", slug)
      .single();
    if (error) throw error;
    return data;
  },

  async createPost(post: any) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(post)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updatePost(id: string, updates: any) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from("blog_posts")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  async incrementViews(id: string) {
    const { error } = await supabase.rpc("increment_post_views", { post_id: id });
    if (error) console.error("Error incrementing views:", error);
  }
};