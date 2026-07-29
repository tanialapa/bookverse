"use client";

import { useState } from "react";

import { BookCard } from "@/components/books/BookCard";
import { books } from "@/data/books";

export function BookSearch() {
  const [query, setQuery] = useState("");

  const normalizedQuery = query.trim().toLowerCase();
  const filteredBooks = books.filter((book) => {
    const searchableText = `${book.title} ${book.author} ${book.category}`.toLowerCase();

    return searchableText.includes(normalizedQuery);
  });

  return (
    <section aria-labelledby="search-label">
      <div className="mx-auto max-w-3xl">
        <label
          id="search-label"
          htmlFor="book-search"
          className="mb-3 block text-sm font-semibold text-[#294f45]"
        >
          Search the collection
        </label>
        <div className="relative">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute top-1/2 left-5 -translate-y-1/2 text-xl text-[#6c8079]"
          >
            ⌕
          </span>
          <input
            id="book-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by title, author, or category..."
            className="min-h-16 w-full rounded-2xl border border-[#173f35]/15 bg-[#fffdf8] py-4 pr-5 pl-14 text-base text-[#173f35] shadow-[0_10px_30px_rgba(32,56,49,0.07)] outline-none placeholder:text-[#82918c] focus:border-[#173f35]/45 focus:ring-4 focus:ring-[#173f35]/10"
          />
        </div>
      </div>

      <p className="mt-9 mb-6 text-sm font-semibold text-[#5f746d]" aria-live="polite">
        {filteredBooks.length} {filteredBooks.length === 1 ? "book" : "books"} found
      </p>

      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-[#173f35]/20 bg-[#fffdf8]/70 px-6 py-16 text-center">
          <p className="text-lg font-semibold text-[#173f35]">
            No books found. Try another title, author, or category.
          </p>
        </div>
      )}
    </section>
  );
}
