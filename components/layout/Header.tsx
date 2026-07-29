import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-[#173f35]/10 bg-[#f8f6f0]/95">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-5 py-5 sm:px-8 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#173f35]"
          aria-label="BookVerse home"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#173f35] text-lg text-[#fffdf7]">
            B
          </span>
          BookVerse
        </Link>

        <nav
          aria-label="Primary navigation"
          className="order-3 flex w-full items-center justify-center gap-6 text-sm font-medium text-[#49655d] sm:order-2 sm:w-auto"
        >
          <Link className="transition-colors hover:text-[#b7753f]" href="/">
            Home
          </Link>
          <Link className="transition-colors hover:text-[#173f35]" href="/discover">
            Discover
          </Link>
          <a className="transition-colors hover:text-[#173f35]" href="#">
            My Library
          </a>
        </nav>

        <button
          type="button"
          aria-label="Sign in to BookVerse"
          className="order-2 rounded-full border border-[#173f35]/20 px-5 py-2.5 text-sm font-semibold text-[#173f35] transition-colors hover:bg-[#173f35] hover:text-white sm:order-3"
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
