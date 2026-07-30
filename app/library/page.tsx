import Link from "next/link";
import { redirect } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { LibraryBookCard } from "@/components/library/LibraryBookCard";
import { LibraryControls } from "@/components/library/LibraryControls";
import { LibraryStats } from "@/components/library/LibraryStats";
import { createClient } from "@/lib/supabase/server";
import {
  isLibrarySort,
  isLibraryStatusFilter,
  type LibrarySort,
  type LibraryStatusFilter,
} from "@/types/library";
import styles from "./page.module.css";

type LibraryPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    message?: string | string[];
    sort?: string | string[];
    status?: string | string[];
  }>;
};

function getMessage(value?: string | string[]) {
  return typeof value === "string" ? value : undefined;
}

function getStatus(value?: string | string[]): LibraryStatusFilter {
  return typeof value === "string" && isLibraryStatusFilter(value)
    ? value
    : "all";
}

function getSort(value?: string | string[]): LibrarySort {
  return typeof value === "string" && isLibrarySort(value) ? value : "newest";
}

const SORT_OPTIONS = {
  newest: { column: "created_at", ascending: false },
  oldest: { column: "created_at", ascending: true },
  title_asc: { column: "title", ascending: true },
} as const satisfies Record<
  LibrarySort,
  { column: "created_at" | "title"; ascending: boolean }
>;

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/sign-in?message=${encodeURIComponent("Sign in to view your library.")}`,
    );
  }

  const params = await searchParams;
  const error = getMessage(params.error);
  const message = getMessage(params.message);
  const status = getStatus(params.status);
  const sort = getSort(params.sort);
  const sortOption = SORT_OPTIONS[sort];

  let booksQuery = supabase
    .from("user_books")
    .select(
      "id,user_id,open_library_id,title,authors,cover_url,status,current_page,total_pages,user_rating,notes,created_at,updated_at",
    )
    .eq("user_id", user.id);

  if (status !== "all") {
    booksQuery = booksQuery.eq("status", status);
  }

  const [libraryResult, statsResult] = await Promise.all([
    booksQuery.order(sortOption.column, { ascending: sortOption.ascending }),
    supabase.from("user_books").select("status").eq("user_id", user.id),
  ]);
  const { data: books, error: libraryError } = libraryResult;
  const { data: statusRows, error: statsError } = statsResult;
  const libraryBooks = books ?? [];
  const libraryStatuses = (statusRows ?? []).map((book) => book.status);
  const libraryIsEmpty = !statsError && libraryStatuses.length === 0;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <header className={styles.introduction}>
          <div>
            <p className={styles.eyebrow}>Your reading space</p>
            <h1 className={styles.title}>My Library</h1>
            <p className={styles.description}>
              Keep track of the books you want to read, are reading, and have
              finished.
            </p>
          </div>
          <p className={styles.count}>
            {libraryStatuses.length}{" "}
            {libraryStatuses.length === 1 ? "book" : "books"}
          </p>
        </header>

        {!statsError && <LibraryStats statuses={libraryStatuses} />}
        {!libraryIsEmpty && <LibraryControls status={status} sort={sort} />}

        {error && (
          <p className={styles.errorMessage} role="alert">
            {error}
          </p>
        )}
        {message && (
          <p className={styles.successMessage} role="status">
            {message}
          </p>
        )}

        {libraryError || statsError ? (
          <p className={styles.loadError} role="alert">
            Unable to load your library. Please try again later.
          </p>
        ) : libraryIsEmpty ? (
          <section className={styles.emptyState}>
            <h2>Your library is empty.</h2>
            <p>Add books from Discover to start building your reading list.</p>
            <Link href="/discover" className={styles.discoverLink}>
              Discover books
            </Link>
          </section>
        ) : libraryBooks.length === 0 ? (
          <section className={styles.emptyState}>
            <h2>No books match these filters.</h2>
            <p>Try another reading status or reset your filters.</p>
            <Link href="/library" className={styles.discoverLink}>
              Reset filters
            </Link>
          </section>
        ) : (
          <section className={styles.grid} aria-label="Your books">
            {libraryBooks.map((book) => (
              <LibraryBookCard key={book.id} book={book} />
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
