import { BookSearch } from "@/components/discover/BookSearch";
import { Header } from "@/components/layout/Header";

export default function DiscoverPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main className="mx-auto max-w-7xl px-5 py-14 sm:px-8 sm:py-18 lg:px-12 lg:py-20">
        <header className="mx-auto mb-12 max-w-2xl text-center">
          <p className="mb-3 text-xs font-bold tracking-[0.16em] text-[#b7753f] uppercase">
            Explore the collection
          </p>
          <h1 className="text-4xl font-bold tracking-[-0.03em] text-[#173f35] sm:text-5xl">
            Discover books
          </h1>
          <p className="mt-4 text-lg text-[#687972]">Find your next favourite book</p>
        </header>

        <BookSearch />
      </main>
    </div>
  );
}
