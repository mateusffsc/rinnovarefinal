import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Types para o banco de dados
export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          phone: string;
          weight: string;
          height: string;
          imc: string;
          supplement: string;
          status: string;
          diagnosis: string;
          total_score: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          phone: string;
          weight: string;
          height: string;
          imc: string;
          supplement: string;
          status?: string;
          diagnosis: string;
          total_score: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          phone?: string;
          weight?: string;
          height?: string;
          imc?: string;
          supplement?: string;
          status?: string;
          diagnosis?: string;
          total_score?: number;
        };
      };
      lead_scores: {
        Row: {
          id: string;
          lead_id: string;
          category: string;
          score: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          category: string;
          score: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          category?: string;
          score?: number;
          created_at?: string;
        };
      };
      lead_answers: {
        Row: {
          id: string;
          lead_id: string;
          question_id: number;
          answer_index: number;
          answer_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          lead_id: string;
          question_id: number;
          answer_index: number;
          answer_text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          lead_id?: string;
          question_id?: number;
          answer_index?: number;
          answer_text?: string;
          created_at?: string;
        };
      };
      treatments: {
        Row: {
          id: string;
          name: string;
          description: string;
          targets: string[];
          benefits: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          description: string;
          targets: string[];
          benefits: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string;
          targets?: string[];
          benefits?: string[];
          created_at?: string;
        };
      };
    };
  };
}

export type Lead = Database['public']['Tables']['leads']['Row'];
export type LeadInsert = Database['public']['Tables']['leads']['Insert'];
export type LeadScore = Database['public']['Tables']['lead_scores']['Row'];
export type LeadAnswer = Database['public']['Tables']['lead_answers']['Row'];
export type Treatment = Database['public']['Tables']['treatments']['Row']; 