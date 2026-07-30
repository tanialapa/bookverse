import { notFound } from "next/navigation";

import { BookDetails } from "@/components/books/BookDetails";
import { Header } from "@/components/layout/Header";
import { getBookDetails } from "@/lib/openLibrary";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string | string[];
  }>;
};

export default async function BookPage({ params, searchParams }: BookPageProps) {
  const { id: encodedId } = await params;
  let id: string;

  try {
    id = decodeURIComponent(encodedId);
  } catch {
    notFound();
  }

  const supabase = await createClient();
  const [book, userResult, query] = await Promise.all([
    getBookDetails(id),
    supabase.auth.getUser(),
    searchParams,
  ]);

  if (!book) {
    notFound();
  }

  const isAuthenticated = Boolean(userResult.data.user);
  const error = typeof query.error === "string" ? query.error : undefined;

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <BookDetails
          book={book}
          isAuthenticated={isAuthenticated}
          error={error}
        />
      </main>
    </div>
  );
}
