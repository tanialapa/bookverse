import Link from "next/link";

import { updateLibraryBook } from "@/app/library/actions";
import { FormSubmitButton } from "@/components/library/FormSubmitButton";
import { READING_STATUSES, type UserBook } from "@/types/library";
import styles from "./EditLibraryBookForm.module.css";

type EditLibraryBookFormProps = {
  book: UserBook;
  error?: string;
};

function formatStatus(status: UserBook["status"]) {
  const labels: Record<UserBook["status"], string> = {
    want_to_read: "Want to read",
    reading: "Reading",
    read: "Read",
  };

  return labels[status];
}

export function EditLibraryBookForm({
  book,
  error,
}: EditLibraryBookFormProps) {
  return (
    <div className={styles.formWrapper}>
      {error && (
        <p className={styles.errorMessage} role="alert">
          {error}
        </p>
      )}

      <form action={updateLibraryBook} className={styles.form}>
        <input type="hidden" name="id" value={book.id} />

        <div className={styles.field}>
          <label htmlFor="status">Reading status</label>
          <select
            id="status"
            name="status"
            defaultValue={book.status}
            required
          >
            {READING_STATUSES.map((status) => (
              <option value={status} key={status}>
                {formatStatus(status)}
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="currentPage">Current page</label>
          <input
            id="currentPage"
            name="currentPage"
            type="number"
            min={0}
            max={book.total_pages ?? undefined}
            step={1}
            defaultValue={book.current_page}
            required
          />
          <p className={styles.helpText}>
            {book.total_pages === null
              ? "Total page count is unavailable."
              : `Total pages: ${book.total_pages}`}
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="userRating">Personal rating</label>
          <select
            id="userRating"
            name="userRating"
            defaultValue={book.user_rating?.toString() ?? ""}
          >
            <option value="">No rating</option>
            {[1, 2, 3, 4, 5].map((rating) => (
              <option value={rating} key={rating}>
                {rating} out of 5
              </option>
            ))}
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="notes">Personal notes</label>
          <textarea
            id="notes"
            name="notes"
            rows={8}
            maxLength={3000}
            defaultValue={book.notes}
          />
          <p className={styles.helpText}>Maximum 3000 characters.</p>
        </div>

        <div className={styles.actions}>
          <FormSubmitButton />
          <Link href="/library" className={styles.cancelLink}>
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}
