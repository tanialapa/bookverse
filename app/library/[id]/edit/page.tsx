import { notFound, redirect } from "next/navigation";

import { Header } from "@/components/layout/Header";
import { EditLibraryBookForm } from "@/components/library/EditLibraryBookForm";
import { createClient } from "@/lib/supabase/server";
import styles from "./page.module.css";

type EditLibraryBookPageProps = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    error?: string | string[];
  }>;
};

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function EditLibraryBookPage({
  params,
  searchParams,
}: EditLibraryBookPageProps) {
  const { id: encodedId } = await params;
  let id: string;

  try {
    id = decodeURIComponent(encodedId);
  } catch {
    notFound();
  }

  if (!uuidPattern.test(id)) {
    notFound();
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(
      `/sign-in?message=${encodeURIComponent("Sign in to manage your library.")}`,
    );
  }

  const [{ data: book, error: loadError }, query] = await Promise.all([
    supabase
      .from("user_books")
      .select(
        "id,user_id,open_library_id,title,authors,cover_url,status,current_page,total_pages,user_rating,notes,created_at,updated_at",
      )
      .eq("id", id)
      .eq("user_id", user.id)
      .maybeSingle(),
    searchParams,
  ]);

  if (loadError) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.loadError} role="alert">
            Unable to load this library book. Please try again later.
          </p>
        </main>
      </div>
    );
  }

  if (!book) {
    notFound();
  }

  const authors =
    book.authors.length > 0 ? book.authors.join(", ") : "Unknown author";
  const error = typeof query.error === "string" ? query.error : undefined;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="edit-book-title">
          <p className={styles.eyebrow}>Manage your reading</p>
          <h1 id="edit-book-title" className={styles.title}>
            Edit book
          </h1>
          <h2 className={styles.bookTitle}>{book.title}</h2>
          <p className={styles.authors}>{authors}</p>
          <EditLibraryBookForm book={book} error={error} />
        </section>
      </main>
    </div>
  );
}
