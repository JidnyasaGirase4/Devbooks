import Link from "next/link";
import Image from "next/image";
import { Plus, Edit3, Search } from "lucide-react";
import { getBooks, getCategories } from "@/lib/queries";
import DeleteBookButton from "@/components/admin/DeleteBookButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Books — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Book created successfully." },
  updated: { kind: "success", text: "Book updated." },
  deleted: { kind: "success", text: "Book deleted." },
};

export default async function AdminBooksPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const [books, categories] = await Promise.all([
    getBooks().catch(() => []),
    getCategories().catch(() => []),
  ]);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;
  const catEmoji = (slug: string) =>
    categories.find((c) => c.slug === slug)?.emoji ?? "📚";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Manage</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Books
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Showing{" "}
            <span className="font-semibold text-ink-900">{books.length}</span>{" "}
            {books.length === 1 ? "book" : "books"} from MySQL.
          </p>
        </div>
        <Link href="/admin/books/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add book
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      <div className="mt-8 overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 shadow-sm">
        {books.length === 0 ? (
          <div className="px-8 py-16 text-center">
            <div className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-ink-900/5 text-ink-700/60">
              <Search className="h-5 w-5" strokeWidth={1.8} />
            </div>
            <p className="display mt-4 text-xl font-semibold">
              No books yet.
            </p>
            <Link href="/admin/books/add" className="btn-primary mt-6 inline-flex">
              <Plus className="h-4 w-4" />
              Add book
            </Link>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-ink-900/10 bg-cream-100/40 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                    <th className="px-4 py-3">Cover</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Author</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Level</th>
                    <th className="px-4 py-3 text-right">Price</th>
                    <th className="px-4 py-3 text-right">Rating</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink-900/5">
                  {books.map((b) => (
                    <tr key={b.id} className="hover:bg-cream-100/50">
                      <td className="px-4 py-3">
                        <div className="relative h-14 w-10 overflow-hidden rounded-md ring-1 ring-ink-900/10">
                          {b.coverImage ? (
                            <Image
                              src={b.coverImage}
                              alt=""
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div
                              className={`h-full w-full bg-gradient-to-br ${b.cover}`}
                            />
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-ink-900">
                          {b.title}
                        </div>
                        <div className="font-mono text-[11px] text-ink-700/50">
                          {b.id}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ink-700/80">{b.author}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1 rounded-full bg-ink-900/5 px-2 py-0.5 text-xs">
                          {catEmoji(b.category)} {catName(b.category)}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-700/80">
                        {b.level}
                      </td>
                      <td className="px-4 py-3 text-right">
                        {b.price === 0 ? (
                          <span className="display font-semibold text-rose-600">
                            Free
                          </span>
                        ) : (
                          <span className="display font-semibold">
                            Rs {b.price.toFixed(0)}
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right text-xs">
                        <span className="font-semibold text-gold-600">
                          {b.rating.toFixed(1)}★
                        </span>{" "}
                        <span className="text-ink-700/50">({b.reviews})</span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/books/edit/${b.id}`}
                            className="inline-flex items-center gap-1 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                          >
                            <Edit3 className="h-3 w-3" strokeWidth={1.8} />
                            Edit
                          </Link>
                          <DeleteBookButton slug={b.id} title={b.title} />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <ul className="divide-y divide-ink-900/5 md:hidden">
              {books.map((b) => (
                <li key={b.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="relative h-20 w-14 flex-none overflow-hidden rounded-md ring-1 ring-ink-900/10">
                      {b.coverImage ? (
                        <Image
                          src={b.coverImage}
                          alt=""
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <div
                          className={`h-full w-full bg-gradient-to-br ${b.cover}`}
                        />
                      )}
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="display truncate text-base font-semibold">
                        {b.title}
                      </h3>
                      <div className="text-xs text-ink-700/70">{b.author}</div>
                      <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
                        <span className="rounded-full bg-ink-900/5 px-2 py-0.5">
                          {catEmoji(b.category)} {catName(b.category)}
                        </span>
                        <span className="rounded-full bg-ink-900/5 px-2 py-0.5">
                          {b.level}
                        </span>
                      </div>
                    </div>
                    <div className="display text-right text-base font-semibold">
                      {b.price === 0 ? (
                        <span className="text-rose-600">Free</span>
                      ) : (
                        <>Rs {b.price.toFixed(0)}</>
                      )}
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/admin/books/edit/${b.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800"
                    >
                      <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      Edit
                    </Link>
                    <DeleteBookButton slug={b.id} title={b.title} />
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
