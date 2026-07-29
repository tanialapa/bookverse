import type { Book, CoverVariant } from "@/types/book";

const coverStyles: Record<CoverVariant, string> = {
  forest: "bg-[linear-gradient(145deg,#204f40,#0f332b)] text-[#f1dfb5]",
  midnight: "bg-[linear-gradient(145deg,#233044,#111927)] text-[#e9dbc0]",
  sunrise: "bg-[linear-gradient(145deg,#e1ae68,#be7445)] text-[#fff9ec]",
  terracotta: "bg-[linear-gradient(145deg,#ba6850,#7d3c35)] text-[#fff2db]",
};

type BookCardProps = {
  book: Book;
};

export function BookCard({ book }: BookCardProps) {
  return (
    <article className="group rounded-3xl border border-[#173f35]/10 bg-[#fffdf8] p-4 shadow-[0_10px_30px_rgba(32,56,49,0.06)] transition-transform hover:-translate-y-1">
      <div
        className={`relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-[8px_18px_18px_8px] p-6 shadow-[0_14px_25px_rgba(26,46,40,0.18)] ${coverStyles[book.coverVariant]}`}
        aria-hidden="true"
      >
        <div className="absolute top-0 bottom-0 left-3 w-px bg-white/20" />
        <p className="text-[10px] font-bold tracking-[0.18em] uppercase opacity-70">
          BookVerse selection
        </p>
        <div>
          <span className="mb-4 block text-3xl opacity-50">✦</span>
          <p className="text-2xl leading-tight font-bold">{book.title}</p>
          <p className="mt-3 text-xs opacity-75">{book.author}</p>
        </div>
        <span className="h-px w-10 bg-current opacity-50" />
      </div>

      <div className="px-1 pt-5 pb-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-[#173f35]">{book.title}</h3>
            <p className="mt-1 text-sm text-[#6d7c77]">{book.author}</p>
          </div>
          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#785225]">
            <span aria-hidden="true" className="text-[#d59645]">★</span>
            <span className="sr-only">Rating:</span>
            {book.rating}
          </span>
        </div>
        <p className="mt-4 inline-flex rounded-full bg-[#edf0e8] px-3 py-1.5 text-xs font-semibold text-[#49655d]">
          {book.category}
        </p>
        <button
          type="button"
          disabled
          aria-label={`View details for ${book.title} (coming soon)`}
          className="mt-5 w-full cursor-not-allowed rounded-full border border-[#173f35]/15 px-4 py-3 text-sm font-semibold text-[#173f35]/55"
        >
          View details
        </button>
      </div>
    </article>
  );
}
