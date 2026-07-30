import { Header } from "@/components/layout/Header";
import styles from "./loading.module.css";

export default function EditLibraryBookLoading() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} aria-busy="true" aria-label="Loading book">
        <div className={styles.card}>
          <div className={styles.heading} />
          <div className={styles.field} />
          <div className={styles.field} />
          <div className={styles.field} />
          <div className={styles.textarea} />
          <div className={styles.button} />
        </div>
      </main>
    </div>
  );
}
