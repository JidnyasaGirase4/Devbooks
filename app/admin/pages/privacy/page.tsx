import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit privacy policy — DevBooks Admin" };

export default async function EditPrivacyPage({
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
          Privacy policy saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Privacy policy"
        pageSubtitle="Hero text and the full body. The body supports Markdown — use ## for section headings and - for bullet lists."
        publicHref="/privacy-policy"
        groups={groups}
        sections={[
          {
            key: "privacy",
            title: "Privacy policy content",
            subtitle: "Eyebrow, title, subtitle, last-updated and body.",
          },
        ]}
      />
    </>
  );
}
