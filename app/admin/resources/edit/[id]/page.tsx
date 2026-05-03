import { notFound } from "next/navigation";
import ResourceForm from "@/components/admin/ResourceForm";
import { updateResourceAction, type ResourceFormState } from "@/lib/actions";
import { getCategories, getResourceById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditResourcePage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();
  const [r, categories] = await Promise.all([
    getResourceById(id).catch(() => null),
    getCategories().catch(() => []),
  ]);
  if (!r) notFound();

  const boundAction = async (
    prev: ResourceFormState,
    formData: FormData
  ): Promise<ResourceFormState> => {
    "use server";
    return updateResourceAction(id, prev, formData);
  };

  return (
    <ResourceForm
      action={boundAction}
      categories={categories}
      submitLabel="Save changes"
      title={`Edit "${r.title}"`}
      defaults={{
        title: r.title,
        description: r.description,
        type: r.type,
        category_slug: r.category_slug,
        href: r.href,
        display_order: r.display_order,
        is_active: r.is_active,
      }}
    />
  );
}
