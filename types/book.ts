export type CoverVariant = "forest" | "midnight" | "sunrise" | "terracotta";

export type Book = {
  id: string;
  title: string;
  authors: string[];
  category: string;
  rating: number | null;
  description: string;
  publishedDate: string;
  pageCount: number | null;
  coverUrl: string | null;
  coverVariant: CoverVariant;
};
