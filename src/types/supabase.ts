
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      contents: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          url: string | null
          title: string | null
          description: string | null
          file_path: string | null
          file_type: string | null
          user_id: string
          content_type: 'url' | 'file'
          is_deleted: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          url?: string | null
          title?: string | null
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          user_id: string
          content_type: 'url' | 'file'
          is_deleted?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          url?: string | null
          title?: string | null
          description?: string | null
          file_path?: string | null
          file_type?: string | null
          user_id?: string
          content_type?: 'url' | 'file'
          is_deleted?: boolean
        }
      }
      tags: {
        Row: {
          id: string
          name: string
          auto_generated: boolean
          created_at: string
          user_id: string | null
        }
        Insert: {
          id?: string
          name: string
          auto_generated: boolean
          created_at?: string
          user_id?: string | null
        }
        Update: {
          id?: string
          name?: string
          auto_generated?: boolean
          created_at?: string
          user_id?: string | null
        }
      }
      content_tags: {
        Row: {
          id: string
          content_id: string
          tag_id: string
          confirmed: boolean
          created_at: string
        }
        Insert: {
          id?: string
          content_id: string
          tag_id: string
          confirmed: boolean
          created_at?: string
        }
        Update: {
          id?: string
          content_id?: string
          tag_id?: string
          confirmed?: boolean
          created_at?: string
        }
      }
      search_history: {
        Row: {
          id: string
          user_id: string
          query: string
          is_semantic: boolean
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          query: string
          is_semantic: boolean
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          query?: string
          is_semantic?: boolean
          created_at?: string
        }
      }
      tag_analytics: {
        Row: {
          id: string
          tag_id: string
          confirmed_count: number
          rejected_count: number
          search_count: number
          updated_at: string
        }
        Insert: {
          id?: string
          tag_id: string
          confirmed_count?: number
          rejected_count?: number
          search_count?: number
          updated_at?: string
        }
        Update: {
          id?: string
          tag_id?: string
          confirmed_count?: number
          rejected_count?: number
          search_count?: number
          updated_at?: string
        }
      }
      user_profiles: {
        Row: {
          id: string
          user_id: string
          external_content_consent: boolean
          subscription_tier: 'free' | 'premium' | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          external_content_consent: boolean
          subscription_tier?: 'free' | 'premium' | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          external_content_consent?: boolean
          subscription_tier?: 'free' | 'premium' | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
