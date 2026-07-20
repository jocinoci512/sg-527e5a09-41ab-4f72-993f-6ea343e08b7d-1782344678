/* eslint-disable @typescript-eslint/no-empty-object-type */
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      admin_activity_log: {
        Row: {
          action_description: string | null
          action_type: string
          admin_email: string
          created_at: string | null
          entity_id: string | null
          entity_type: string | null
          id: string
          ip_address: string | null
          metadata: Json | null
          user_agent: string | null
        }
        Insert: {
          action_description?: string | null
          action_type: string
          admin_email: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
        }
        Update: {
          action_description?: string | null
          action_type?: string
          admin_email?: string
          created_at?: string | null
          entity_id?: string | null
          entity_type?: string | null
          id?: string
          ip_address?: string | null
          metadata?: Json | null
          user_agent?: string | null
        }
        Relationships: []
      }
      blog_authors: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string | null
          email: string | null
          id: string
          linkedin_url: string | null
          name: string
          twitter_url: string | null
          website_url: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name: string
          twitter_url?: string | null
          website_url?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string | null
          email?: string | null
          id?: string
          linkedin_url?: string | null
          name?: string
          twitter_url?: string | null
          website_url?: string | null
        }
        Relationships: []
      }
      blog_categories: {
        Row: {
          created_at: string | null
          description: string | null
          display_order: number | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          display_order?: number | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      blog_post_tags: {
        Row: {
          post_id: string
          tag_id: string
        }
        Insert: {
          post_id: string
          tag_id: string
        }
        Update: {
          post_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "blog_post_tags_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_post_tags_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "blog_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_posts: {
        Row: {
          author_id: string | null
          category_id: string | null
          content: string
          created_at: string | null
          excerpt: string | null
          featured_image: string | null
          id: string
          keywords: string[] | null
          publish_date: string | null
          reading_time: number | null
          review_status: string | null
          scheduled_publish_at: string | null
          seo_description: string | null
          seo_title: string | null
          slug: string
          status: string | null
          title: string
          updated_at: string | null
          validation_errors: Json | null
          views: number | null
        }
        Insert: {
          author_id?: string | null
          category_id?: string | null
          content: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          keywords?: string[] | null
          publish_date?: string | null
          reading_time?: number | null
          review_status?: string | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug: string
          status?: string | null
          title: string
          updated_at?: string | null
          validation_errors?: Json | null
          views?: number | null
        }
        Update: {
          author_id?: string | null
          category_id?: string | null
          content?: string
          created_at?: string | null
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          keywords?: string[] | null
          publish_date?: string | null
          reading_time?: number | null
          review_status?: string | null
          scheduled_publish_at?: string | null
          seo_description?: string | null
          seo_title?: string | null
          slug?: string
          status?: string | null
          title?: string
          updated_at?: string | null
          validation_errors?: Json | null
          views?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "blog_posts_author_id_fkey"
            columns: ["author_id"]
            isOneToOne: false
            referencedRelation: "blog_authors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "blog_posts_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "blog_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      blog_tags: {
        Row: {
          created_at: string | null
          id: string
          name: string
          slug: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
          slug: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
          slug?: string
        }
        Relationships: []
      }
      case_reviews: {
        Row: {
          additional_notes: string | null
          admin_notes: string | null
          amount_lost: number | null
          assigned_to: string | null
          case_reference_id: string | null
          country: string
          created_at: string | null
          cryptocurrency_used: string | null
          currency: string | null
          email: string
          estimated_review_date: string | null
          exchange_used: string | null
          file_attachments: Json | null
          full_name: string
          id: string
          incident_date: string | null
          incident_description: string
          phone: string | null
          platform_involved: string | null
          preferred_contact_method: string | null
          priority: string | null
          scam_type: string
          scammer_name: string | null
          scammer_website: string | null
          status: string | null
          timeline_of_events: string | null
          transaction_hash: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          additional_notes?: string | null
          admin_notes?: string | null
          amount_lost?: number | null
          assigned_to?: string | null
          case_reference_id?: string | null
          country: string
          created_at?: string | null
          cryptocurrency_used?: string | null
          currency?: string | null
          email: string
          estimated_review_date?: string | null
          exchange_used?: string | null
          file_attachments?: Json | null
          full_name: string
          id?: string
          incident_date?: string | null
          incident_description: string
          phone?: string | null
          platform_involved?: string | null
          preferred_contact_method?: string | null
          priority?: string | null
          scam_type: string
          scammer_name?: string | null
          scammer_website?: string | null
          status?: string | null
          timeline_of_events?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          additional_notes?: string | null
          admin_notes?: string | null
          amount_lost?: number | null
          assigned_to?: string | null
          case_reference_id?: string | null
          country?: string
          created_at?: string | null
          cryptocurrency_used?: string | null
          currency?: string | null
          email?: string
          estimated_review_date?: string | null
          exchange_used?: string | null
          file_attachments?: Json | null
          full_name?: string
          id?: string
          incident_date?: string | null
          incident_description?: string
          phone?: string | null
          platform_involved?: string | null
          preferred_contact_method?: string | null
          priority?: string | null
          scam_type?: string
          scammer_name?: string | null
          scammer_website?: string | null
          status?: string | null
          timeline_of_events?: string | null
          transaction_hash?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "case_reviews_assigned_to_fkey"
            columns: ["assigned_to"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      competitor_rankings: {
        Row: {
          competitor_domain: string
          competitor_page_title: string | null
          competitor_position: number
          competitor_url: string | null
          content_score: number | null
          created_at: string | null
          estimated_domain_authority: number | null
          estimated_traffic_value: number | null
          id: string
          keyword_id: string | null
          ranking_date: string
          updated_at: string | null
        }
        Insert: {
          competitor_domain: string
          competitor_page_title?: string | null
          competitor_position: number
          competitor_url?: string | null
          content_score?: number | null
          created_at?: string | null
          estimated_domain_authority?: number | null
          estimated_traffic_value?: number | null
          id?: string
          keyword_id?: string | null
          ranking_date?: string
          updated_at?: string | null
        }
        Update: {
          competitor_domain?: string
          competitor_page_title?: string | null
          competitor_position?: number
          competitor_url?: string | null
          content_score?: number | null
          created_at?: string | null
          estimated_domain_authority?: number | null
          estimated_traffic_value?: number | null
          id?: string
          keyword_id?: string | null
          ranking_date?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "competitor_rankings_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      contact_leads: {
        Row: {
          created_at: string | null
          email: string
          full_name: string
          id: string
          message: string
          phone: string | null
          source: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          full_name: string
          id?: string
          message: string
          phone?: string | null
          source?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          full_name?: string
          id?: string
          message?: string
          phone?: string | null
          source?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      editable_content: {
        Row: {
          content: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          last_updated: string | null
          metadata: Json | null
          page_slug: string
          section_key: string
          section_type: string
        }
        Insert: {
          content: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          metadata?: Json | null
          page_slug: string
          section_key: string
          section_type: string
        }
        Update: {
          content?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          last_updated?: string | null
          metadata?: Json | null
          page_slug?: string
          section_key?: string
          section_type?: string
        }
        Relationships: []
      }
      email_notifications_log: {
        Row: {
          case_id: string | null
          created_at: string | null
          error_message: string | null
          id: string
          lead_id: string | null
          metadata: Json | null
          notification_type: string
          recipient_email: string
          sent_at: string | null
          status: string | null
          subject: string
          template_name: string | null
        }
        Insert: {
          case_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          notification_type: string
          recipient_email: string
          sent_at?: string | null
          status?: string | null
          subject: string
          template_name?: string | null
        }
        Update: {
          case_id?: string | null
          created_at?: string | null
          error_message?: string | null
          id?: string
          lead_id?: string | null
          metadata?: Json | null
          notification_type?: string
          recipient_email?: string
          sent_at?: string | null
          status?: string | null
          subject?: string
          template_name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "email_notifications_log_case_id_fkey"
            columns: ["case_id"]
            isOneToOne: false
            referencedRelation: "case_reviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "email_notifications_log_lead_id_fkey"
            columns: ["lead_id"]
            isOneToOne: false
            referencedRelation: "contact_leads"
            referencedColumns: ["id"]
          },
        ]
      }
      homepage_dashboard_metrics: {
        Row: {
          change: string
          color: string
          created_at: string | null
          display_order: number
          icon_name: string
          id: string
          is_enabled: boolean | null
          label: string
          updated_at: string | null
          value: number
        }
        Insert: {
          change: string
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name: string
          id?: string
          is_enabled?: boolean | null
          label: string
          updated_at?: string | null
          value: number
        }
        Update: {
          change?: string
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          is_enabled?: boolean | null
          label?: string
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      homepage_fraud_categories: {
        Row: {
          bg_color: string
          cases: number
          category: string
          color: string
          created_at: string | null
          display_order: number
          id: string
          is_enabled: boolean | null
          success_rate: number
          trend: string
          updated_at: string | null
        }
        Insert: {
          bg_color?: string
          cases: number
          category: string
          color?: string
          created_at?: string | null
          display_order?: number
          id?: string
          is_enabled?: boolean | null
          success_rate: number
          trend: string
          updated_at?: string | null
        }
        Update: {
          bg_color?: string
          cases?: number
          category?: string
          color?: string
          created_at?: string | null
          display_order?: number
          id?: string
          is_enabled?: boolean | null
          success_rate?: number
          trend?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage_global_regions: {
        Row: {
          countries: string
          created_at: string | null
          display_order: number
          id: string
          investigations: string
          is_enabled: boolean | null
          region: string
          support: string
          updated_at: string | null
        }
        Insert: {
          countries: string
          created_at?: string | null
          display_order?: number
          id?: string
          investigations: string
          is_enabled?: boolean | null
          region: string
          support?: string
          updated_at?: string | null
        }
        Update: {
          countries?: string
          created_at?: string | null
          display_order?: number
          id?: string
          investigations?: string
          is_enabled?: boolean | null
          region?: string
          support?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage_live_updates: {
        Row: {
          color: string
          created_at: string | null
          display_order: number
          icon_name: string
          id: string
          is_enabled: boolean | null
          location: string
          message: string
          time_ago: string
          type: string
          updated_at: string | null
        }
        Insert: {
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name: string
          id?: string
          is_enabled?: boolean | null
          location: string
          message: string
          time_ago: string
          type: string
          updated_at?: string | null
        }
        Update: {
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          is_enabled?: boolean | null
          location?: string
          message?: string
          time_ago?: string
          type?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage_statistics: {
        Row: {
          color: string
          created_at: string | null
          display_order: number
          icon_name: string
          id: string
          is_enabled: boolean | null
          label: string
          prefix: string | null
          suffix: string | null
          updated_at: string | null
          value: number
        }
        Insert: {
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name: string
          id?: string
          is_enabled?: boolean | null
          label: string
          prefix?: string | null
          suffix?: string | null
          updated_at?: string | null
          value: number
        }
        Update: {
          color?: string
          created_at?: string | null
          display_order?: number
          icon_name?: string
          id?: string
          is_enabled?: boolean | null
          label?: string
          prefix?: string | null
          suffix?: string | null
          updated_at?: string | null
          value?: number
        }
        Relationships: []
      }
      homepage_success_stories: {
        Row: {
          amount: string
          country: string
          created_at: string | null
          description: string
          display_order: number
          fraud_type: string
          id: string
          is_enabled: boolean | null
          outcome: string
          outcome_type: string
          timeline: string
          title: string
          updated_at: string | null
        }
        Insert: {
          amount: string
          country: string
          created_at?: string | null
          description: string
          display_order?: number
          fraud_type: string
          id?: string
          is_enabled?: boolean | null
          outcome: string
          outcome_type: string
          timeline: string
          title: string
          updated_at?: string | null
        }
        Update: {
          amount?: string
          country?: string
          created_at?: string | null
          description?: string
          display_order?: number
          fraud_type?: string
          id?: string
          is_enabled?: boolean | null
          outcome?: string
          outcome_type?: string
          timeline?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      homepage_testimonials: {
        Row: {
          amount: string
          created_at: string | null
          display_order: number
          fraud_type: string
          id: string
          is_enabled: boolean | null
          location: string
          name: string
          outcome: string
          rating: number
          role: string
          text: string
          updated_at: string | null
        }
        Insert: {
          amount: string
          created_at?: string | null
          display_order?: number
          fraud_type: string
          id?: string
          is_enabled?: boolean | null
          location: string
          name: string
          outcome: string
          rating?: number
          role: string
          text: string
          updated_at?: string | null
        }
        Update: {
          amount?: string
          created_at?: string | null
          display_order?: number
          fraud_type?: string
          id?: string
          is_enabled?: boolean | null
          location?: string
          name?: string
          outcome?: string
          rating?: number
          role?: string
          text?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      keyword_rankings: {
        Row: {
          click_through_rate: number | null
          created_at: string | null
          difficulty_level: string | null
          id: string
          keyword_difficulty: number | null
          keyword_id: string | null
          meta_description: string | null
          organic_click_estimate: number | null
          page_title: string | null
          position_change: number | null
          previous_position: number | null
          ranking_date: string
          ranking_position: number | null
          ranking_url: string | null
          search_volume: number | null
          seo_opportunity_score: number | null
          updated_at: string | null
        }
        Insert: {
          click_through_rate?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          keyword_difficulty?: number | null
          keyword_id?: string | null
          meta_description?: string | null
          organic_click_estimate?: number | null
          page_title?: string | null
          position_change?: number | null
          previous_position?: number | null
          ranking_date?: string
          ranking_position?: number | null
          ranking_url?: string | null
          search_volume?: number | null
          seo_opportunity_score?: number | null
          updated_at?: string | null
        }
        Update: {
          click_through_rate?: number | null
          created_at?: string | null
          difficulty_level?: string | null
          id?: string
          keyword_difficulty?: number | null
          keyword_id?: string | null
          meta_description?: string | null
          organic_click_estimate?: number | null
          page_title?: string | null
          position_change?: number | null
          previous_position?: number | null
          ranking_date?: string
          ranking_position?: number | null
          ranking_url?: string | null
          search_volume?: number | null
          seo_opportunity_score?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "keyword_rankings_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          admin_id: string | null
          created_at: string | null
          id: string
          is_read: boolean | null
          message: string
          reference_id: string | null
          reference_table: string | null
          title: string
          type: string
        }
        Insert: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message: string
          reference_id?: string | null
          reference_table?: string | null
          title: string
          type: string
        }
        Update: {
          admin_id?: string | null
          created_at?: string | null
          id?: string
          is_read?: boolean | null
          message?: string
          reference_id?: string | null
          reference_table?: string | null
          title?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_admin_id_fkey"
            columns: ["admin_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      page_seo: {
        Row: {
          canonical_url: string | null
          created_at: string | null
          id: string
          is_indexed: boolean | null
          keywords: string[] | null
          last_updated: string | null
          meta_description: string
          og_description: string | null
          og_image: string | null
          og_title: string | null
          page_slug: string
          page_title: string
          seo_title: string
          twitter_card: string | null
          twitter_description: string | null
          twitter_image: string | null
          twitter_title: string | null
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          is_indexed?: boolean | null
          keywords?: string[] | null
          last_updated?: string | null
          meta_description: string
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug: string
          page_title: string
          seo_title: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
        }
        Update: {
          canonical_url?: string | null
          created_at?: string | null
          id?: string
          is_indexed?: boolean | null
          keywords?: string[] | null
          last_updated?: string | null
          meta_description?: string
          og_description?: string | null
          og_image?: string | null
          og_title?: string | null
          page_slug?: string
          page_title?: string
          seo_title?: string
          twitter_card?: string | null
          twitter_description?: string | null
          twitter_image?: string | null
          twitter_title?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string | null
          email: string | null
          full_name: string | null
          id: string
          updated_at: string | null
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string | null
        }
        Update: {
          avatar_url?: string | null
          created_at?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reports: {
        Row: {
          created_at: string | null
          date_range_end: string
          date_range_start: string
          file_path: string | null
          file_size: number | null
          generated_by: string | null
          id: string
          metrics: Json | null
          report_type: string
          title: string
        }
        Insert: {
          created_at?: string | null
          date_range_end: string
          date_range_start: string
          file_path?: string | null
          file_size?: number | null
          generated_by?: string | null
          id?: string
          metrics?: Json | null
          report_type?: string
          title: string
        }
        Update: {
          created_at?: string | null
          date_range_end?: string
          date_range_start?: string
          file_path?: string | null
          file_size?: number | null
          generated_by?: string | null
          id?: string
          metrics?: Json | null
          report_type?: string
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_generated_by_fkey"
            columns: ["generated_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_content_analytics: {
        Row: {
          avg_time_on_page: number | null
          backlinks_count: number | null
          blog_post_id: string | null
          bounce_rate: number | null
          conversions_count: number | null
          created_at: string | null
          featured_snippet: boolean | null
          google_ranking: number | null
          id: string
          keyword_id: string | null
          last_updated: string | null
          organic_views: number | null
          shares_count: number | null
        }
        Insert: {
          avg_time_on_page?: number | null
          backlinks_count?: number | null
          blog_post_id?: string | null
          bounce_rate?: number | null
          conversions_count?: number | null
          created_at?: string | null
          featured_snippet?: boolean | null
          google_ranking?: number | null
          id?: string
          keyword_id?: string | null
          last_updated?: string | null
          organic_views?: number | null
          shares_count?: number | null
        }
        Update: {
          avg_time_on_page?: number | null
          backlinks_count?: number | null
          blog_post_id?: string | null
          bounce_rate?: number | null
          conversions_count?: number | null
          created_at?: string | null
          featured_snippet?: boolean | null
          google_ranking?: number | null
          id?: string
          keyword_id?: string | null
          last_updated?: string | null
          organic_views?: number | null
          shares_count?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_content_analytics_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_content_analytics_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_content_templates: {
        Row: {
          blog_post_id: string | null
          canonical_url: string | null
          cluster_id: string | null
          content_quality_notes: string | null
          created_at: string | null
          cta_section: Json | null
          eeat_score: number | null
          estimated_reading_time: number | null
          faq_questions: Json | null
          featured_image_prompt: string | null
          featured_image_url: string | null
          headline: string
          id: string
          introduction: string | null
          keyword_id: string | null
          main_sections: Json | null
          meta_description: string | null
          meta_title: string | null
          og_description: string | null
          og_image_prompt: string | null
          og_title: string | null
          published_at: string | null
          related_keywords: string[] | null
          seo_title: string
          status: string | null
          subheadline: string | null
          suggested_internal_links: Json | null
          target_word_count: number | null
          template_type: string
          updated_at: string | null
          url_slug: string
        }
        Insert: {
          blog_post_id?: string | null
          canonical_url?: string | null
          cluster_id?: string | null
          content_quality_notes?: string | null
          created_at?: string | null
          cta_section?: Json | null
          eeat_score?: number | null
          estimated_reading_time?: number | null
          faq_questions?: Json | null
          featured_image_prompt?: string | null
          featured_image_url?: string | null
          headline: string
          id?: string
          introduction?: string | null
          keyword_id?: string | null
          main_sections?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image_prompt?: string | null
          og_title?: string | null
          published_at?: string | null
          related_keywords?: string[] | null
          seo_title: string
          status?: string | null
          subheadline?: string | null
          suggested_internal_links?: Json | null
          target_word_count?: number | null
          template_type: string
          updated_at?: string | null
          url_slug: string
        }
        Update: {
          blog_post_id?: string | null
          canonical_url?: string | null
          cluster_id?: string | null
          content_quality_notes?: string | null
          created_at?: string | null
          cta_section?: Json | null
          eeat_score?: number | null
          estimated_reading_time?: number | null
          faq_questions?: Json | null
          featured_image_prompt?: string | null
          featured_image_url?: string | null
          headline?: string
          id?: string
          introduction?: string | null
          keyword_id?: string | null
          main_sections?: Json | null
          meta_description?: string | null
          meta_title?: string | null
          og_description?: string | null
          og_image_prompt?: string | null
          og_title?: string | null
          published_at?: string | null
          related_keywords?: string[] | null
          seo_title?: string
          status?: string | null
          subheadline?: string | null
          suggested_internal_links?: Json | null
          target_word_count?: number | null
          template_type?: string
          updated_at?: string | null
          url_slug?: string
        }
        Relationships: [
          {
            foreignKeyName: "seo_content_templates_blog_post_id_fkey"
            columns: ["blog_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_content_templates_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "seo_topic_clusters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_content_templates_keyword_id_fkey"
            columns: ["keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_internal_links: {
        Row: {
          anchor_text: string
          created_at: string | null
          id: string
          link_strength: string | null
          source_post_id: string | null
          target_post_id: string | null
        }
        Insert: {
          anchor_text: string
          created_at?: string | null
          id?: string
          link_strength?: string | null
          source_post_id?: string | null
          target_post_id?: string | null
        }
        Update: {
          anchor_text?: string
          created_at?: string | null
          id?: string
          link_strength?: string | null
          source_post_id?: string | null
          target_post_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_internal_links_source_post_id_fkey"
            columns: ["source_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "seo_internal_links_target_post_id_fkey"
            columns: ["target_post_id"]
            isOneToOne: false
            referencedRelation: "blog_posts"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_keywords: {
        Row: {
          cluster_id: string | null
          competition_level: string | null
          content_status: string | null
          created_at: string | null
          current_ranking: number | null
          id: string
          keyword: string
          keyword_type: string
          notes: string | null
          priority: number | null
          search_volume: number | null
          target_page: string | null
          updated_at: string | null
        }
        Insert: {
          cluster_id?: string | null
          competition_level?: string | null
          content_status?: string | null
          created_at?: string | null
          current_ranking?: number | null
          id?: string
          keyword: string
          keyword_type: string
          notes?: string | null
          priority?: number | null
          search_volume?: number | null
          target_page?: string | null
          updated_at?: string | null
        }
        Update: {
          cluster_id?: string | null
          competition_level?: string | null
          content_status?: string | null
          created_at?: string | null
          current_ranking?: number | null
          id?: string
          keyword?: string
          keyword_type?: string
          notes?: string | null
          priority?: number | null
          search_volume?: number | null
          target_page?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_keywords_cluster_id_fkey"
            columns: ["cluster_id"]
            isOneToOne: false
            referencedRelation: "seo_topic_clusters"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_recommendations: {
        Row: {
          action_items: Json | null
          created_at: string | null
          description: string | null
          effort_score: number | null
          id: string
          impact_score: number | null
          priority: string | null
          recommendation_type: string | null
          related_keyword_id: string | null
          related_url: string | null
          status: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          action_items?: Json | null
          created_at?: string | null
          description?: string | null
          effort_score?: number | null
          id?: string
          impact_score?: number | null
          priority?: string | null
          recommendation_type?: string | null
          related_keyword_id?: string | null
          related_url?: string | null
          status?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          action_items?: Json | null
          created_at?: string | null
          description?: string | null
          effort_score?: number | null
          id?: string
          impact_score?: number | null
          priority?: string | null
          recommendation_type?: string | null
          related_keyword_id?: string | null
          related_url?: string | null
          status?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "seo_recommendations_related_keyword_id_fkey"
            columns: ["related_keyword_id"]
            isOneToOne: false
            referencedRelation: "seo_keywords"
            referencedColumns: ["id"]
          },
        ]
      }
      seo_topic_clusters: {
        Row: {
          cluster_name: string
          content_type: string | null
          created_at: string | null
          description: string | null
          id: string
          internal_links_count: number | null
          pillar_keyword: string
          priority: number | null
          published_articles_count: number | null
          target_audience: string | null
          updated_at: string | null
        }
        Insert: {
          cluster_name: string
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          internal_links_count?: number | null
          pillar_keyword: string
          priority?: number | null
          published_articles_count?: number | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Update: {
          cluster_name?: string
          content_type?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          internal_links_count?: number | null
          pillar_keyword?: string
          priority?: number | null
          published_articles_count?: number | null
          target_audience?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      seo_weekly_reports: {
        Row: {
          best_performing_articles: Json | null
          competitor_movements: Json | null
          created_at: string | null
          email_sent: boolean | null
          email_sent_at: string | null
          id: string
          keywords_gained: number | null
          keywords_lost: number | null
          monthly_traffic_growth: number | null
          pdf_report_url: string | null
          recommendations: Json | null
          report_date: string
          top_landing_pages: Json | null
          top_ranking_keywords: Json | null
          total_organic_traffic: number | null
          week_end_date: string
          week_start_date: string
          weekly_traffic_growth: number | null
        }
        Insert: {
          best_performing_articles?: Json | null
          competitor_movements?: Json | null
          created_at?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          keywords_gained?: number | null
          keywords_lost?: number | null
          monthly_traffic_growth?: number | null
          pdf_report_url?: string | null
          recommendations?: Json | null
          report_date?: string
          top_landing_pages?: Json | null
          top_ranking_keywords?: Json | null
          total_organic_traffic?: number | null
          week_end_date: string
          week_start_date: string
          weekly_traffic_growth?: number | null
        }
        Update: {
          best_performing_articles?: Json | null
          competitor_movements?: Json | null
          created_at?: string | null
          email_sent?: boolean | null
          email_sent_at?: string | null
          id?: string
          keywords_gained?: number | null
          keywords_lost?: number | null
          monthly_traffic_growth?: number | null
          pdf_report_url?: string | null
          recommendations?: Json | null
          report_date?: string
          top_landing_pages?: Json | null
          top_ranking_keywords?: Json | null
          total_organic_traffic?: number | null
          week_end_date?: string
          week_start_date?: string
          weekly_traffic_growth?: number | null
        }
        Relationships: []
      }
      video_library: {
        Row: {
          category: string | null
          created_at: string | null
          description: string | null
          duration: number | null
          embed_url: string
          id: string
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string | null
          upload_date: string | null
          views: number | null
          vimeo_video_id: string
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          embed_url: string
          id?: string
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string | null
          upload_date?: string | null
          views?: number | null
          vimeo_video_id: string
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string | null
          duration?: number | null
          embed_url?: string
          id?: string
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string | null
          upload_date?: string | null
          views?: number | null
          vimeo_video_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      calculate_reading_time: { Args: { word_count: number }; Returns: number }
      generate_case_reference_id: { Args: never; Returns: string }
      generate_seo_slug: { Args: { title: string }; Returns: string }
      increment_post_views: { Args: { post_id: string }; Returns: undefined }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
