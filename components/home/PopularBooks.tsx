import { BookCard } from "@/components/books/BookCard";
import type { Book } from "@/types/book";
import styles from "./PopularBooks.module.css";

const popularBooks: Book[] = [
  {
    id: 1,
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    category: "Fantasy",
    rating: 4.8,
    coverVariant: "forest",
  },
  {
    id: 2,
    title: "1984",
    author: "George Orwell",
    category: "Dystopian",
    rating: 4.7,
    coverVariant: "midnight",
  },
  {
    id: 3,
    title: "Atomic Habits",
    author: "James Clear",
    category: "Self-development",
    rating: 4.6,
    coverVariant: "sunrise",
  },
  {
    id: 4,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    rating: 4.5,
    coverVariant: "terracotta",
  },
];

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
