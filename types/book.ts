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

export type BookDetails = {
  id: string;
  title: string;
  authors: string[];
  description: string;
  coverUrl: string | null;
  firstPublished: string;
  pageCount: number | null;
  subjects: string[];
  openLibraryUrl: string;
};
