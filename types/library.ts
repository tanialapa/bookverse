import type { Database } from "@/types/database";

export type ReadingStatus = "want_to_read" | "reading" | "read";
export type LibraryStatusFilter = ReadingStatus | "all";
export type LibrarySort = "newest" | "oldest" | "title_asc";

export const READING_STATUSES = [
  "want_to_read",
  "reading",
  "read",
] as const;

export function isReadingStatus(value: string): value is ReadingStatus {
  return READING_STATUSES.some((status) => status === value);
}

export function isLibraryStatusFilter(
  value: string,
): value is LibraryStatusFilter {
  return value === "all" || isReadingStatus(value);
}

export function isLibrarySort(value: string): value is LibrarySort {
  return ["newest", "oldest", "title_asc"].some(
    (sortOption) => sortOption === value,
  );
}

export type UserBook =
  Database["public"]["Tables"]["user_books"]["Row"];
