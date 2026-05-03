import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Plus,
  Edit3,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  ExternalLink,
  ArrowLeft,
} from "lucide-react";
import { getPageSections } from "@/lib/queries";
import { PAGE_DEFINITIONS, getSectionMeta } from "@/lib/sections";
import {
  deleteSectionAction,
  moveSectionAction,
  toggleSectionAction,
} from "@/lib/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Section added." },
  updated: { kind: "success", text: "Section updated." },
  deleted: { kind: "success", text: "Section deleted." },
  reordered: { kind: "success", text: "Sections reordered." },
  toggled: { kind: "success", text: "Section visibility toggled." },
};

export async function generateStaticParams() {
  return PAGE_DEFINITIONS.map((p) => ({ slug: p.slug }));
}

export default async function PageSectionsList({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { status?: string };
}) {
  const page = PAGE_DEFINITIONS.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const sections = await getPageSections(page.slug).catch(() => []);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  return (
    <div>
      <Link
        href="/admin/pages"
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        All pages
      </Link>

      <div className="mt-3 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Page builder</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            {page.title}
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Add, edit, reorder or hide any section. Changes go live instantly.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={page.publicHref}
            target="_blank"
            className="btn-outline text-xs"
          >
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={1.8} />
            View public
          </Link>
          <Link
            href={`/admin/pages/${page.slug}/sections/add`}
            className="btn-primary"
          >
            <Plus className="h-4 w-4" />
            Add section
          </Link>
        </div>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      {sections.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">
            No sections yet — empty page.
          </div>
          <Link
            href={`/admin/pages/${page.slug}/sections/add`}
            className="btn-primary mt-6 inline-flex"
          >
            <Plus className="h-4 w-4" />
            Add first section
          </Link>
        </div>
      ) : (
        <ol className="mt-8 space-y-3">
          {sections.map((s, i) => {
            const meta = getSectionMeta(s.section_type);
            const isFirst = i === 0;
            const isLast = i === sections.length - 1;
            const title = pickTitle(s.content, meta?.label ?? s.section_type);
            return (
              <li
                key={s.id}
                className={`group flex flex-col gap-3 rounded-2xl border bg-cream-50 p-4 shadow-sm sm:flex-row sm:items-center ${
                  s.is_active
                    ? "border-ink-900/10"
                    : "border-rose-200 opacity-70"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex flex-col gap-1">
                    <ReorderButton
                      id={s.id}
                      pageSlug={page.slug}
                      direction="up"
                      disabled={isFirst}
                    />
                    <ReorderButton
                      id={s.id}
                      pageSlug={page.slug}
                      direction="down"
                      disabled={isLast}
                    />
                  </div>

                  <span className="hidden text-[10px] font-mono text-ink-700/50 sm:inline">
                    #{i + 1}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-brand-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-800">
                        {meta?.label ?? s.section_type}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          s.is_active
                            ? "bg-brand-500/15 text-brand-800"
                            : "bg-ink-900/10 text-ink-700"
                        }`}
                      >
                        {s.is_active ? "Live" : "Hidden"}
                      </span>
                    </div>
                    <div className="display mt-1 truncate text-base font-semibold">
                      {title}
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 sm:ml-auto sm:flex-nowrap">
                  <form action={toggleSectionAction}>
                    <input type="hidden" name="id" value={s.id} />
                    <input
                      type="hidden"
                      name="page_slug"
                      value={page.slug}
                    />
                    <button
                      type="submit"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink-900/5 text-ink-800 transition-colors hover:bg-ink-900 hover:text-cream-50"
                      title={s.is_active ? "Hide" : "Show"}
                    >
                      {s.is_active ? (
                        <EyeOff className="h-3.5 w-3.5" strokeWidth={1.8} />
                      ) : (
                        <Eye className="h-3.5 w-3.5" strokeWidth={1.8} />
                      )}
                    </button>
                  </form>

                  <Link
                    href={`/admin/pages/${page.slug}/sections/edit/${s.id}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                  >
                    <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                    Edit
                  </Link>

                  <ConfirmDeleteButton
                    action={deleteSectionAction}
                    hiddenFields={{ id: s.id, page_slug: page.slug }}
                    itemLabel={`the ${meta?.label ?? s.section_type} section`}
                    size="small"
                  />
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

function ReorderButton({
  id,
  pageSlug,
  direction,
  disabled,
}: {
  id: number;
  pageSlug: string;
  direction: "up" | "down";
  disabled?: boolean;
}) {
  return (
    <form action={moveSectionAction}>
      <input type="hidden" name="id" value={id} />
      <input type="hidden" name="page_slug" value={pageSlug} />
      <input type="hidden" name="direction" value={direction} />
      <button
        type="submit"
        disabled={disabled}
        title={direction === "up" ? "Move up" : "Move down"}
        className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-ink-900/5 text-ink-700 transition-colors hover:bg-ink-900 hover:text-cream-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-ink-900/5 disabled:hover:text-ink-700"
      >
        {direction === "up" ? (
          <ArrowUp className="h-3 w-3" strokeWidth={2} />
        ) : (
          <ArrowDown className="h-3 w-3" strokeWidth={2} />
        )}
      </button>
    </form>
  );
}

function pickTitle(content: Record<string, unknown>, fallback: string) {
  const t = content.title;
  if (typeof t === "string" && t.trim()) return t.trim();
  const e = content.eyebrow;
  if (typeof e === "string" && e.trim()) return e.trim();
  return fallback;
}
