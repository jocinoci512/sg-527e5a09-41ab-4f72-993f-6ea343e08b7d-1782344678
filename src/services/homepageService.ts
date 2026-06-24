import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/database.types";

type HomepageStatistic = Database["public"]["Tables"]["homepage_statistics"]["Row"];
type HomepageLiveUpdate = Database["public"]["Tables"]["homepage_live_updates"]["Row"];
type HomepageGlobalRegion = Database["public"]["Tables"]["homepage_global_regions"]["Row"];
type HomepageFraudCategory = Database["public"]["Tables"]["homepage_fraud_categories"]["Row"];
type HomepageSuccessStory = Database["public"]["Tables"]["homepage_success_stories"]["Row"];
type HomepageTestimonial = Database["public"]["Tables"]["homepage_testimonials"]["Row"];
type HomepageDashboardMetric = Database["public"]["Tables"]["homepage_dashboard_metrics"]["Row"];

export const homepageService = {
  // Statistics
  async getStatistics() {
    const { data, error } = await supabase
      .from("homepage_statistics")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async updateStatistic(id: string, updates: Partial<HomepageStatistic>) {
    const { data, error } = await supabase
      .from("homepage_statistics")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Live Updates
  async getLiveUpdates() {
    const { data, error } = await supabase
      .from("homepage_live_updates")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async createLiveUpdate(update: Omit<HomepageLiveUpdate, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("homepage_live_updates")
      .insert([update])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateLiveUpdate(id: string, updates: Partial<HomepageLiveUpdate>) {
    const { data, error } = await supabase
      .from("homepage_live_updates")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteLiveUpdate(id: string) {
    const { error } = await supabase
      .from("homepage_live_updates")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // Global Regions
  async getGlobalRegions() {
    const { data, error } = await supabase
      .from("homepage_global_regions")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async updateGlobalRegion(id: string, updates: Partial<HomepageGlobalRegion>) {
    const { data, error } = await supabase
      .from("homepage_global_regions")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Fraud Categories
  async getFraudCategories() {
    const { data, error } = await supabase
      .from("homepage_fraud_categories")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async updateFraudCategory(id: string, updates: Partial<HomepageFraudCategory>) {
    const { data, error } = await supabase
      .from("homepage_fraud_categories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  // Success Stories
  async getSuccessStories() {
    const { data, error } = await supabase
      .from("homepage_success_stories")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async createSuccessStory(story: Omit<HomepageSuccessStory, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("homepage_success_stories")
      .insert([story])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateSuccessStory(id: string, updates: Partial<HomepageSuccessStory>) {
    const { data, error } = await supabase
      .from("homepage_success_stories")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteSuccessStory(id: string) {
    const { error } = await supabase
      .from("homepage_success_stories")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // Testimonials
  async getTestimonials() {
    const { data, error } = await supabase
      .from("homepage_testimonials")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async createTestimonial(testimonial: Omit<HomepageTestimonial, "id" | "created_at" | "updated_at">) {
    const { data, error } = await supabase
      .from("homepage_testimonials")
      .insert([testimonial])
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateTestimonial(id: string, updates: Partial<HomepageTestimonial>) {
    const { data, error } = await supabase
      .from("homepage_testimonials")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async deleteTestimonial(id: string) {
    const { error } = await supabase
      .from("homepage_testimonials")
      .delete()
      .eq("id", id);
    if (error) throw error;
  },

  // Dashboard Metrics
  async getDashboardMetrics() {
    const { data, error } = await supabase
      .from("homepage_dashboard_metrics")
      .select("*")
      .eq("is_enabled", true)
      .order("display_order");
    if (error) throw error;
    return data || [];
  },

  async updateDashboardMetric(id: string, updates: Partial<HomepageDashboardMetric>) {
    const { data, error } = await supabase
      .from("homepage_dashboard_metrics")
      .update(updates)
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },
};