"use client";

import { useState } from "react";

import { BookCard } from "@/components/books/BookCard";
import { books } from "@/data/books";
import styles from "./BookSearch.module.css";

export function BookSearch() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const searchableText = `${book.title} ${book.author} ${book.category}`.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <section className={styles.bookSearch} aria-labelledby="search-label">
      <div className={styles.searchContainer}>
        <label
          id="search-label"
          htmlFor="book-search"
          className={styles.label}
        >
          Search the collection
        </label>
        <div className={styles.inputContainer}>
          <span
            aria-hidden="true"
            className={styles.searchIcon}
          >
            ⌕
          </span>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author, or category..."
            className={styles.searchInput}
          />
        </div>
      </div>

      <p className={styles.resultCount} aria-live="polite">
        {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
      </p>

      {filteredBooks.length > 0 ? (
        <div className={styles.grid}>
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>
            No books found. Try another title, author, or category.
          </p>
        </div>
      )}
    </section>
  );
}
