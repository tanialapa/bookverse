"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { getBookDetails } from "@/lib/openLibrary";
import { createClient } from "@/lib/supabase/server";
import { isReadingStatus } from "@/types/library";

const workIdPattern = /^OL[0-9]+W$/;
const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function getStringValue(formData: FormData, name: string) {
  const value = formData.get(name);
  return typeof value === "string" ? value.trim() : "";
}

function withMessage(path: string, key: "error" | "message", message: string) {
  return `${path}?${key}=${encodeURIComponent(message)}`;
}

export async function addBookToLibrary(formData: FormData) {
  const openLibraryId = getStringValue(formData, "openLibraryId");

  if (!workIdPattern.test(openLibraryId)) {
    redirect(withMessage("/discover", "error", "Invalid book identifier."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      withMessage(
        "/sign-in",
        "message",
        "Sign in to add books to your library.",
      ),
    );
  }

  let book = null;
  let bookRequestFailed = false;

  try {
    book = await getBookDetails(openLibraryId);
  } catch {
    bookRequestFailed = true;
  }

  if (bookRequestFailed) {
    redirect(
      withMessage(
        `/books/${openLibraryId}`,
        "error",
        "Unable to add this book. Please try again.",
      ),
    );
  }

  if (!book) {
    redirect(withMessage("/discover", "error", "Book not found."));
  }

  let databaseErrorCode: string | null = null;

  try {
    const { error } = await supabase.from("user_books").insert({
      user_id: user.id,
      open_library_id: book.id,
      title: book.title,
      authors: book.authors,
      cover_url: book.coverUrl,
      total_pages: book.pageCount,
    });

    databaseErrorCode = error?.code ?? null;
  } catch {
    databaseErrorCode = "request_failed";
  }

  if (databaseErrorCode === "23505") {
    redirect(
      withMessage(
        "/library",
        "message",
        "This book is already in your library.",
      ),
    );
  }

  if (databaseErrorCode) {
    console.error("Unable to add book to library", {
      code: databaseErrorCode,
    });
    redirect(
      withMessage(
        `/books/${openLibraryId}`,
        "error",
        "Unable to add this book. Please try again.",
      ),
    );
  }

  revalidatePath("/library");
  redirect(
    withMessage("/library", "message", "Book added to your library."),
  );
}

export async function removeBookFromLibrary(formData: FormData) {
  const bookId = getStringValue(formData, "id");

  if (!uuidPattern.test(bookId)) {
    redirect(withMessage("/library", "error", "Unable to remove this book."));
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in");
  }

  const { error } = await supabase
    .from("user_books")
    .delete()
    .eq("id", bookId)
    .eq("user_id", user.id);

  if (error) {
    redirect(withMessage("/library", "error", "Unable to remove this book."));
  }

  revalidatePath("/library");
  redirect(
    withMessage("/library", "message", "Book removed from your library."),
  );
}

export async function updateLibraryBook(formData: FormData) {
  const id = getStringValue(formData, "id");

  if (!uuidPattern.test(id)) {
    redirect(
      withMessage(
        "/library",
        "error",
        "Invalid library book identifier.",
      ),
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      withMessage(
        "/sign-in",
        "message",
        "Sign in to manage your library.",
      ),
    );
  }

  const { data: currentBook, error: loadError } = await supabase
    .from("user_books")
    .select("id,user_id,total_pages,current_page,status,user_rating,notes")
    .eq("id", id)
    .eq("user_id", user.id)
    .maybeSingle();

  if (loadError) {
    console.error("Unable to load library book for update", {
      code: loadError.code,
    });
    redirect(
      withMessage(
        "/library",
        "error",
        "Unable to load this library book.",
      ),
    );
  }

  if (!currentBook) {
    redirect(
      withMessage(
        "/library",
        "error",
        "Book not found in your library.",
      ),
    );
  }

  const statusValue = formData.get("status");
  const status = typeof statusValue === "string" ? statusValue.trim() : "";

  if (!isReadingStatus(status)) {
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Select a valid reading status.",
      ),
    );
  }

  const currentPageValue = formData.get("currentPage");
  const currentPageText =
    typeof currentPageValue === "string" ? currentPageValue.trim() : "";

  if (!/^\d+$/.test(currentPageText)) {
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Current page must be a whole number.",
      ),
    );
  }

  const currentPage = Number(currentPageText);

  if (!Number.isSafeInteger(currentPage) || currentPage < 0) {
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Current page must be a whole number.",
      ),
    );
  }

  if (
    currentBook.total_pages !== null &&
    currentPage > currentBook.total_pages
  ) {
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Current page cannot be greater than the total page count.",
      ),
    );
  }

  const ratingValue = formData.get("userRating");
  const ratingText =
    typeof ratingValue === "string" ? ratingValue.trim() : "";
  let userRating: number | null = null;

  if (ratingText) {
    if (!/^[1-5]$/.test(ratingText)) {
      redirect(
        withMessage(
          `/library/${id}/edit`,
          "error",
          "Rating must be between 1 and 5.",
        ),
      );
    }

    userRating = Number(ratingText);
  }

  const notesValue = formData.get("notes");
  const notes = typeof notesValue === "string" ? notesValue.trim() : "";

  if (notes.length > 3000) {
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Notes cannot be longer than 3000 characters.",
      ),
    );
  }

  const { error: updateError } = await supabase
    .from("user_books")
    .update({
      status,
      current_page: currentPage,
      user_rating: userRating,
      notes,
    })
    .eq("id", id)
    .eq("user_id", user.id);

  if (updateError) {
    console.error("Unable to update library book", {
      code: updateError.code,
    });
    redirect(
      withMessage(
        `/library/${id}/edit`,
        "error",
        "Unable to update this book. Please try again.",
      ),
    );
  }

  revalidatePath("/library");
  revalidatePath(`/library/${id}/edit`);
  redirect(
    withMessage("/library", "message", "Book updated successfully."),
  );
}
