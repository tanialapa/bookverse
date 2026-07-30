import Link from "next/link";

import { signUp } from "@/app/auth/actions";
import { Header } from "@/components/layout/Header";
import styles from "./page.module.css";

type SignUpPageProps = {
  searchParams: Promise<{
    error?: string | string[];
  }>;
};

export default async function SignUpPage({ searchParams }: SignUpPageProps) {
  const params = await searchParams;
  const error = typeof params.error === "string" ? params.error : undefined;

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.card} aria-labelledby="sign-up-title">
          <p className={styles.eyebrow}>Start your reading journey</p>
          <h1 id="sign-up-title" className={styles.title}>
            Create your account
          </h1>
          <p className={styles.description}>
            Join BookVerse and make every reading goal easier to follow.
          </p>

          {error && (
            <p className={styles.errorMessage} role="alert">
              {error}
            </p>
          )}

          <form action={signUp} className={styles.form}>
            <div className={styles.field}>
              <label htmlFor="sign-up-email">Email</label>
              <input
                id="sign-up-email"
                name="email"
                type="email"
                autoComplete="email"
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="sign-up-password">Password</label>
              <input
                id="sign-up-password"
                name="password"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <div className={styles.field}>
              <label htmlFor="sign-up-confirm-password">Confirm password</label>
              <input
                id="sign-up-confirm-password"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                minLength={8}
                required
              />
            </div>
            <button type="submit" className={styles.submitButton}>
              Create account
            </button>
          </form>

          <p className={styles.alternateAction}>
            Already have an account? <Link href="/sign-in">Sign in</Link>
          </p>
        </section>
      </main>
    </div>
  );
}
