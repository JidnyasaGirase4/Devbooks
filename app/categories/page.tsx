import CategoriesGridClient from "@/components/CategoriesGridClient";
import { getBooks, getCategories, getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Categories — DevBooks",
};

export default async function CategoriesPage() {
  const [categories, books, settings] = await Promise.all([
    getCategories().catch(() => []),
    getBooks().catch(() => []),
    getSettingsMap().catch(() => ({})),
  ]);

  return (
    <CategoriesGridClient
      categories={categories}
      books={books}
      settings={settings}
    />
  );
}
