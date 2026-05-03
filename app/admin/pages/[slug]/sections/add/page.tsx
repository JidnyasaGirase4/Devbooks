import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import SectionForm from "@/components/admin/SectionForm";
import {
  addSectionAction,
  type SectionFormState,
} from "@/lib/actions";
import { PAGE_DEFINITIONS, SECTION_TYPES, getSectionMeta } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default function AddSectionPage({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { type?: string };
}) {
  const page = PAGE_DEFINITIONS.find((p) => p.slug === params.slug);
  if (!page) notFound();

  // Step 1: pick a type
  const type = searchParams?.type;
  if (!type || !getSectionMeta(type)) {
    return <TypePicker pageSlug={page.slug} pageTitle={page.title} />;
  }

  // Step 2: render the form for that type
  const meta = getSectionMeta(type);
  const boundAction = async (
    prev: SectionFormState,
    formData: FormData
  ): Promise<SectionFormState> => {
    "use server";
    return addSectionAction(page.slug, prev, formData);
  };

  return (
    <SectionForm
      action={boundAction}
      type={type}
      pageSlug={page.slug}
      pageTitle={page.title}
      submitLabel="Create section"
      defaults={{ is_active: true, content: meta?.defaults ?? {} }}
    />
  );
}

function TypePicker({
  pageSlug,
  pageTitle,
}: {
  pageSlug: string;
  pageTitle: string;
}) {
  return (
    <div>
      <Link
        href={`/admin/pages/${pageSlug}/sections`}
        className="inline-flex items-center gap-1 text-sm font-medium text-ink-700 hover:text-brand-700"
      >
        <ArrowLeft className="h-4 w-4" strokeWidth={2} />
        Back to {pageTitle} sections
      </Link>
      <div className="mt-3">
        <span className="eyebrow inline-flex">Page builder</span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          Pick a section type
        </h1>
        <p className="mt-1 text-sm text-ink-700/70">
          Choose what kind of section to add to{" "}
          <span className="font-semibold text-ink-900">{pageTitle}</span>.
        </p>
      </div>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTION_TYPES.map((s) => (
          <Link
            key={s.type}
            href={`/admin/pages/${pageSlug}/sections/add?type=${s.type}`}
            className="group rounded-3xl border border-ink-900/10 bg-cream-50 p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-700/60">
              {s.type}
            </div>
            <h2 className="display mt-1 text-lg font-semibold text-ink-900">
              {s.label}
            </h2>
            <p className="mt-1 text-sm text-ink-700/80">{s.description}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
              Use this →
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
