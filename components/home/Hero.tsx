const decorativeBooks = [
  {
    title: "The Secret Garden",
    label: "A timeless classic",
    className:
      "left-1 top-12 -rotate-6 bg-[linear-gradient(145deg,#1f5748,#12382f)] text-[#f7ebcd]",
  },
  {
    title: "Wild & Free",
    label: "Essays on nature",
    className:
      "left-1/2 top-0 z-10 -translate-x-1/2 bg-[linear-gradient(145deg,#d49a5b,#b76e3f)] text-[#fff8eb]",
  },
  {
    title: "Quiet Mornings",
    label: "Poetry collection",
    className:
      "right-1 top-14 rotate-6 bg-[linear-gradient(145deg,#e8d9bc,#cbbd9e)] text-[#234c41]",
  },
];

export function Hero() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-12 lg:py-28">
      <div className="max-w-2xl">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#173f35]/10 bg-white/60 px-4 py-2 text-sm font-semibold text-[#537068]">
          <span className="h-2 w-2 rounded-full bg-[#c8864c]" />
          Your personal reading space.
        </p>
        <h1 className="text-5xl leading-[1.08] font-bold tracking-[-0.04em] text-[#173f35] sm:text-6xl lg:text-7xl">
          Discover your next great read.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-8 text-[#5f706b]">
          Find books you will love, build a library that feels like your own,
          and keep every chapter of your reading journey in one calm place.
        </p>
        <div className="mt-9 flex flex-col gap-3 sm:flex-row">
          <a
            href="#popular-books"
            className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#173f35] px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(23,63,53,0.18)] transition-transform hover:-translate-y-0.5"
          >
            Explore books
          </a>
          <button
            type="button"
            disabled
            aria-label="View my library (coming soon)"
            className="inline-flex min-h-12 cursor-not-allowed items-center justify-center rounded-full border border-[#173f35]/15 bg-white/40 px-7 py-3.5 text-sm font-semibold text-[#173f35]/60"
          >
            View my library
          </button>
        </div>
      </div>

      <div
        className="relative mx-auto h-[390px] w-full max-w-[510px] sm:h-[440px]"
        aria-label="Decorative collection of book covers"
        role="img"
      >
        <div className="absolute inset-x-[8%] bottom-3 h-24 rounded-[50%] bg-[#173f35]/10 blur-2xl" />
        {decorativeBooks.map((book) => (
          <div
            key={book.title}
            className={`absolute flex h-[330px] w-[42%] max-w-[190px] flex-col justify-between overflow-hidden rounded-[8px_18px_18px_8px] border border-white/30 p-5 shadow-[0_24px_45px_rgba(35,59,51,0.2)] sm:h-[380px] sm:p-6 ${book.className}`}
          >
            <div>
              <span className="block h-px w-9 bg-current opacity-60" />
              <p className="mt-5 text-[10px] font-bold tracking-[0.18em] uppercase opacity-75">
                BookVerse edition
              </p>
            </div>
            <div>
              <span className="mb-5 block text-3xl opacity-50">✦</span>
              <p className="text-xl leading-tight font-bold sm:text-2xl">{book.title}</p>
              <p className="mt-3 text-xs opacity-70">{book.label}</p>
            </div>
            <span className="block h-px w-full bg-current opacity-30" />
          </div>
        ))}
      </div>
    </section>
  );
}
