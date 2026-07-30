"use client";

import { useFormStatus } from "react-dom";

import styles from "./FormSubmitButton.module.css";

export function FormSubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      aria-disabled={pending}
      className={styles.button}
    >
      {pending ? "Saving..." : "Save changes"}
    </button>
  );
}
