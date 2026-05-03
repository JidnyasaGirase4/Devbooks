import Link from "next/link";
import { Plus, Edit3, Search, Layers } from "lucide-react";
import {
  getBooks,
  getCategories,
} from "@/lib/queries";
import DeleteCategoryButton from "@/components/admin/DeleteCategoryButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Categories — DevBooks Admin" };

const STATUS: Record<
  string,
  { kind: "success" | "error"; text: string }
> = {
  added: { kind: "success", text: "Category created." },
  updated: { kind: "success", text: "Category updated." },
  deleted: { kind: "success", text: "Category deleted." },
  fk_block: {
    kind: "error",
    text: "Can't delete — books still reference this category.",
  },
};

export default async function AdminCategoriesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const [categories, books] = await Promise.all([
    getCategories().catch(() => []),
    getBooks().catch(() => []),
  ]);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  // Count books per category
  const counts = books.reduce<Record<string, number>>((acc, b) => {
    acc[b.category] = (acc[b.category] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Manage</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Categories
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Showing{" "}
            <span className="font-semibold text-ink-900">
              {categories.length}
            </span>{" "}
            {categories.length === 1 ? "category" : "categories"} from MySQL.
          </p>
        </div>
        <Link href="/admin/categories/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add category
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 shadow-sm">
        {categories.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5 text-ink-700/60">
              <Search className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <p className="display mt-4 text-xl font-semibold">
              No categories yet.
            </p>
            <Link href="/admin/categories/add" className="btn-primary mt-6 inline-flex">
              <Plus className="h-4 w-4" />
              Add category
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/10 bg-cream-100/40 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                    <th className="px-6 py-3">Slug</th>
                    <th className="px-6 py-3">Name</th>
                    <th className="px-6 py-3">Tagline</th>
                    <th className="px-6 py-3 text-right">Books</th>
                    <th className="px-6 py-3 text-right">Order</th>
                    <th className="px-6 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/5">
                  {categories.map((c) => {
                    const usedByBooks = (counts[c.slug] ?? 0) > 0;
                    return (
                      <tr key={c.slug} className="hover:bg-cream-100/50">
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-2 rounded-full bg-ink-900/5 px-2.5 py-1 font-mono text-xs text-ink-800">
                            {c.emoji} {c.slug}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-semibold text-ink-900">
                          {c.name}
                        </td>
                        <td className="max-w-md px-6 py-4 text-ink-700/80">
                          <span className="line-clamp-2">{c.tagline}</span>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="display font-semibold">
                            {counts[c.slug] ?? 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-right text-xs text-ink-700/60">
                          —
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/categories/edit/${c.slug}`}
                              className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                            >
                              <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                              Edit
                            </Link>
                            <DeleteCategoryButton
                              slug={c.slug}
                              name={c.name}
                              hasBooks={usedByBooks}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-ink-900/5 md:hidden">
              {categories.map((c) => {
                const usedByBooks = (counts[c.slug] ?? 0) > 0;
                return (
                  <li key={c.slug} className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="text-2xl">{c.emoji || "📚"}</div>
                      <div className="min-w-0 flex-1">
                        <h3 className="display truncate text-base font-semibold">
                          {c.name}
                        </h3>
                        <p className="line-clamp-2 text-xs text-ink-700/70">
                          {c.tagline}
                        </p>
                        <div className="mt-2 inline-flex items-center gap-1.5 text-[11px] text-ink-700/60">
                          <Layers className="h-3 w-3" />
                          {counts[c.slug] ?? 0} books
                        </div>
                      </div>
                    </div>
                    <div className="mt-3 flex items-center gap-2">
                      <Link
                        href={`/admin/categories/edit/${c.slug}`}
                        className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800"
                      >
                        <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                        Edit
                      </Link>
                      <DeleteCategoryButton
                        slug={c.slug}
                        name={c.name}
                        hasBooks={usedByBooks}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
