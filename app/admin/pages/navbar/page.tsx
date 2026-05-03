import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit navbar — DevBooks Admin" };

export default async function EditNavbarPage({
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
          Navbar saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Navbar"
        pageSubtitle="Login button, sign-up button, search placeholder."
        groups={groups}
        sections={[
          {
            key: "navbar",
            title: "Navbar text",
            subtitle: "Labels and placeholders shown on every page.",
          },
        ]}
      />
    </>
  );
}
