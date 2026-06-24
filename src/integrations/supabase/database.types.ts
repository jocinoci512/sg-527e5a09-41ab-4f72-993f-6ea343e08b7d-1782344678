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
      case_reviews: {
        Row: {
          admin_notes: string | null
          amount_lost: number | null
          country: string
          created_at: string | null
          cryptocurrency_used: string | null
          email: string
          file_attachments: Json | null
          full_name: string
          id: string
          incident_description: string
          phone: string | null
          priority: string | null
          scam_type: string
          scammer_website: string | null
          status: string | null
          updated_at: string | null
          wallet_address: string | null
        }
        Insert: {
          admin_notes?: string | null
          amount_lost?: number | null
          country: string
          created_at?: string | null
          cryptocurrency_used?: string | null
          email: string
          file_attachments?: Json | null
          full_name: string
          id?: string
          incident_description: string
          phone?: string | null
          priority?: string | null
          scam_type: string
          scammer_website?: string | null
          status?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Update: {
          admin_notes?: string | null
          amount_lost?: number | null
          country?: string
          created_at?: string | null
          cryptocurrency_used?: string | null
          email?: string
          file_attachments?: Json | null
          full_name?: string
          id?: string
          incident_description?: string
          phone?: string | null
          priority?: string | null
          scam_type?: string
          scammer_website?: string | null
          status?: string | null
          updated_at?: string | null
          wallet_address?: string | null
        }
        Relationships: []
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
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
