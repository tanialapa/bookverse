import Image from "next/image";
import Link from "next/link";

import type { Book } from "@/types/book";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
  detailsHref?: string;
};

export function BookCard({ book, detailsHref }: BookCardProps) {
  const authors = book.authors.join(", ");

  return (
    <article className={styles.card}>
      <div className={`${styles.cover} ${styles[book.coverVariant]}`}>
        <div className={styles.fallbackCover} aria-hidden="true">
          <div className={styles.spine} />
          <p className={styles.coverEdition}>BookVerse selection</p>
          <div>
            <span className={styles.coverSymbol}>✦</span>
            <p className={styles.coverTitle}>{book.title}</p>
            <p className={styles.coverAuthor}>{authors}</p>
          </div>
          <span className={styles.coverLine} />
        </div>

        {book.coverUrl && (
          <Image
            src={book.coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className={styles.coverImage}
          />
        )}
      </div>

      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <div>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{authors}</p>
          </div>
          <span className={styles.rating}>
            {book.rating === null ? (
              "No rating"
            ) : (
              <>
                <span aria-hidden="true" className={styles.ratingStar}>★</span>
                <span className={styles.screenReaderOnly}>Rating:</span>
                {book.rating}
              </>
            )}
          </span>
        </div>
        <p className={styles.category}>{book.category}</p>
        {detailsHref ? (
          <Link href={detailsHref} className={styles.detailsLink}>
            View details
          </Link>
        ) : (
          <button
            type="button"
            disabled
            aria-label={`View details for ${book.title} (coming soon)`}
            className={styles.detailsButton}
          >
            View details
          </button>
        )}
      </div>
    </article>
  );
}
