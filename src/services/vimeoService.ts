import { supabase } from "@/integrations/supabase/client";

export const vimeoService = {
  // ============================================
  // VIDEO LIBRARY MANAGEMENT
  // ============================================

  async addVideo(videoData: {
    vimeo_video_id: string;
    title: string;
    description?: string;
    thumbnail_url?: string;
    embed_url: string;
    duration?: number;
    category?: string;
    tags?: string[];
  }) {
    const { data, error } = await supabase
      .from("video_library")
      .insert({
        vimeo_video_id: videoData.vimeo_video_id,
        title: videoData.title,
        description: videoData.description,
        thumbnail_url: videoData.thumbnail_url,
        embed_url: videoData.embed_url,
        duration: videoData.duration,
        category: videoData.category,
        tags: videoData.tags,
        status: "active"
      } as any)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getVideos(filters?: {
    category?: string;
    status?: string;
    limit?: number;
  }) {
    let query = supabase
      .from("video_library")
      .select("*")
      .order("upload_date", { ascending: false });

    if (filters?.category) {
      query = query.eq("category", filters.category);
    }

    if (filters?.status) {
      query = query.eq("status", filters.status);
    }

    if (filters?.limit) {
      query = query.limit(filters.limit);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async updateVideo(videoId: string, updates: {
    title?: string;
    description?: string;
    category?: string;
    tags?: string[];
    status?: string;
  }) {
    const { data, error } = await supabase
      .from("video_library")
      .update({
        ...updates,
        updated_at: new Date().toISOString()
      } as any)
      .eq("id", videoId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async deleteVideo(videoId: string) {
    const { error } = await supabase
      .from("video_library")
      .delete()
      .eq("id", videoId);

    if (error) throw error;
    return true;
  },

  async incrementViews(videoId: string) {
    const { data: video } = await supabase
      .from("video_library")
      .select("views")
      .eq("id", videoId)
      .single();

    if (video) {
      await supabase
        .from("video_library")
        .update({ views: (video.views || 0) + 1 } as any)
        .eq("id", videoId);
    }
  },

  // ============================================
  // VIMEO API HELPERS
  // ============================================

  extractVimeoIdFromUrl(url: string): string | null {
    const patterns = [
      /vimeo\.com\/(\d+)/,
      /vimeo\.com\/video\/(\d+)/,
      /player\.vimeo\.com\/video\/(\d+)/
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }

    return null;
  },

  generateEmbedUrl(vimeoId: string): string {
    return `https://player.vimeo.com/video/${vimeoId}`;
  },

  generateThumbnailUrl(vimeoId: string): string {
    return `https://i.vimeocdn.com/video/${vimeoId}_640x360.jpg`;
  }
};