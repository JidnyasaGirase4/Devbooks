import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit books page — DevBooks Admin" };

export default async function EditBooksPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const groups = await loadGroupedSettings();
  const saved = searchParams?.status === "saved";

  return (
    <>
      {saved && (
        <StatusBanner kind="success" className="mb-6">
          Books page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Books page"
        pageSubtitle="Edit the hero on /books. Manage actual books in /admin/books."
        publicHref="/books"
        groups={groups}
        sections={[
          {
            key: "books",
            title: "Hero",
            subtitle: "Eyebrow, title and subtitle on /books.",
          },
        ]}
      />
    </>
  );
}
