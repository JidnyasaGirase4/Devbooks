import Link from "next/link";
import { Plus, Edit3, Quote } from "lucide-react";
import { getTestimonials } from "@/lib/queries";
import { deleteTestimonialAction } from "@/lib/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Testimonials — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Testimonial created." },
  updated: { kind: "success", text: "Testimonial updated." },
  deleted: { kind: "success", text: "Testimonial deleted." },
};

export default async function AdminTestimonialsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const items = await getTestimonials().catch(() => []);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Site CMS</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Testimonials
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            Quotes shown on the homepage. Toggle <em>Active</em> on individual
            ones to hide them without deleting.
          </p>
        </div>
        <Link href="/admin/testimonials/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add testimonial
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">
            No testimonials yet.
          </div>
          <Link href="/admin/testimonials/add" className="btn-primary mt-6 inline-flex">
            <Plus className="h-4 w-4" />
            Add testimonial
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((t) => (
            <li
              key={t.id}
              className={`relative flex flex-col rounded-3xl border bg-cream-50 p-6 shadow-sm ${
                t.is_active
                  ? "border-ink-900/10"
                  : "border-rose-200 opacity-70"
              }`}
            >
              <Quote className="h-7 w-7 text-gold-400/70" strokeWidth={1.5} />
              <blockquote className="mt-3 text-sm text-ink-800/90">
                {t.quote}
              </blockquote>
              <div className="mt-4 flex items-center gap-3">
                <span
                  className={`h-9 w-9 rounded-full bg-gradient-to-br ${t.accent}`}
                />
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-semibold text-ink-900">
                    {t.name}
                  </div>
                  <div className="text-xs text-ink-700/60">{t.role ?? "—"}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    t.is_active
                      ? "bg-brand-500/15 text-brand-800"
                      : "bg-ink-900/10 text-ink-700"
                  }`}
                >
                  {t.is_active ? "Live" : "Hidden"}
                </span>
              </div>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/admin/testimonials/edit/${t.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                >
                  <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteTestimonialAction}
                  hiddenFields={{ id: t.id }}
                  itemLabel={`the testimonial from ${t.name}`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
