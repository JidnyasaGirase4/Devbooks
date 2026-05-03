import ResourceForm from "@/components/admin/ResourceForm";
import { addResourceAction } from "@/lib/actions";
import { getCategories } from "@/lib/queries";

export const metadata = { title: "Add resource — DevBooks Admin" };
export const dynamic = "force-dynamic";

export default async function AddResourcePage() {
  const categories = await getCategories().catch(() => []);
  return (
    <ResourceForm
      action={addResourceAction}
      categories={categories}
      submitLabel="Create resource"
      title="Add a free resource"
      defaults={{ type: "PDF", is_active: true, display_order: 0 }}
    />
  );
}
