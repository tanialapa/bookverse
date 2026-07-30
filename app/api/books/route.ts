import type { NextRequest } from "next/server";

import type { Book, CoverVariant } from "@/types/book";
import type { OpenLibrarySearchResponse } from "@/types/openLibrary";

const coverVariants: CoverVariant[] = [
  "forest",
  "midnight",
  "sunrise",
  "terracotta",
];

const openLibraryFields = [
  "key",
  "title",
  "author_name",
  "first_publish_year",
  "cover_i",
  "subject",
  "ratings_average",
  "number_of_pages_median",
].join(",");

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 2) {
    return Response.json(
      { message: "Search query must contain at least 2 characters." },
      { status: 400 },
    );
  }

  const url = new URL("https://openlibrary.org/search.json");
  url.searchParams.set("q", query);
  url.searchParams.set("limit", "20");
  url.searchParams.set("fields", openLibraryFields);

  try {
    const response = await fetch(url, {
      cache: "no-store",
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      console.error("Open Library API request failed", {
        status: response.status,
        statusText: response.statusText,
      });

      return Response.json(
        { message: "Unable to load books from Open Library." },
        { status: 502 },
      );
    }

    const data = (await response.json()) as OpenLibrarySearchResponse;
    const normalizedBooks: Book[] = data.docs.map((doc, index) => ({
      id: doc.key ?? `open-library-book-${index}`,
      title: doc.title ?? "Untitled",
      authors: doc.author_name ?? ["Unknown author"],
      category: doc.subject?.[0] ?? "Uncategorized",
      rating:
        typeof doc.ratings_average === "number" ? doc.ratings_average : null,
      description: "",
      publishedDate:
        typeof doc.first_publish_year === "number"
          ? String(doc.first_publish_year)
          : "Unknown",
      pageCount:
        typeof doc.number_of_pages_median === "number"
          ? doc.number_of_pages_median
          : null,
      coverUrl:
        typeof doc.cover_i === "number"
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-L.jpg?default=false`
          : null,
      coverVariant: coverVariants[index % coverVariants.length],
    }));

    return Response.json({ books: normalizedBooks });
  } catch (error: unknown) {
    console.error("Open Library request failed", {
      errorName: error instanceof Error ? error.name : "UnknownError",
    });

    return Response.json(
      { message: "Unable to load books from Open Library." },
      { status: 502 },
    );
  }
}
