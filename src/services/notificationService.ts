import { createClient } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/database.types";

type Notification = Database["public"]["Tables"]["notifications"]["Row"];

export const notificationService = {
  /**
   * Get all notifications for the current admin
   */
  async getNotifications(filters?: { type?: string; isRead?: boolean }) {
    const supabase = createClient();
    
    let query = supabase
      .from("notifications")
      .select("*")
      .order("created_at", { ascending: false });

    if (filters?.type && filters.type !== "all") {
      query = query.eq("type", filters.type);
    }

    if (filters?.isRead !== undefined) {
      query = query.eq("is_read", filters.isRead);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  },

  /**
   * Mark notification as read
   */
  async markAsRead(id: string) {
    const supabase = createClient();
    
    const { data, error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("id", id)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  /**
   * Mark all notifications as read
   */
  async markAllAsRead() {
    const supabase = createClient();
    
    const { error } = await supabase
      .from("notifications")
      .update({ is_read: true })
      .eq("is_read", false);

    if (error) throw error;
  },

  /**
   * Get unread notification count
   */
  async getUnreadCount() {
    const supabase = createClient();
    
    const { count, error } = await supabase
      .from("notifications")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    if (error) throw error;
    return count || 0;
  },

  /**
   * Subscribe to real-time notifications
   */
  subscribeToNotifications(callback: (payload: any) => void) {
    const supabase = createClient();
    
    const channel = supabase
      .channel("notifications_changes")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "notifications",
        },
        callback
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  },

  /**
   * Delete notification
   */
  async deleteNotification(id: string) {
    const supabase = createClient();
    
    const { error } = await supabase
      .from("notifications")
      .delete()
      .eq("id", id);

    if (error) throw error;
  },
};