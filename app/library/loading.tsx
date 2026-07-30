import { Header } from "@/components/layout/Header";
import styles from "./loading.module.css";

const skeletonCards = ["first", "second", "third"];

export default function LibraryLoading() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main} aria-busy="true" aria-label="Loading library">
        <div className={styles.heading} />
        <div className={styles.grid}>
          {skeletonCards.map((card) => (
            <div className={styles.card} key={card}>
              <div className={styles.cover} />
              <div className={styles.content}>
                <div className={styles.shortLine} />
                <div className={styles.longLine} />
                <div className={styles.mediumLine} />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
