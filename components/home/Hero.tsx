import Link from "next/link";

import styles from "./Hero.module.css";

const decorativeBooks = [
  {
    title: "The Secret Garden",
    label: "A timeless classic",
    className: styles.leftCover,
  },
  {
    title: "Wild & Free",
    label: "Essays on nature",
    className: styles.centerCover,
  },
  {
    title: "Quiet Mornings",
    label: "Poetry collection",
    className: styles.rightCover,
  },
];

export function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>
          <span className={styles.eyebrowDot} />
          Your personal reading space.
        </p>
        <h1 className={styles.title}>
          Discover your next great read.
        </h1>
        <p className={styles.description}>
          Find books you will love, build a library that feels like your own,
          and keep every chapter of your reading journey in one calm place.
        </p>
        <div className={styles.actions}>
          <a
            href="#popular-books"
            className={styles.primaryButton}
          >
            Explore books
          </a>
          <Link href="/library" className={styles.secondaryButton}>
            View my library
          </Link>
        </div>
      </div>

      <div
        className={styles.bookComposition}
        aria-label="Decorative collection of book covers"
        role="img"
      >
        <div className={styles.compositionShadow} />
        {decorativeBooks.map((book) => (
          <div
            key={book.title}
            className={`${styles.decorativeCover} ${book.className}`}
          >
            <div>
              <span className={styles.topLine} />
              <p className={styles.coverEdition}>
                BookVerse edition
              </p>
            </div>
            <div>
              <span className={styles.coverSymbol}>✦</span>
              <p className={styles.coverTitle}>{book.title}</p>
              <p className={styles.coverLabel}>{book.label}</p>
            </div>
            <span className={styles.bottomLine} />
          </div>
        ))}
      </div>
    </section>
  );
}
