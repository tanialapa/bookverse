export type OpenLibraryBookDocument = {
  key?: string;
  title?: string;
  author_name?: string[];
  first_publish_year?: number;
  cover_i?: number;
  subject?: string[];
  ratings_average?: number;
  number_of_pages_median?: number;
};

export type OpenLibrarySearchResponse = {
  numFound: number;
  start: number;
  docs: OpenLibraryBookDocument[];
};
