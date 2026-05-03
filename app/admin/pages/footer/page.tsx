import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit footer — DevBooks Admin" };

export default async function EditFooter({
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
          Footer saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Footer"
        pageSubtitle="Edit the description, copyright, brand name and social URLs."
        groups={groups}
        sections={[
          {
            key: "brand",
            title: "Brand",
            subtitle: "Site name and tagline.",
          },
          {
            key: "newsletter",
            title: "Newsletter card",
            subtitle: "The big card at the top of the footer.",
          },
          {
            key: "footer",
            title: "Footer text & links",
            subtitle: "Description, copyright and social URLs.",
          },
        ]}
      />
    </>
  );
}
