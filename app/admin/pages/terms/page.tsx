import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit terms — DevBooks Admin" };

export default async function EditTermsPage({
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
          Terms saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Terms & conditions"
        pageSubtitle="Hero text and the full body. The body supports Markdown — use ## for section headings and - for bullet lists."
        publicHref="/terms"
        groups={groups}
        sections={[
          {
            key: "terms",
            title: "Terms content",
            subtitle: "Eyebrow, title, subtitle, last-updated and body.",
          },
        ]}
      />
    </>
  );
}
