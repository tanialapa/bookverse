import { BookCard } from "@/components/books/BookCard";
import type { Book } from "@/types/book";

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
    <section id="popular-books" className="bg-[#f1eee5] px-5 py-16 sm:px-8 sm:py-20 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="mb-2 text-xs font-bold tracking-[0.16em] text-[#b7753f] uppercase">
              Reader favorites
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-[#173f35] sm:text-4xl">
              Popular this week.
            </h2>
          </div>
          <p className="text-[#687972]">Books readers are loving right now.</p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>
    </section>
  );
}
