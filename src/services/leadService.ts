import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/database.types";

type ContactLead = Database["public"]["Tables"]["contact_leads"]["Insert"];

export const leadService = {
  /**
   * Submit a new contact lead
   */
  async submitContactLead(data: Omit<ContactLead, "id" | "created_at">) {
    const { data: lead, error } = await supabase
      .from("contact_leads")
      .insert([data])
      .select()
      .single();

    if (error) throw error;
    return lead;
  },

  /**
   * Get all contact leads with optional filtering
   */
  async getContactLeads(filters?: { status?: string; search?: string }) {
    let query = supabase
      .from("contact_leads")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.status && filters.status !== "all") {
      query = query.eq("status", filters.status);
    }

    if (filters?.search) {
      query = query.or(`full_name.ilike.%${filters.search}%,email.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Update lead status
   */
  async updateLeadStatus(id: string, status: string) {
    const { data, error } = await supabase
      .from("contact_leads")
      .update({ status: status as any })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Get lead statistics
   */
  async getLeadStats() {
    const { data: leads, error } = await supabase
      .from("contact_leads")
      .select("status, created_at");

    if (error) throw error;

    const stats = {
      total: leads?.length || 0,
      new: leads?.filter(l => l.status === "new").length || 0,
      contacted: leads?.filter(l => l.status === "contacted").length || 0,
      qualified: leads?.filter(l => l.status === "qualified").length || 0,
      today: leads?.filter(l => {
        const today = new Date();
        const leadDate = new Date(l.created_at);
        return leadDate.toDateString() === today.toDateString();
      }).length || 0,
    };

    return stats;
  },
};