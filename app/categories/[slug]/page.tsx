import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronLeft, BookOpen, Star } from "lucide-react";
import BookCard from "@/components/BookCard";
import { CATEGORY_ICONS } from "@/components/LanguageIcons";
import {
  getBooksByCategory,
  getCategoryBySlug,
  getCategorySlugs,
} from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateStaticParams() {
  try {
    const slugs = await getCategorySlugs();
    return slugs.map((slug) => ({ slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const cat = await getCategoryBySlug(params.slug).catch(() => null);
  return {
    title: cat ? `${cat.name} Books — DevBooks` : "Category — DevBooks",
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const category = await getCategoryBySlug(params.slug).catch(() => null);
  if (!category) notFound();

  const Icon = CATEGORY_ICONS[category.slug];
  const books = await getBooksByCategory(category.slug).catch(() => []);
  const avgRating =
    books.length > 0
      ? (books.reduce((s, b) => s + b.rating, 0) / books.length).toFixed(1)
      : "—";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-ink-900/10">
        <div className="absolute inset-0">
          <Image
            src={category.image}
            alt=""
            fill
            priority
            className="object-cover"
          />
          <div
            className={`absolute inset-0 bg-gradient-to-br ${category.accent} opacity-40 mix-blend-multiply`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900/90 via-ink-900/70 to-ink-900/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent" />
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pt-12 pb-20 text-cream-50">
          <Link
            href="/categories"
            className="inline-flex items-center gap-1 text-sm font-medium text-cream-100/80 transition-colors hover:text-cream-50"
          >
            <ChevronLeft className="h-4 w-4" strokeWidth={2} />
            All categories
          </Link>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              {Icon ? (
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-ink-900/5">
                  <Icon className="h-10 w-10" />
                </div>
              ) : (
                <div className="text-6xl drop-shadow-md">{category.emoji}</div>
              )}
              <h1 className="display mt-5 text-5xl leading-[1.05] sm:text-7xl drop-shadow-sm">
                {category.name}
              </h1>
              <p className="mt-3 max-w-2xl text-lg text-cream-100/85">
                {category.description}
              </p>
            </div>

            <div className="grid grid-cols-3 gap-3 lg:col-span-4">
              <Stat label="Books" value={`${books.length}`} icon={BookOpen} />
              <Stat label="Avg rating" value={avgRating} icon={Star} />
              <Stat
                label="Levels"
                value={`${new Set(books.map((b) => b.level)).size}`}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16">
        {books.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
            <div className="display text-2xl text-ink-900">
              Coming soon.
            </div>
            <p className="mt-2 text-sm text-ink-700/70">
              New {category.name} books are on their way.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {books.map((b) => (
              <BookCard key={b.id} book={b} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
}: {
  label: string;
  value: string;
  icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}) {
  return (
    <div className="rounded-2xl border border-cream-100/15 bg-cream-100/10 p-4 backdrop-blur-md">
      {Icon && (
        <Icon className="h-4 w-4 text-gold-300" strokeWidth={1.8} />
      )}
      <div className="display mt-2 text-2xl font-semibold text-cream-50">
        {value}
      </div>
      <div className="text-[10px] uppercase tracking-[0.18em] text-cream-100/70">
        {label}
      </div>
    </div>
  );
}
