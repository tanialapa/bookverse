import { Hero } from "@/components/home/Hero";
import { PopularBooks } from "@/components/home/PopularBooks";
import { Header } from "@/components/layout/Header";

export default function Home() {
  return (
    <div className="min-h-screen overflow-hidden">
      <Header />
      <main>
        <Hero />
        <PopularBooks />
      </main>
    </div>
  );
}
