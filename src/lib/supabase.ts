import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY. Add them to .env in the project root and restart the dev server.'
  );
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-key'
)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: { id: string; display_name: string | null; avatar_url: string | null; created_at: string }
        Insert: { id: string; display_name?: string | null; avatar_url?: string | null; created_at?: string }
        Update: { id?: string; display_name?: string | null; avatar_url?: string | null; created_at?: string }
      }
      roles: {
        Row: { id: string; name: string; description: string | null }
        Insert: { id?: string; name: string; description?: string | null }
        Update: { id?: string; name?: string; description?: string | null }
      }
      user_roles: {
        Row: { user_id: string; role_id: string; status: string; created_at: string }
        Insert: { user_id: string; role_id: string; status?: string; created_at?: string }
        Update: { user_id?: string; role_id?: string; status?: string; created_at?: string }
      }
      categories: {
        Row: { id: string; name: string; slug: string }
        Insert: { id?: string; name: string; slug: string }
        Update: { id?: string; name?: string; slug?: string }
      }
      courses: {
        Row: { id: string; instructor_id: string; category_id: string | null; title: string; slug: string; description: string | null; price: number; status: string; created_at: string }
        Insert: { id?: string; instructor_id: string; category_id?: string | null; title: string; slug: string; description?: string | null; price?: number; status?: string; created_at?: string }
        Update: { id?: string; instructor_id?: string; category_id?: string | null; title?: string; slug?: string; description?: string | null; price?: number; status?: string; created_at?: string }
      }
      sections: {
        Row: { id: string; course_id: string; title: string; order_index: number }
        Insert: { id?: string; course_id: string; title: string; order_index?: number }
        Update: { id?: string; course_id?: string; title?: string; order_index?: number }
      }
      lectures: {
        Row: { id: string; section_id: string; title: string; content_type: string; content_url: string | null; duration_seconds: number; is_preview: boolean; order_index: number }
        Insert: { id?: string; section_id: string; title: string; content_type?: string; content_url?: string | null; duration_seconds?: number; is_preview?: boolean; order_index?: number }
        Update: { id?: string; section_id?: string; title?: string; content_type?: string; content_url?: string | null; duration_seconds?: number; is_preview?: boolean; order_index?: number }
      }
      enrollments: {
        Row: { id: string; user_id: string; course_id: string; status: string; enrolled_at: string; last_accessed_at: string }
        Insert: { id?: string; user_id: string; course_id: string; status?: string; enrolled_at?: string; last_accessed_at?: string }
        Update: { id?: string; user_id?: string; course_id?: string; status?: string; enrolled_at?: string; last_accessed_at?: string }
      }
      transactions: {
        Row: { id: string; user_id: string; course_id: string; amount: number; payment_status: string; gateway_txn_id: string | null; created_at: string }
        Insert: { id?: string; user_id: string; course_id: string; amount: number; payment_status?: string; gateway_txn_id?: string | null; created_at?: string }
        Update: { id?: string; user_id?: string; course_id?: string; amount?: number; payment_status?: string; gateway_txn_id?: string | null; created_at?: string }
      }
      course_approvals: {
        Row: { id: string; course_id: string; approved_by: string | null; is_active: boolean; version_meta: Record<string, unknown> | null; created_at: string; updated_at: string }
        Insert: { id?: string; course_id: string; approved_by?: string | null; is_active?: boolean; version_meta?: Record<string, unknown> | null; created_at?: string; updated_at?: string }
        Update: { id?: string; course_id?: string; approved_by?: string | null; is_active?: boolean; version_meta?: Record<string, unknown> | null; created_at?: string; updated_at?: string }
      }
    }
  }
}