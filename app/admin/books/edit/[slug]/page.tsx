import { notFound } from "next/navigation";
import BookForm from "@/components/admin/BookForm";
import { updateBookAction, type BookFormState } from "@/lib/actions";
import { getBookBySlug, getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const book = await getBookBySlug(params.slug).catch(() => null);
  return {
    title: book
      ? `Edit ${book.title} — DevBooks Admin`
      : "Edit book — DevBooks Admin",
  };
}

export default async function EditBookPage({
  params,
}: {
  params: { slug: string };
}) {
  const slug = params.slug;
  const [book, categories] = await Promise.all([
    getBookBySlug(slug).catch(() => null),
    getCategories().catch(() => []),
  ]);
  if (!book) notFound();

  const boundAction = async (
    prev: BookFormState,
    formData: FormData
  ): Promise<BookFormState> => {
    "use server";
    return updateBookAction(slug, prev, formData);
  };

  return (
    <BookForm
      action={boundAction}
      categories={categories}
      submitLabel="Save changes"
      title={`Edit "${book.title}"`}
      subtitle="Changes apply to the public site instantly."
      defaults={{
        slug: book.id,
        title: book.title,
        author: book.author,
        category: book.category,
        level: book.level,
        price: book.price,
        oldPrice: book.oldPrice,
        rating: book.rating,
        reviews: book.reviews,
        cover: book.cover,
        coverImage: book.coverImage,
        badge: book.badge,
        description: book.description,
      }}
    />
  );
}
