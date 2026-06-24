import { supabase } from "@/integrations/supabase/client";

export const seoAnalyticsService = {
  // ============================================
  // KEYWORD RANKINGS
  // ============================================

  async getKeywordRankings(filters?: { keyword_id?: string; date_range?: string }) {
    let query = supabase
      .from("keyword_rankings")
      .select(`
        *,
        keyword:seo_keywords(*)
      `)
      .order("ranking_date", { ascending: false });

    if (filters?.keyword_id) {
      query = query.eq("keyword_id", filters.keyword_id);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createKeywordRanking(rankingData: any) {
    const { data, error } = await supabase
      .from("keyword_rankings")
      .insert(rankingData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateKeywordRanking(id: string, rankingData: any) {
    const { data, error } = await supabase
      .from("keyword_rankings")
      .update({ ...rankingData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getRankingHistory(keywordId: string, days: number = 30) {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);

    const { data, error } = await supabase
      .from("keyword_rankings")
      .select("*")
      .eq("keyword_id", keywordId)
      .gte("ranking_date", startDate.toISOString().split("T")[0])
      .order("ranking_date", { ascending: true });

    if (error) throw error;
    return data || [];
  },

  // ============================================
  // COMPETITOR ANALYSIS
  // ============================================

  async getCompetitorRankings(keywordId: string) {
    const { data, error } = await supabase
      .from("competitor_rankings")
      .select("*")
      .eq("keyword_id", keywordId)
      .order("competitor_position", { ascending: true })
      .limit(10);

    if (error) throw error;
    return data || [];
  },

  async createCompetitorRanking(competitorData: any) {
    const { data, error } = await supabase
      .from("competitor_rankings")
      .insert(competitorData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async getCompetitorComparison(keywordId: string) {
    const [cipherTraceRanking, competitors] = await Promise.all([
      this.getKeywordRankings({ keyword_id: keywordId }),
      this.getCompetitorRankings(keywordId)
    ]);

    const cipherPosition = cipherTraceRanking[0]?.ranking_position || null;

    return {
      cipher_trace_position: cipherPosition,
      competitors: competitors.map((comp: any) => ({
        ...comp,
        ranking_gap: cipherPosition ? comp.competitor_position - cipherPosition : null,
        opportunity: cipherPosition && comp.competitor_position < cipherPosition ? "Improvement Opportunity" : "Maintaining Position"
      }))
    };
  },

  // ============================================
  // SEO RECOMMENDATIONS
  // ============================================

  async getRecommendations(filters?: { status?: string; type?: string; priority?: string }) {
    let query = supabase
      .from("seo_recommendations")
      .select(`
        *,
        keyword:seo_keywords(*)
      `)
      .order("priority", { ascending: false })
      .order("created_at", { ascending: false });

    if (filters?.status) query = query.eq("status", filters.status);
    if (filters?.type) query = query.eq("recommendation_type", filters.type);
    if (filters?.priority) query = query.eq("priority", filters.priority);

    const { data, error } = await query;
    if (error) throw error;
    return data || [];
  },

  async createRecommendation(recommendationData: any) {
    const { data, error } = await supabase
      .from("seo_recommendations")
      .insert(recommendationData)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async updateRecommendation(id: string, updates: any) {
    const { data, error } = await supabase
      .from("seo_recommendations")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single();
    if (error) throw error;
    return data;
  },

  async generateRecommendations() {
    // This would analyze current SEO data and generate recommendations
    // Placeholder for AI-driven recommendation engine
    const recommendations = [];

    // Example: Keyword opportunity recommendations
    const { data: keywords } = await supabase
      .from("seo_keywords")
      .select("*, rankings:keyword_rankings(*)")
      .eq("content_status", "pending")
      .order("priority", { ascending: false })
      .limit(10);

    if (keywords) {
      for (const keyword of keywords) {
        recommendations.push({
          recommendation_type: "keyword_target",
          priority: "high",
          title: `Target "${keyword.keyword}" keyword`,
          description: `High-priority keyword with ${keyword.search_volume || 0} monthly searches and no current content`,
          action_items: [
            "Create comprehensive blog article",
            "Optimize meta tags",
            "Build internal links"
          ],
          related_keyword_id: keyword.id,
          impact_score: 85,
          effort_score: 60,
          status: "pending"
        });
      }
    }

    // Bulk insert recommendations
    for (const rec of recommendations) {
      await this.createRecommendation(rec);
    }

    return recommendations;
  },

  // ============================================
  // WEEKLY REPORTS
  // ============================================

  async getWeeklyReports(limit: number = 10) {
    const { data, error } = await supabase
      .from("seo_weekly_reports")
      .select("*")
      .order("report_date", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  },

  async generateWeeklyReport() {
    const today = new Date();
    const weekStart = new Date(today);
    weekStart.setDate(today.getDate() - 7);
    const weekEnd = new Date(today);

    // Aggregate data for the week
    const [rankings, recommendations, blogPosts] = await Promise.all([
      this.getKeywordRankings(),
      this.getRecommendations({ status: "pending" }),
      supabase.from("blog_posts").select("*").eq("status", "published")
    ]);

    const report = {
      report_date: today.toISOString().split("T")[0],
      week_start_date: weekStart.toISOString().split("T")[0],
      week_end_date: weekEnd.toISOString().split("T")[0],
      total_organic_traffic: 0, // Placeholder for GSC integration
      weekly_traffic_growth: 0,
      monthly_traffic_growth: 0,
      keywords_gained: rankings?.filter((r: any) => r.position_change && r.position_change > 0).length || 0,
      keywords_lost: rankings?.filter((r: any) => r.position_change && r.position_change < 0).length || 0,
      top_ranking_keywords: rankings?.slice(0, 10).map((r: any) => ({
        keyword: r.keyword?.keyword,
        position: r.ranking_position,
        change: r.position_change
      })) || [],
      top_landing_pages: blogPosts?.data?.slice(0, 10).map((p: any) => ({
        title: p.title,
        slug: p.slug,
        views: p.views || 0
      })) || [],
      competitor_movements: [],
      best_performing_articles: blogPosts?.data?.sort((a: any, b: any) => (b.views || 0) - (a.views || 0)).slice(0, 5) || [],
      recommendations: recommendations?.slice(0, 10) || [],
      email_sent: false
    };

    const { data, error } = await supabase
      .from("seo_weekly_reports")
      .insert(report)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async markReportSent(reportId: string) {
    const { data, error } = await supabase
      .from("seo_weekly_reports")
      .update({
        email_sent: true,
        email_sent_at: new Date().toISOString()
      })
      .eq("id", reportId)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  // ============================================
  // ADMIN ACTIVITY LOG
  // ============================================

  async logActivity(activityData: {
    admin_email: string;
    action_type: string;
    action_description?: string;
    entity_type?: string;
    entity_id?: string;
  }) {
    const { data, error } = await supabase
      .from("admin_activity_log")
      .insert({
        admin_email: activityData.admin_email,
        action_type: activityData.action_type,
        action_description: activityData.action_description || null,
        entity_type: activityData.entity_type || null,
        entity_id: activityData.entity_id || null,
        metadata: null,
        ip_address: null,
        user_agent: null
      } as any)
      .select()
      .single();

    if (error) console.error("Error logging activity:", error);
    return data;
  },

  async getActivityLog(limit: number = 50) {
    const { data, error } = await supabase
      .from("admin_activity_log")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }
};