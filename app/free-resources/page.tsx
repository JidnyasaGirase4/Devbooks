import FreeResourcesClient from "@/components/FreeResourcesClient";
import {
  getActiveResources,
  getCategories,
  getFreeBooks,
  getSettingsMap,
} from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Free Resources — DevBooks",
};

export default async function FreeResourcesPage() {
  const [freeBooks, categories, settings, resources] = await Promise.all([
    getFreeBooks().catch(() => []),
    getCategories().catch(() => []),
    getSettingsMap().catch(() => ({})),
    getActiveResources().catch(() => []),
  ]);

  return (
    <FreeResourcesClient
      freeBooks={freeBooks}
      categories={categories}
      settings={settings}
      resources={resources}
    />
  );
}
