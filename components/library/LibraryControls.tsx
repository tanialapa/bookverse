import Link from "next/link";

import type { LibrarySort, LibraryStatusFilter } from "@/types/library";
import styles from "./LibraryControls.module.css";

type LibraryControlsProps = {
  status: LibraryStatusFilter;
  sort: LibrarySort;
};

export function LibraryControls({ status, sort }: LibraryControlsProps) {
  return (
    <form className={styles.controls} method="get">
      <div className={styles.field}>
        <label htmlFor="library-status">Reading status</label>
        <select id="library-status" name="status" defaultValue={status}>
          <option value="all">All books</option>
          <option value="want_to_read">Want to read</option>
          <option value="reading">Reading</option>
          <option value="read">Read</option>
        </select>
      </div>

      <div className={styles.field}>
        <label htmlFor="library-sort">Sort by</label>
        <select id="library-sort" name="sort" defaultValue={sort}>
          <option value="newest">Newest added</option>
          <option value="oldest">Oldest added</option>
          <option value="title_asc">Title A–Z</option>
        </select>
      </div>

      <div className={styles.actions}>
        <button type="submit" className={styles.applyButton}>
          Apply filters
        </button>
        <Link href="/library" className={styles.resetLink}>
          Reset filters
        </Link>
      </div>
    </form>
  );
}
