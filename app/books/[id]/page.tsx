import { notFound } from "next/navigation";

import { BookDetails } from "@/components/books/BookDetails";
import { Header } from "@/components/layout/Header";
import { getBookDetails } from "@/lib/openLibrary";
import styles from "./page.module.css";

type BookPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function BookPage({ params }: BookPageProps) {
  const { id: encodedId } = await params;
  let id: string;

  try {
    id = decodeURIComponent(encodedId);
  } catch {
    notFound();
  }

  const book = await getBookDetails(id);

  if (!book) {
    notFound();
  }

  return (
    <div className={styles.page}>
      <Header />
      <main>
        <BookDetails book={book} />
      </main>
    </div>
  );
}
