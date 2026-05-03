import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit register page — DevBooks Admin" };

export default async function EditRegisterPage({
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
          Register page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Register page"
        pageSubtitle="Form copy + the 3 left-panel feature pitches."
        publicHref="/register"
        groups={groups}
        sections={[
          {
            key: "register",
            title: "Register text",
            subtitle: "Hero copy, labels, button and the left-panel checklist.",
          },
        ]}
      />
    </>
  );
}
