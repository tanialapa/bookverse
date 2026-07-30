import type { ReadingStatus } from "@/types/library";

export type Database = {
  public: {
    Tables: {
      user_books: {
        Row: {
          id: string;
          user_id: string;
          open_library_id: string;
          title: string;
          authors: string[];
          cover_url: string | null;
          status: ReadingStatus;
          current_page: number;
          total_pages: number | null;
          user_rating: number | null;
          notes: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          open_library_id: string;
          title: string;
          authors?: string[];
          cover_url?: string | null;
          status?: ReadingStatus;
          current_page?: number;
          total_pages?: number | null;
          user_rating?: number | null;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          open_library_id?: string;
          title?: string;
          authors?: string[];
          cover_url?: string | null;
          status?: ReadingStatus;
          current_page?: number;
          total_pages?: number | null;
          user_rating?: number | null;
          notes?: string;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};
