import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BookVerse",
  description:
    "Discover books, build your personal library, and track your reading journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
