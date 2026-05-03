import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit login page — DevBooks Admin" };

export default async function EditLoginPage({
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
          Login page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Login page"
        pageSubtitle="Form labels, left panel quote and supporting copy."
        publicHref="/login"
        groups={groups}
        sections={[
          {
            key: "login",
            title: "Login text",
            subtitle: "Hero, form labels, divider and left-panel quote.",
          },
        ]}
      />
    </>
  );
}
