"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import type { Book, Category } from "@/lib/data";

export default function AppChrome({
  categories,
  books,
  settings = {},
  children,
}: {
  categories: Category[];
  books: Book[];
  settings?: Record<string, string>;
  children: React.ReactNode;
}) {
  const pathname = usePathname() || "";
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    // Admin pages render their own layout (sidebar + topbar) — skip the public chrome.
    return <>{children}</>;
  }

  return (
    <>
      <Navbar categories={categories} books={books} settings={settings} />
      <main className="flex-1 pt-16">{children}</main>
      <Footer categories={categories} settings={settings} />
    </>
  );
}
