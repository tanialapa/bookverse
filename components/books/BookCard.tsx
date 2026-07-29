import type { Book } from "@/types/book";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className={styles.card}>
      <div
        className={`${styles.cover} ${styles[book.coverVariant]}`}
        aria-hidden="true"
      >
        <div className={styles.spine} />
        <p className={styles.coverEdition}>
          BookVerse selection
        </p>
        <div>
          <span className={styles.coverSymbol}>✦</span>
          <p className={styles.coverTitle}>{book.title}</p>
          <p className={styles.coverAuthor}>{book.author}</p>
        </div>
        <span className={styles.coverLine} />
      </div>

      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <div>
            <h3 className={styles.title}>{book.title}</h3>
            <p className={styles.author}>{book.author}</p>
          </div>
          <span className={styles.rating}>
            <span aria-hidden="true" className={styles.ratingStar}>★</span>
            <span className={styles.screenReaderOnly}>Rating:</span>
            {book.rating}
          </span>
        </div>
        <p className={styles.category}>
          {book.category}
        </p>
        <button
          type="button"
          disabled
          aria-label={`View details for ${book.title} (coming soon)`}
          className={styles.detailsButton}
        >
          View details
        </button>
      </div>
    </article>
  );
}
