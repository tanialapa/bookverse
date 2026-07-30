import "server-only";

import type { BookDetails } from "@/types/book";
import type {
  OpenLibraryAuthorResponse,
  OpenLibraryEditionsResponse,
  OpenLibraryWorkResponse,
} from "@/types/openLibrary";

const workIdPattern = /^OL\d+W$/;
const authorIdPattern = /^OL\d+A$/;
const requestOptions = {
  headers: {
    Accept: "application/json",
  },
  next: {
    revalidate: 86400,
  },
};

async function getAuthorName(authorKey?: string) {
  const authorId = authorKey?.replace(/^\/authors\//, "");

  if (!authorId || !authorIdPattern.test(authorId)) {
    return "Unknown author";
  }

  const url = new URL(`https://openlibrary.org/authors/${authorId}.json`);

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      return "Unknown author";
    }

    const author = (await response.json()) as OpenLibraryAuthorResponse;
    return author.name ?? "Unknown author";
  } catch {
    return "Unknown author";
  }
}

async function getPageCount(id: string) {
  const url = new URL(`https://openlibrary.org/works/${id}/editions.json`);
  url.searchParams.set("limit", "20");

  try {
    const response = await fetch(url, requestOptions);

    if (!response.ok) {
      return null;
    }

    const editions = (await response.json()) as OpenLibraryEditionsResponse;
    const editionWithPageCount = editions.entries?.find(
      (entry) =>
        typeof entry.number_of_pages === "number" && entry.number_of_pages > 0,
    );

    return editionWithPageCount?.number_of_pages ?? null;
  } catch {
    return null;
  }
}

function getDescription(description: OpenLibraryWorkResponse["description"]) {
  if (typeof description === "string") {
    return description;
  }

  if (description && typeof description.value === "string") {
    return description.value;
  }

  return "No description is available for this book.";
}

export async function getBookDetails(id: string): Promise<BookDetails | null> {
  if (!workIdPattern.test(id)) {
    return null;
  }

  const url = new URL(`https://openlibrary.org/works/${id}.json`);
  let response: Response;

  try {
    response = await fetch(url, requestOptions);
  } catch {
    throw new Error("Unable to connect to Open Library.");
  }

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(
      `Unable to load this book from Open Library (${response.status}).`,
    );
  }

  const work = (await response.json()) as OpenLibraryWorkResponse;
  const authorReferences = work.authors?.slice(0, 5) ?? [];
  const [authors, pageCount] = await Promise.all([
    authorReferences.length > 0
      ? Promise.all(
          authorReferences.map((reference) =>
            getAuthorName(reference.author?.key),
          ),
        )
      : Promise.resolve(["Unknown author"]),
    getPageCount(id),
  ]);
  const coverId = work.covers?.[0];

  return {
    id,
    title: work.title ?? "Untitled",
    authors,
    description: getDescription(work.description),
    coverUrl:
      typeof coverId === "number"
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg?default=false`
        : null,
    firstPublished: work.first_publish_date ?? "Unknown",
    pageCount,
    subjects: work.subjects?.slice(0, 8) ?? [],
    openLibraryUrl: `https://openlibrary.org/works/${id}`,
  };
}
