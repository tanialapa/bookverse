import { BookSearch } from "@/components/discover/BookSearch";
import { Header } from "@/components/layout/Header";
import styles from "./page.module.css";

export default function DiscoverPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <header className={styles.heading}>
          <p className={styles.eyebrow}>
            Explore the collection
          </p>
          <h1 className={styles.title}>
            Discover books
          </h1>
          <p className={styles.description}>Find your next favourite book</p>
        </header>

        <BookSearch />
      </main>
    </div>
  );
}
