import { Hero } from "@/components/home/Hero";
import { PopularBooks } from "@/components/home/PopularBooks";
import { Header } from "@/components/layout/Header";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Header />
      <main>
        <Hero />
        <PopularBooks />
      </main>
    </div>
  );
}
