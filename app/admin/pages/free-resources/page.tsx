import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit free resources page — DevBooks Admin" };

export default async function EditFreeResourcesPage({
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
          Free resources page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Free resources page"
        pageSubtitle="Edit the hero and the newsletter card. Add resources themselves in /admin/resources."
        publicHref="/free-resources"
        groups={groups}
        sections={[
          {
            key: "freeResources",
            title: "Hero",
            subtitle: "Eyebrow, title and subtitle.",
          },
          {
            key: "freeResources_extra",
            title: "Newsletter card",
            subtitle: "The pink card at the bottom of the page.",
          },
        ]}
      />
    </>
  );
}
