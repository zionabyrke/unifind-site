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
      addresses: {
        Row: {
          address_line1: string
          address_line2: string | null
          city: string
          id: string
          postal_code: string | null
          street_number: string | null
        }
        Insert: {
          address_line1: string
          address_line2?: string | null
          city: string
          id?: string
          postal_code?: string | null
          street_number?: string | null
        }
        Update: {
          address_line1?: string
          address_line2?: string | null
          city?: string
          id?: string
          postal_code?: string | null
          street_number?: string | null
        }
        Relationships: []
      }
      categories: {
        Row: {
          id: string
          name: string
          parent_category_id: string | null
        }
        Insert: {
          id?: string
          name: string
          parent_category_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          parent_category_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "categories_parent_category_id_fkey"
            columns: ["parent_category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      conversations: {
        Row: {
          created_at: string
          id: string
          listing_id: string | null
          user_a_id: string
          user_b_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          listing_id?: string | null
          user_a_id: string
          user_b_id: string
        }
        Update: {
          created_at?: string
          id?: string
          listing_id?: string | null
          user_a_id?: string
          user_b_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "conversations_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_a_id_fkey"
            columns: ["user_a_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "conversations_user_b_id_fkey"
            columns: ["user_b_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_configurations: {
        Row: {
          listing_item_id: string
          variation_option_id: string
        }
        Insert: {
          listing_item_id: string
          variation_option_id: string
        }
        Update: {
          listing_item_id?: string
          variation_option_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_configurations_listing_item_id_fkey"
            columns: ["listing_item_id"]
            isOneToOne: false
            referencedRelation: "listing_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listing_configurations_variation_option_id_fkey"
            columns: ["variation_option_id"]
            isOneToOne: false
            referencedRelation: "variation_options"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_images: {
        Row: {
          id: string
          listing_item_id: string
          sort_order: number
          url: string
        }
        Insert: {
          id?: string
          listing_item_id: string
          sort_order?: number
          url: string
        }
        Update: {
          id?: string
          listing_item_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "listing_images_listing_item_id_fkey"
            columns: ["listing_item_id"]
            isOneToOne: false
            referencedRelation: "listing_items"
            referencedColumns: ["id"]
          },
        ]
      }
      listing_items: {
        Row: {
          condition: Database["public"]["Enums"]["listing_condition"]
          created_at: string
          id: string
          listing_id: string
          price: number
          qty_in_stock: number
          sku: string | null
          status: Database["public"]["Enums"]["listing_item_status"]
        }
        Insert: {
          condition?: Database["public"]["Enums"]["listing_condition"]
          created_at?: string
          id?: string
          listing_id: string
          price: number
          qty_in_stock?: number
          sku?: string | null
          status?: Database["public"]["Enums"]["listing_item_status"]
        }
        Update: {
          condition?: Database["public"]["Enums"]["listing_condition"]
          created_at?: string
          id?: string
          listing_id?: string
          price?: number
          qty_in_stock?: number
          sku?: string | null
          status?: Database["public"]["Enums"]["listing_item_status"]
        }
        Relationships: [
          {
            foreignKeyName: "listing_items_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          base_price: number
          category_id: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          display_price: number | null
          id: string
          search_vector: unknown
          shop_id: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
        }
        Insert: {
          base_price: number
          category_id: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_price?: number | null
          id?: string
          search_vector?: unknown
          shop_id: string
          status?: Database["public"]["Enums"]["listing_status"]
          title: string
        }
        Update: {
          base_price?: number
          category_id?: string
          cover_image_url?: string | null
          created_at?: string
          description?: string | null
          display_price?: number | null
          id?: string
          search_vector?: unknown
          shop_id?: string
          status?: Database["public"]["Enums"]["listing_status"]
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "listings_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "listings_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      message_attachments: {
        Row: {
          id: string
          message_id: string
          sort_order: number
          url: string
        }
        Insert: {
          id?: string
          message_id: string
          sort_order?: number
          url: string
        }
        Update: {
          id?: string
          message_id?: string
          sort_order?: number
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "message_attachments_message_id_fkey"
            columns: ["message_id"]
            isOneToOne: false
            referencedRelation: "messages"
            referencedColumns: ["id"]
          },
        ]
      }
      messages: {
        Row: {
          content: string
          conversation_id: string
          created_at: string
          id: string
          read_at: string | null
          sender_id: string
        }
        Insert: {
          content: string
          conversation_id: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id: string
        }
        Update: {
          content?: string
          conversation_id?: string
          created_at?: string
          id?: string
          read_at?: string | null
          sender_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "messages_conversation_id_fkey"
            columns: ["conversation_id"]
            isOneToOne: false
            referencedRelation: "conversations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      notifications: {
        Row: {
          created_at: string
          id: string
          is_read: boolean
          payload: Json | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_read?: boolean
          payload?: Json | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          is_read?: boolean
          payload?: Json | null
          type?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notifications_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      order_lines: {
        Row: {
          id: string
          line_total: number | null
          listing_item_id: string
          order_id: string
          qty: number
          unit_price_snapshot: number
        }
        Insert: {
          id?: string
          line_total?: number | null
          listing_item_id: string
          order_id: string
          qty: number
          unit_price_snapshot: number
        }
        Update: {
          id?: string
          line_total?: number | null
          listing_item_id?: string
          order_id?: string
          qty?: number
          unit_price_snapshot?: number
        }
        Relationships: [
          {
            foreignKeyName: "order_lines_listing_item_id_fkey"
            columns: ["listing_item_id"]
            isOneToOne: false
            referencedRelation: "listing_items"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "order_lines_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: false
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
        ]
      }
      reviews: {
        Row: {
          buyer_id: string
          comment: string | null
          created_at: string
          id: string
          order_id: string
          rating: number
          shop_id: string
        }
        Insert: {
          buyer_id: string
          comment?: string | null
          created_at?: string
          id?: string
          order_id: string
          rating: number
          shop_id: string
        }
        Update: {
          buyer_id?: string
          comment?: string | null
          created_at?: string
          id?: string
          order_id?: string
          rating?: number
          shop_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "reviews_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_order_id_fkey"
            columns: ["order_id"]
            isOneToOne: true
            referencedRelation: "shop_orders"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reviews_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_orders: {
        Row: {
          address_id: string
          buyer_id: string
          completed_at: string | null
          id: string
          order_date: string
          responded_at: string | null
          shop_id: string
          status: Database["public"]["Enums"]["order_status"]
          total_amount: number
        }
        Insert: {
          address_id: string
          buyer_id: string
          completed_at?: string | null
          id?: string
          order_date?: string
          responded_at?: string | null
          shop_id: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount: number
        }
        Update: {
          address_id?: string
          buyer_id?: string
          completed_at?: string | null
          id?: string
          order_date?: string
          responded_at?: string | null
          shop_id?: string
          status?: Database["public"]["Enums"]["order_status"]
          total_amount?: number
        }
        Relationships: [
          {
            foreignKeyName: "shop_orders_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_orders_buyer_id_fkey"
            columns: ["buyer_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "shop_orders_shop_id_fkey"
            columns: ["shop_id"]
            isOneToOne: false
            referencedRelation: "shop_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      shop_profiles: {
        Row: {
          banner_url: string | null
          created_at: string
          id: string
          shop_description: string | null
          shop_name: string
          shop_rating_avg: number
          shop_rating_count: number
          user_id: string
        }
        Insert: {
          banner_url?: string | null
          created_at?: string
          id?: string
          shop_description?: string | null
          shop_name: string
          shop_rating_avg?: number
          shop_rating_count?: number
          user_id: string
        }
        Update: {
          banner_url?: string | null
          created_at?: string
          id?: string
          shop_description?: string | null
          shop_name?: string
          shop_rating_avg?: number
          shop_rating_count?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "shop_profiles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      user_addresses: {
        Row: {
          address_id: string
          is_default: boolean
          user_id: string
        }
        Insert: {
          address_id: string
          is_default?: boolean
          user_id: string
        }
        Update: {
          address_id?: string
          is_default?: boolean
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_addresses_address_id_fkey"
            columns: ["address_id"]
            isOneToOne: false
            referencedRelation: "addresses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "user_addresses_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          avatar_url: string | null
          bio: string | null
          bu_email: string
          created_at: string
          display_name: string
          id: string
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          bu_email: string
          created_at?: string
          display_name: string
          id: string
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          bu_email?: string
          created_at?: string
          display_name?: string
          id?: string
        }
        Relationships: []
      }
      variation_options: {
        Row: {
          id: string
          value: string
          variation_id: string
        }
        Insert: {
          id?: string
          value: string
          variation_id: string
        }
        Update: {
          id?: string
          value?: string
          variation_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "variation_options_variation_id_fkey"
            columns: ["variation_id"]
            isOneToOne: false
            referencedRelation: "variations"
            referencedColumns: ["id"]
          },
        ]
      }
      variations: {
        Row: {
          category_id: string
          id: string
          name: string
        }
        Insert: {
          category_id: string
          id?: string
          name: string
        }
        Update: {
          category_id?: string
          id?: string
          name?: string
        }
        Relationships: [
          {
            foreignKeyName: "variations_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "categories"
            referencedColumns: ["id"]
          },
        ]
      }
      wishlists: {
        Row: {
          created_at: string
          listing_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          listing_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          listing_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "wishlists_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "wishlists_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      cancel_order: { Args: { p_order_id: string }; Returns: undefined }
      check_bu_email_domain: { Args: { event: Json }; Returns: Json }
      complete_order: { Args: { p_order_id: string }; Returns: undefined }
      create_listing: {
        Args: {
          p_base_price: number
          p_category_id: string
          p_description: string
          p_title: string
        }
        Returns: string
      }
      create_listing_item: {
        Args: {
          p_condition: Database["public"]["Enums"]["listing_condition"]
          p_listing_id: string
          p_price: number
          p_qty_in_stock: number
          p_sku?: string
        }
        Returns: string
      }
      create_order: {
        Args: { p_address_id: string; p_listing_item_id: string; p_qty: number }
        Returns: string
      }
      create_shop_profile: {
        Args: {
          p_banner_url?: string
          p_shop_description?: string
          p_shop_name: string
        }
        Returns: string
      }
      current_shop_id: { Args: never; Returns: string }
      get_or_create_conversation: {
        Args: { p_listing_id?: string; p_other_user_id: string }
        Returns: string
      }
      mark_conversation_read: {
        Args: { p_conversation_id: string }
        Returns: undefined
      }
      recompute_listing_cover: {
        Args: { p_listing_id: string }
        Returns: undefined
      }
      respond_to_order: {
        Args: {
          p_decision: Database["public"]["Enums"]["order_status"]
          p_order_id: string
        }
        Returns: undefined
      }
      restore_order_stock: { Args: { p_order_id: string }; Returns: undefined }
      search_listings: {
        Args: {
          p_category_id?: string
          p_page?: number
          p_page_size?: number
          p_query?: string
        }
        Returns: {
          base_price: number
          category_id: string
          cover_image_url: string | null
          created_at: string
          description: string | null
          display_price: number | null
          id: string
          search_vector: unknown
          shop_id: string
          status: Database["public"]["Enums"]["listing_status"]
          title: string
        }[]
        SetofOptions: {
          from: "*"
          to: "listings"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      show_limit: { Args: never; Returns: number }
      show_trgm: { Args: { "": string }; Returns: string[] }
      submit_review: {
        Args: { p_comment?: string; p_order_id: string; p_rating: number }
        Returns: string
      }
    }
    Enums: {
      listing_condition: "new" | "like_new" | "used" | "for_parts"
      listing_item_status: "active" | "sold" | "removed"
      listing_status: "active" | "sold_out" | "removed"
      order_status:
        | "pending"
        | "accepted"
        | "rejected"
        | "completed"
        | "cancelled"
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      listing_condition: ["new", "like_new", "used", "for_parts"],
      listing_item_status: ["active", "sold", "removed"],
      listing_status: ["active", "sold_out", "removed"],
      order_status: [
        "pending",
        "accepted",
        "rejected",
        "completed",
        "cancelled",
      ],
    },
  },
} as const
