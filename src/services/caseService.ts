import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/database.types";

type CaseReview = Database["public"]["Tables"]["case_reviews"]["Insert"];
type CaseReviewRow = Database["public"]["Tables"]["case_reviews"]["Row"];

export const caseService = {
  /**
   * Submit a new case review
   */
  async submitCaseReview(data: Omit<CaseReview, "id" | "created_at" | "updated_at">) {
    const { data: caseReview, error } = await supabase
      .from("case_reviews")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return caseReview;
  },

  /**
   * Get all case reviews with optional filtering
   */
  async getCaseReviews(filters?: { status?: string; search?: string }) {
    let query = supabase
      .from("case_reviews")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%,country.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Get a single case review by ID
   */
  async getCaseReview(id: string) {
    const { data, error } = await supabase
      .from("case_reviews")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Update case review status
   */
  async updateCaseStatus(id: string, status: string, adminNotes?: string) {
    const updateData: Partial<CaseReviewRow> = { status: status as any };
    if (adminNotes !== undefined) {
      updateData.admin_notes = adminNotes;
    }

    const { data, error } = await supabase
      .from("case_reviews")
      .update(updateData)
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get case review statistics
   */
  async getCaseStats() {
    const { data: cases, error } = await supabase
      .from("case_reviews")
      .select("status, created_at");

    if (error) throw error;

    const stats = {
      total: cases?.length || 0,
      pending: cases?.filter(c => c.status === "pending").length || 0,
      active: cases?.filter(c => c.status === "active").length || 0,
      closed: cases?.filter(c => c.status === "closed").length || 0,
      today: cases?.filter(c => {
        const today = new Date();
        const caseDate = new Date(c.created_at);
        return caseDate.toDateString() === today.toDateString();
      }).length || 0,
    };

    return stats;
  },

  /**
   * Subscribe to real-time case review changes
   */
  subscribeToNewCases(callback: (payload: any) => void) {
    const channel = supabase
      .channel("case_reviews_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "case_reviews",
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },
};