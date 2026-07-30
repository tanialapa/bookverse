import Link from "next/link";

import { signIn } from "@/app/auth/actions";
import { Header } from "@/components/layout/Header";
import styles from "./page.module.css";

type SignInPageProps = {
  searchParams: Promise<{
    error?: string | string[];
    message?: string | string[];
  }>;
};

function getMessage(value?: string | string[]) {
  return typeof value === "string" ? value : undefined;
}

export default async function SignInPage({ searchParams }: SignInPageProps) {
  const params = await searchParams;
  const error = getMessage(params.error);
  const message = getMessage(params.message);

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="sign-in-title">
          <p className={styles.eyebrow}>Your reading space awaits</p>
          <h1 id="sign-in-title" className={styles.title}>
            Welcome back
          </h1>
          <p className={styles.description}>
            Sign in to continue your BookVerse journey.
          </p>

          {error && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className={styles.successMessage} role="status">
              {message}
            </p>
          )}

          <form action={signIn} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="sign-in-email">Email</label>
              <input
                id="sign-in-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="sign-in-password">Password</label>
              <input
                id="sign-in-password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Sign In
            </button>
          </form>

          <p className={styles.alternateAction}>
            New to BookVerse? <Link href="/sign-up">Create an account</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
