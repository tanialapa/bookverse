"use client";

import Image from "next/image";
import { useState } from "react";

import type { Book } from "@/types/book";
import styles from "./BookCard.module.css";

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  const authors = book.authors.join(", ");
  const [hasImageError, setHasImageError] = useState(false);
  const coverUrl = hasImageError ? null : book.coverUrl;

  return (
    <article className={styles.card}>
      {coverUrl ? (
        <div className={styles.cover}>
          <Image
            src={coverUrl}
            alt={`Cover of ${book.title}`}
            fill
            sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 25vw"
            className={styles.coverImage}
            onError={() => setHasImageError(true)}
          />
        </div>
      ) : (
        <div
          className={`${styles.cover} ${styles[book.coverVariant]}`}
          aria-hidden="true"
        >
          <div className={styles.spine} />
          <p className={styles.coverEdition}>BookVerse selection</p>
          <div>
            <span className={styles.coverSymbol}>✦</span>
            <p className={styles.coverTitle}>{book.title}</p>
            <p className={styles.coverAuthor}>{authors}</p>
          </div>
          <span className={styles.coverLine} />
        </div>
      )}

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
