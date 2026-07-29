export type CoverVariant = "forest" | "midnight" | "sunrise" | "terracotta";

export type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  rating: number;
  coverVariant: CoverVariant;
};
