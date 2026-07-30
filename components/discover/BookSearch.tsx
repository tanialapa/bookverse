"use client";

import { useState } from "react";
import type { FormEvent } from "react";

import { BookCard } from "@/components/books/BookCard";
import type { Book } from "@/types/book";
import styles from "./BookSearch.module.css";

type BooksApiResponse = {
  books?: Book[];
  message?: string;
};

export function BookSearch() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 2) {
      setError("Enter at least 2 characters.");
      return;
    }

    setError("");
    setBooks([]);
    setHasSearched(true);
    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/books?q=${encodeURIComponent(trimmedQuery)}`,
      );
      const data = (await response.json()) as BooksApiResponse;

      if (!response.ok) {
        throw new Error("Unable to load books. Please try again.");
      }

      setBooks(data.books ?? []);
    } catch (requestError) {
      setError(
        requestError instanceof Error
          ? requestError.message
          : "Unable to load books. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className={styles.bookSearch} aria-labelledby="search-label">
      <form className={styles.form} onSubmit={handleSubmit}>
        <label id="search-label" htmlFor="book-search" className={styles.label}>
          Search the collection
        </label>
        <div className={styles.searchField}>
          <div className={styles.inputContainer}>
            <span aria-hidden="true" className={styles.searchIcon}>
              ⌕
            </span>
            <input
              id="book-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, author, or subject..."
              className={styles.searchInput}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.searchButton}
          >
            {isLoading ? "Searching..." : "Search"}
          </button>
        </div>
      </form>

      <div className={styles.status} aria-live="polite">
        {error && <p className={styles.errorMessage}>{error}</p>}

        {!hasSearched && !error && (
          <p className={styles.initialMessage}>
            Search by title, author, or subject to discover your next book.
          </p>
        )}

        {isLoading && (
          <p className={styles.loadingState} role="status">
            Searching books...
          </p>
        )}

        {hasSearched && !isLoading && !error && books.length === 0 && (
          <p className={styles.emptyMessage}>
            No books found. Try another title, author, or subject.
          </p>
        )}
      </div>

      {books.length > 0 && !isLoading && !error && (
        <>
          <p className={styles.resultsCount}>Found {books.length} books</p>
          <div className={styles.resultsGrid}>
            {books.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                detailsHref={`/books/${encodeURIComponent(book.id)}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
