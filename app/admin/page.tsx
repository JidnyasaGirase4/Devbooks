import Link from "next/link";
import {
  Layers,
  Library,
  Star,
  ArrowRight,
  Plus,
  ExternalLink,
  GalleryHorizontal,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import {
  getBannerCount,
  getBookCount,
  getBooks,
  getCategoryCount,
  getMediaCount,
} from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Dashboard — DevBooks Admin" };

export default async function AdminDashboardPage() {
  const [books, bCount, cCount, bannerCount, mediaCount] = await Promise.all([
    getBooks().catch(() => []),
    getBookCount().catch(() => 0),
    getCategoryCount().catch(() => 0),
    getBannerCount().catch(() => 0),
    getMediaCount().catch(() => 0),
  ]);

  const avgRating = books.length
    ? books.reduce((s, b) => s + b.rating, 0) / books.length
    : 0;
  const recentBooks = [...books]
    .sort((a, b) => (a.id < b.id ? 1 : -1))
    .slice(0, 8);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Overview</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Live snapshot of your DevBooks catalogue.
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Link href="/admin/categories/add" className="btn-outline text-xs !py-2">
            <Plus className="h-3.5 w-3.5" />
            Category
          </Link>
          <Link href="/admin/banners/add" className="btn-outline text-xs !py-2">
            <Plus className="h-3.5 w-3.5" />
            Banner
          </Link>
          <Link href="/admin/books/add" className="btn-primary">
            <Plus className="h-4 w-4" />
            Add book
          </Link>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        <Stat
          label="Books"
          value={`${bCount}`}
          icon={Library}
          gradient="from-gold-500 to-orange-500"
          href="/admin/books"
        />
        <Stat
          label="Categories"
          value={`${cCount}`}
          icon={Layers}
          gradient="from-cyan-500 to-sky-600"
          href="/admin/categories"
        />
        <Stat
          label="Banners"
          value={`${bannerCount}`}
          icon={GalleryHorizontal}
          gradient="from-purple-500 to-fuchsia-600"
          href="/admin/banners"
        />
        <Stat
          label="Media files"
          value={`${mediaCount}`}
          icon={ImageIcon}
          gradient="from-emerald-500 to-green-600"
          href="/admin/media"
        />
        <Stat
          label="Avg rating"
          value={`${avgRating.toFixed(1)}★`}
          icon={Star}
          gradient="from-rose-500 to-pink-600"
        />
      </div>

      {/* Recent + public link */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <section className="rounded-3xl border border-ink-900/10 bg-cream-50 p-6 shadow-sm lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="display text-lg font-semibold">Recent books</h2>
              <p className="text-xs text-ink-700/60">
                Last {recentBooks.length} books in the library.
              </p>
            </div>
            <Link
              href="/admin/books"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700 hover:text-brand-900"
            >
              See all
              <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
            </Link>
          </div>
          {recentBooks.length === 0 ? (
            <div className="mt-4 rounded-2xl border border-dashed border-ink-900/15 bg-cream-100/50 p-6 text-center text-xs text-ink-700/70">
              Nothing yet — add your first book.
            </div>
          ) : (
            <ul className="mt-4 divide-y divide-ink-900/5">
              {recentBooks.map((b) => (
                <li
                  key={b.id}
                  className="flex items-center justify-between gap-3 py-3"
                >
                  <div className="min-w-0">
                    <Link
                      href={`/admin/books/edit/${b.id}`}
                      className="truncate text-sm font-semibold text-ink-900 hover:text-brand-700"
                    >
                      {b.title}
                    </Link>
                    <div className="truncate text-xs text-ink-700/60">
                      {b.author}
                    </div>
                  </div>
                  <span className="display text-sm font-semibold whitespace-nowrap">
                    {b.price === 0 ? "Free" : `Rs ${b.price.toFixed(0)}`}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand-700 via-brand-800 to-ink-900 p-6 text-cream-50 shadow-sm">
          <div className="absolute inset-0 paper opacity-20" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-cream-100/15 bg-cream-100/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream-100/80">
              <Sparkles className="h-3 w-3 text-gold-300 animate-twinkle" />
              Live
            </span>
            <h2 className="display mt-4 text-xl">Public site</h2>
            <p className="mt-2 text-sm text-cream-100/75">
              Every change updates the public pages instantly via Server
              Components.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-2">
              <PublicLink href="/" label="Home" />
              <PublicLink href="/books" label="Books" />
              <PublicLink href="/categories" label="Categories" />
              <PublicLink href="/free-resources" label="Free" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({
  label,
  value,
  icon: Icon,
  gradient,
  href,
}: {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  gradient: string;
  href?: string;
}) {
  const inner = (
    <div className="group h-full rounded-2xl border border-ink-900/10 bg-cream-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg">
      <span
        className={`inline-flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${gradient} text-white shadow-md transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}
      >
        <Icon className="h-5 w-5" strokeWidth={2} />
      </span>
      <div className="mt-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
        {label}
      </div>
      <div className="display mt-1 text-2xl font-semibold text-ink-900">
        {value}
      </div>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}

function PublicLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      target="_blank"
      className="inline-flex items-center justify-between gap-2 rounded-full bg-cream-100/10 px-3 py-2 text-xs font-semibold text-cream-50 transition-colors hover:bg-cream-100/20"
    >
      {label}
      <ExternalLink className="h-3 w-3" strokeWidth={1.8} />
    </Link>
  );
}
