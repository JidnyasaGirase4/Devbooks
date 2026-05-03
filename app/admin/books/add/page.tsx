import BookForm from "@/components/admin/BookForm";
import { addBookAction } from "@/lib/actions";
import { getCategories } from "@/lib/queries";

export const metadata = { title: "Add book — DevBooks Admin" };
export const dynamic = "force-dynamic";

export default async function AddBookPage() {
  const categories = await getCategories().catch(() => []);
  return (
    <BookForm
      action={addBookAction}
      categories={categories}
      submitLabel="Create book"
      title="Add a new book"
      subtitle="Public site refreshes instantly after creation."
    />
  );
}
