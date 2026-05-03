import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit about page — DevBooks Admin" };

export default async function EditAboutPage({
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
          About page saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="About page"
        pageSubtitle="Hero copy, mission statement, stats, values and team header."
        publicHref="/about"
        groups={groups}
        sections={[
          {
            key: "about",
            title: "Hero & mission",
            subtitle: "Eyebrow, title, intro and the mission section text.",
          },
          {
            key: "about_strip",
            title: "Image strip",
            subtitle: "Three photos with captions shown below the hero.",
          },
          {
            key: "about_stats",
            title: "Stats",
            subtitle: "Four numbers shown under the hero.",
          },
          {
            key: "about_values",
            title: "Values",
            subtitle: "Four cards shown beside the mission text.",
          },
          {
            key: "about_team",
            title: "Team header",
            subtitle: "Add or remove members in /admin/team.",
          },
          {
            key: "about_cta",
            title: "Final CTA",
            subtitle: "The dark panel at the bottom of the page.",
          },
        ]}
      />
    </>
  );
}
