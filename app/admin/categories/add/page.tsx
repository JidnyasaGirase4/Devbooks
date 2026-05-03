import CategoryForm from "@/components/admin/CategoryForm";
import { addCategoryAction } from "@/lib/actions";

export const metadata = { title: "Add category — DevBooks Admin" };

export default function AddCategoryPage() {
  return (
    <CategoryForm
      action={addCategoryAction}
      submitLabel="Create category"
      title="Add a new category"
      subtitle="Public pages refresh instantly after creation."
    />
  );
}
