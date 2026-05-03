import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit contact page — DevBooks Admin" };

export default async function EditContactPage({
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
          Contact page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Contact page"
        pageSubtitle="Hero copy and contact details (email, phone, hours, HQ)."
        publicHref="/contact"
        groups={groups}
        sections={[
          {
            key: "contact",
            title: "Hero & contact info",
            subtitle:
              "Hero text and the email / phone / hours / HQ shown across the site.",
          },
          {
            key: "contact_sidebar",
            title: "Sidebar copy",
            subtitle: "Dark left-side panel + form heading text.",
          },
        ]}
      />
    </>
  );
}
