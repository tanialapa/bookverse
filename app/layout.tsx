import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookVerse - Your Personal Reading Library",
  description:
    "Discover books, build your personal library, and track your reading progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body>{children}</body>
    </html>
  );
}
