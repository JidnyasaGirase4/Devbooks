import { notFound } from "next/navigation";
import SectionForm from "@/components/admin/SectionForm";
import {
  updateSectionAction,
  type SectionFormState,
} from "@/lib/actions";
import { getSectionById } from "@/lib/queries";
import { PAGE_DEFINITIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function EditSectionPage({
  params,
}: {
  params: { slug: string; id: string };
}) {
  const page = PAGE_DEFINITIONS.find((p) => p.slug === params.slug);
  if (!page) notFound();

  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const section = await getSectionById(id).catch(() => null);
  if (!section || section.page_slug !== page.slug) notFound();

  const boundAction = async (
    prev: SectionFormState,
    formData: FormData
  ): Promise<SectionFormState> => {
    "use server";
    return updateSectionAction(id, page.slug, section.section_type, prev, formData);
  };

  return (
    <SectionForm
      action={boundAction}
      type={section.section_type}
      pageSlug={page.slug}
      pageTitle={page.title}
      submitLabel="Save changes"
      defaults={{ is_active: section.is_active, content: section.content }}
    />
  );
}
