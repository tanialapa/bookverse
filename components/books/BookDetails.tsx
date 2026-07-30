import Image from "next/image";
import Link from "next/link";

import type { BookDetails as BookDetailsType } from "@/types/book";
import styles from "./BookDetails.module.css";

type BookDetailsProps = {
  book: BookDetailsType;
};

export function BookDetails({ book }: BookDetailsProps) {
  const authors = book.authors.join(", ");
  const descriptionParagraphs = book.description
    .split(/\n\s*\n/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <article className={styles.bookDetails}>
      <Link href="/discover" className={styles.backLink}>
        <span aria-hidden="true">←</span> Back to Discover
      </Link>

      <div className={styles.layout}>
        <div className={styles.coverColumn}>
          <div className={styles.cover}>
            <div className={styles.fallbackCover} aria-hidden="true">
              <p className={styles.coverEdition}>BookVerse selection</p>
              <div>
                <span className={styles.coverSymbol}>✦</span>
                <p className={styles.coverTitle}>{book.title}</p>
                <p className={styles.coverAuthors}>{authors}</p>
              </div>
              <span className={styles.coverLine} />
            </div>
            {book.coverUrl && (
              <Image
                src={book.coverUrl}
                alt={`Cover of ${book.title}`}
                fill
                sizes="(max-width: 767px) 80vw, 360px"
                className={styles.coverImage}
                preload
              />
            )}
          </div>
        </div>

        <div className={styles.information}>
          <p className={styles.eyebrow}>Open Library work</p>
          <h1 className={styles.title}>{book.title}</h1>
          <p className={styles.authors}>by {authors}</p>

          <dl className={styles.metadata}>
            <div className={styles.metadataItem}>
              <dt>First published</dt>
              <dd>{book.firstPublished}</dd>
            </div>
            <div className={styles.metadataItem}>
              <dt>Length</dt>
              <dd>
                {book.pageCount === null
                  ? "Page count unavailable"
                  : `${book.pageCount} pages`}
              </dd>
            </div>
          </dl>

          <section className={styles.descriptionSection}>
            <h2>Description</h2>
            <div className={styles.descriptionParagraphs}>
              {descriptionParagraphs.map((paragraph, index) => (
                <p key={`${paragraph.slice(0, 40)}-${index}`}>{paragraph}</p>
              ))}
            </div>
          </section>

          {book.subjects.length > 0 && (
            <section className={styles.subjectsSection}>
              <h2>Subjects</h2>
              <ul className={styles.subjects}>
                {book.subjects.map((subject) => (
                  <li key={subject}>{subject}</li>
                ))}
              </ul>
            </section>
          )}

          <div className={styles.actions}>
            <a
              href={book.openLibraryUrl}
              target="_blank"
              rel="noreferrer"
              className={styles.primaryLink}
            >
              View on Open Library
            </a>
            <button type="button" disabled className={styles.libraryButton}>
              Add to My Library
            </button>
          </div>
          <p className={styles.comingSoon}>Library feature coming next.</p>
        </div>
      </div>
    </article>
  );
}
