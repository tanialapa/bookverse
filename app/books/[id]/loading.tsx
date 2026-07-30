import { Header } from "@/components/layout/Header";
import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.loading} aria-label="Loading book details">
        <div className={styles.coverSkeleton} />
        <div className={styles.contentSkeleton}>
          <div className={styles.shortLine} />
          <div className={styles.titleLine} />
          <div className={styles.mediumLine} />
          <div className={styles.metadataBlock} />
          <div className={styles.textLine} />
          <div className={styles.textLine} />
          <div className={styles.longLine} />
        </div>
      </main>
    </div>
  );
}
