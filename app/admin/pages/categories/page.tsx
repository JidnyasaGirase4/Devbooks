import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit categories page — DevBooks Admin" };

export default async function EditCategoriesPage({
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
          Categories page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Categories page"
        pageSubtitle="Edit the hero on /categories. Manage categories themselves in /admin/categories."
        publicHref="/categories"
        groups={groups}
        sections={[
          {
            key: "categories",
            title: "Hero",
            subtitle: "Eyebrow, title and subtitle on /categories.",
          },
        ]}
      />
    </>
  );
}
