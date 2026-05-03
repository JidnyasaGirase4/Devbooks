import BooksLibraryClient from "@/components/BooksLibraryClient";
import { getBooks, getCategories, getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "All Books — DevBooks",
};

export default async function BooksPage() {
  const [books, categories, settings] = await Promise.all([
    getBooks().catch(() => []),
    getCategories().catch(() => []),
    getSettingsMap().catch(() => ({})),
  ]);

  return (
    <BooksLibraryClient
      books={books}
      categories={categories}
      settings={settings}
    />
  );
}
