import type { ReadingStatus } from "@/types/library";
import styles from "./LibraryStats.module.css";

type LibraryStatsProps = {
  statuses: ReadingStatus[];
};

export function LibraryStats({ statuses }: LibraryStatsProps) {
  const stats = [
    { label: "Total books", value: statuses.length },
    {
      label: "Want to read",
      value: statuses.filter((status) => status === "want_to_read").length,
    },
    {
      label: "Reading",
      value: statuses.filter((status) => status === "reading").length,
    },
    {
      label: "Read",
      value: statuses.filter((status) => status === "read").length,
    },
  ];

  return (
    <section className={styles.stats} aria-label="Library statistics">
      {stats.map((stat) => (
        <div key={stat.label} className={styles.stat}>
          <strong className={styles.value}>{stat.value}</strong>
          <span className={styles.label}>{stat.label}</span>
        </div>
      ))}
    </section>
  );
}
