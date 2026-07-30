import Image from "next/image";
import Link from "next/link";

import { removeBookFromLibrary } from "@/app/library/actions";
import type { ReadingStatus, UserBook } from "@/types/library";
import styles from "./LibraryBookCard.module.css";

type LibraryBookCardProps = {
  book: UserBook;
};

function formatStatus(status: ReadingStatus) {
  const labels: Record<ReadingStatus, string> = {
    want_to_read: "Want to read",
    reading: "Reading",
    read: "Read",
  };

  return labels[status];
}

function createNotesPreview(notes: string) {
  const normalizedNotes = notes.trim();

  if (!normalizedNotes) {
    return "No personal notes yet.";
  }

  return normalizedNotes.length > 140
    ? `${normalizedNotes.slice(0, 140).trimEnd()}…`
    : normalizedNotes;
}

export function LibraryBookCard({ book }: LibraryBookCardProps) {
  const authors =
    book.authors.length > 0 ? book.authors.join(", ") : "Unknown author";
  const progress = book.total_pages
    ? `${book.current_page} of ${book.total_pages} pages`
    : "Page count unavailable";
  const progressPercentage = book.total_pages
    ? Math.min(100, Math.round((book.current_page / book.total_pages) * 100))
    : null;
  const rating = book.user_rating
    ? `Your rating: ${book.user_rating}/5`
    : "Not rated yet";
  const notesPreview = createNotesPreview(book.notes);

  return (
    <article className={styles.card}>
      <div className={styles.cover}>
        <div className={styles.fallbackCover} aria-hidden="true">
          <span className={styles.coverMark}>B</span>
          <p>{book.title}</p>
        </div>
        {book.cover_url && (
          <Image
            src={book.cover_url}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
            className={styles.coverImage}
          />
        )}
      </div>

      <div className={styles.content}>
        <span className={styles.status}>{formatStatus(book.status)}</span>
        <h2 className={styles.title}>{book.title}</h2>
        <p className={styles.authors}>{authors}</p>
        <div className={styles.readingDetails}>
          <p className={styles.progressText}>
            {progress}
            {progressPercentage !== null && (
              <span>{progressPercentage}%</span>
            )}
          </p>
          {book.total_pages !== null && (
            <progress
              value={book.current_page}
              max={book.total_pages}
              aria-label={`Reading progress for ${book.title}`}
              className={styles.progressBar}
            />
          )}
          <p className={styles.rating}>{rating}</p>
          <p className={styles.notes}>{notesPreview}</p>
        </div>

        <div className={styles.actions}>
          <div className={styles.links}>
            <Link
              href={`/books/${book.open_library_id}`}
              className={styles.detailsLink}
            >
              View details
            </Link>
            <Link
              href={`/library/${book.id}/edit`}
              className={styles.editLink}
            >
              Edit
            </Link>
          </div>
          <form action={removeBookFromLibrary}>
            <input type="hidden" name="id" value={book.id} />
            <button
              type="submit"
              className={styles.removeButton}
              aria-label={`Remove ${book.title} from your library`}
            >
              Remove
            </button>
          </form>
        </div>
      </div>
    </article>
  );
}
