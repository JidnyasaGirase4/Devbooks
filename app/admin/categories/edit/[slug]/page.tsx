import { notFound } from "next/navigation";
import CategoryForm from "@/components/admin/CategoryForm";
import {
  updateCategoryAction,
  type CategoryFormState,
} from "@/lib/actions";
import { getCategoryBySlug } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const cat = await getCategoryBySlug(params.slug).catch(() => null);
  return {
    title: cat
      ? `Edit ${cat.name} — DevBooks Admin`
      : "Edit category — DevBooks Admin",
  };
}

export default async function EditCategoryPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const cat = await getCategoryBySlug(slug).catch(() => null);
  if (!cat) notFound();

  const boundAction = async (
    prev: CategoryFormState,
    formData: FormData
  ): Promise<CategoryFormState> => {
    "use server";
    return updateCategoryAction(slug, prev, formData);
  };

  return (
    <CategoryForm
      action={boundAction}
      submitLabel="Save changes"
      title={`Edit "${cat.name}"`}
      subtitle="Changes apply to the public site instantly."
      defaults={{
        slug: cat.slug,
        name: cat.name,
        tagline: cat.tagline,
        description: cat.description,
        emoji: cat.emoji,
        image: cat.image,
        accent: cat.accent,
        count: cat.count,
        display_order: 0,
      }}
    />
  );
}
