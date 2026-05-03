import { notFound } from "next/navigation";
import TestimonialForm from "@/components/admin/TestimonialForm";
import {
  updateTestimonialAction,
  type TestimonialFormState,
} from "@/lib/actions";
import { getTestimonialById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditTestimonialPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const t = await getTestimonialById(id).catch(() => null);
  if (!t) notFound();

  const boundAction = async (
    prev: TestimonialFormState,
    formData: FormData
  ): Promise<TestimonialFormState> => {
    "use server";
    return updateTestimonialAction(id, prev, formData);
  };

  return (
    <TestimonialForm
      action={boundAction}
      submitLabel="Save changes"
      title={`Edit "${t.name}"`}
      defaults={{
        quote: t.quote,
        name: t.name,
        role: t.role,
        accent: t.accent,
        display_order: t.display_order,
        is_active: t.is_active,
      }}
    />
  );
}
