import HomePageClient from "@/components/HomePageClient";
import {
  getActiveBanners,
  getActiveTestimonials,
  getBooks,
  getCategories,
  getSettingsMap,
} from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const [books, categories, banners, testimonials, settings] =
    await Promise.all([
      getBooks().catch(() => []),
      getCategories().catch(() => []),
      getActiveBanners().catch(() => []),
      getActiveTestimonials().catch(() => []),
      getSettingsMap().catch(() => ({})),
    ]);

  return (
    <HomePageClient
      books={books}
      categories={categories}
      banners={banners}
      testimonials={testimonials}
      settings={settings}
    />
  );
}
