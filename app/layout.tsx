import type { Metadata } from "next";
import "./globals.css";
import AppChrome from "@/components/AppChrome";
import { getBooks, getCategories, getSettingsMap } from "@/lib/queries";

export const metadata: Metadata = {
  title: "DevBooks — A library for the modern developer",
  description:
    "Hand-picked programming books for Python, Java, JavaScript, HTML, CSS and React. Curated, reviewed and shipped worldwide.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [categories, books, settings] = await Promise.all([
    getCategories().catch(() => []),
    getBooks().catch(() => []),
    getSettingsMap().catch(() => ({})),
  ]);

  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-cream-50 text-ink-900 antialiased">
        <AppChrome categories={categories} books={books} settings={settings}>
          {children}
        </AppChrome>
      </body>
    </html>
  );
}
