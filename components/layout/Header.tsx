import Link from "next/link";
import styles from "./Header.module.css";

export function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="BookVerse home"
        >
          <span className={styles.logoMark}>
            B
          </span>
          BookVerse
        </Link>

        <nav
          aria-label="Primary navigation"
          className={styles.navigation}
        >
          <Link className={styles.homeLink} href="/">
            Home
          </Link>
          <Link className={styles.navigationLink} href="/discover">
            Discover
          </Link>
          <a className={styles.navigationLink} href="#">
            My Library
          </a>
        </nav>

        <button
          type="button"
          aria-label="Sign in to BookVerse"
          className={styles.signInButton}
        >
          Sign In
        </button>
      </div>
    </header>
  );
}
