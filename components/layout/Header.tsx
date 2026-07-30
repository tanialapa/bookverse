import Link from "next/link";

import { signOut } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";
import styles from "./Header.module.css";

export async function Header() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const isAuthenticated = Boolean(data?.claims.sub);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link
          href="/"
          className={styles.logo}
          aria-label="BookVerse home"
        >
          <span className={styles.logoMark}>B</span>
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

        {isAuthenticated ? (
          <form action={signOut} className={styles.authForm}>
            <button type="submit" className={styles.signInButton}>
              Sign Out
            </button>
          </form>
        ) : (
          <Link
            href="/sign-in"
            aria-label="Sign in to BookVerse"
            className={styles.signInButton}
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
}
