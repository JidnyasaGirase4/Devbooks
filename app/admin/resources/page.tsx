import Link from "next/link";
import { Plus, Edit3, FileText, Video, GraduationCap, BookOpen } from "lucide-react";
import { getCategories, getResources } from "@/lib/queries";
import { deleteResourceAction } from "@/lib/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Resources — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Resource added." },
  updated: { kind: "success", text: "Resource updated." },
  deleted: { kind: "success", text: "Resource deleted." },
};

const TYPE_ICONS = {
  PDF: FileText,
  Cheatsheet: BookOpen,
  Course: GraduationCap,
  Video: Video,
};

const TYPE_COLORS: Record<string, string> = {
  PDF: "from-rose-500 to-pink-600",
  Cheatsheet: "from-gold-500 to-orange-500",
  Course: "from-brand-500 to-teal-600",
  Video: "from-cyan-500 to-sky-600",
};

export default async function AdminResourcesPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const [items, categories] = await Promise.all([
    getResources().catch(() => []),
    getCategories().catch(() => []),
  ]);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  const catName = (slug: string | null) =>
    slug ? categories.find((c) => c.slug === slug)?.name ?? slug : "—";

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Site CMS</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Free resources
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Cheatsheets, PDFs, courses and videos shown on /free-resources.
          </p>
        </div>
        <Link href="/admin/resources/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add resource
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">No resources yet.</div>
          <Link href="/admin/resources/add" className="btn-primary mt-6 inline-flex">
            <Plus className="h-4 w-4" />
            Add resource
          </Link>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-3xl border border-ink-900/10 bg-cream-50 shadow-sm">
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-ink-900/10 bg-cream-100/40 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Title</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3 text-right">Order</th>
                  <th className="px-4 py-3 text-right">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-ink-900/5">
                {items.map((r) => {
                  const Icon = TYPE_ICONS[r.type];
                  return (
                    <tr key={r.id} className="hover:bg-cream-100/50">
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r ${TYPE_COLORS[r.type]} px-2.5 py-1 text-[11px] font-semibold text-white shadow-sm`}
                        >
                          <Icon className="h-3 w-3" strokeWidth={2} />
                          {r.type}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-semibold text-ink-900">
                          {r.title}
                        </div>
                        <div className="line-clamp-1 text-xs text-ink-700/60">
                          {r.description ?? "—"}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs text-ink-700/80">
                        {catName(r.category_slug)}
                      </td>
                      <td className="px-4 py-3 text-right text-xs">
                        {r.display_order}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            r.is_active
                              ? "bg-brand-500/15 text-brand-800"
                              : "bg-ink-900/10 text-ink-700"
                          }`}
                        >
                          {r.is_active ? "Live" : "Hidden"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/admin/resources/edit/${r.id}`}
                            className="inline-flex items-center gap-1 rounded-full bg-ink-900/5 px-2.5 py-1 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                          >
                            <Edit3 className="h-3 w-3" strokeWidth={1.8} />
                            Edit
                          </Link>
                          <ConfirmDeleteButton
                            action={deleteResourceAction}
                            hiddenFields={{ id: r.id }}
                            itemLabel={`the resource "${r.title}"`}
                            size="small"
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
            {items.map((r) => {
              const Icon = TYPE_ICONS[r.type];
              return (
                <li key={r.id} className="p-4">
                  <div className="flex items-start gap-3">
                    <span
                      className={`inline-flex h-9 w-9 flex-none items-center justify-center rounded-xl bg-gradient-to-br ${TYPE_COLORS[r.type]} text-white shadow-md`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2} />
                    </span>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="rounded-full bg-ink-900/5 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                          {r.type}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                            r.is_active
                              ? "bg-brand-500/15 text-brand-800"
                              : "bg-ink-900/10 text-ink-700"
                          }`}
                        >
                          {r.is_active ? "Live" : "Hidden"}
                        </span>
                      </div>
                      <h3 className="display mt-1 text-base font-semibold text-ink-900">
                        {r.title}
                      </h3>
                      <p className="line-clamp-2 text-xs text-ink-700/70">
                        {r.description ?? "—"}
                      </p>
                      <div className="mt-1 text-[11px] text-ink-700/60">
                        {catName(r.category_slug)} · order {r.display_order}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <Link
                      href={`/admin/resources/edit/${r.id}`}
                      className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800"
                    >
                      <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                      Edit
                    </Link>
                    <ConfirmDeleteButton
                      action={deleteResourceAction}
                      hiddenFields={{ id: r.id }}
                      itemLabel={`the resource "${r.title}"`}
                      size="small"
                    />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
