import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit cart page — DevBooks Admin" };

export default async function EditCartPage({
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
          Cart page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Cart page"
        pageSubtitle="Title, summary labels, trust badges and the order-placed success state."
        publicHref="/cart"
        groups={groups}
        sections={[
          {
            key: "cart",
            title: "Cart text",
            subtitle: "Every label, button and message on /cart.",
          },
        ]}
      />
    </>
  );
}
