import { BookCard } from "@/components/books/BookCard";
import { books } from "@/data/books";
import styles from "./PopularBooks.module.css";

const popularBooks = books.slice(0, 4);

export function PopularBooks() {
  return (
    <section id="popular-books" className={styles.popularBooks}>
      <div className={styles.container}>
        <div className={styles.headingRow}>
          <div>
            <p className={styles.eyebrow}>
              Reader favorites
            </p>
            <h2 className={styles.title}>
              Popular this week.
            </h2>
          </div>
          <p className={styles.description}>Books readers are loving right now.</p>
        </div>

        <div className={styles.grid}>
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
