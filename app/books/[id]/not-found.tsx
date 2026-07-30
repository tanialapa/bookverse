import Link from "next/link";

import { Header } from "@/components/layout/Header";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.notFound}>
        <div className={styles.icon} aria-hidden="true">?</div>
        <p className={styles.eyebrow}>Lost between the shelves</p>
        <h1 className={styles.title}>Book not found</h1>
        <p className={styles.description}>
          We could not find this Open Library work. It may have moved or the
          link may be incorrect.
        </p>
        <Link href="/discover" className={styles.backLink}>
          Back to Discover
        </Link>
      </main>
    </div>
  );
}
