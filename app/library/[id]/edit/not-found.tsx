import Link from "next/link";

import { Header } from "@/components/layout/Header";
import styles from "./not-found.module.css";

export default function EditLibraryBookNotFound() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.card}>
          <p className={styles.eyebrow}>Lost from your shelves</p>
          <h1>Library book not found</h1>
          <p>
            This book is not in your library, or it is not available to your
            account.
          </p>
          <Link href="/library" className={styles.backLink}>
            Back to My Library
          </Link>
        </section>
      </main>
    </div>
  );
}
