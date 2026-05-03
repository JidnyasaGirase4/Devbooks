import PageContentForm from "@/components/admin/PageContentForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { loadGroupedSettings } from "@/lib/page-editors";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Edit homepage — DevBooks Admin" };

export default async function EditHomepage({
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
          Homepage saved.
        </StatusBanner>
      )}
      <PageContentForm
        pageTitle="Homepage"
        pageSubtitle="All copy on the public homepage."
        publicHref="/"
        groups={groups}
        sections={[
          {
            key: "hero",
            title: "Hero",
            subtitle: "Top section with headline and CTAs.",
          },
          {
            key: "home_hero_extra",
            title: "Hero extras",
            subtitle:
              "Hero parallax image, trust caption, and the 4 floating tile labels.",
          },
          {
            key: "home_stats",
            title: "Stats strip",
            subtitle: "Four numbers shown under the hero.",
          },
          {
            key: "home_whyus",
            title: "Why DevBooks",
            subtitle: "Section header + four feature cards.",
          },
          {
            key: "home_whyus_extra",
            title: "Why-us image & quote",
            subtitle: "The image and floating testimonial card.",
          },
          {
            key: "home_testimonials",
            title: "Testimonials header",
            subtitle: "Edit individual testimonials in /admin/testimonials.",
          },
          {
            key: "home_cta",
            title: "Final CTA",
            subtitle: "Bottom call-to-action panel.",
          },
          {
            key: "home_cta_extra",
            title: "CTA image & badge",
            subtitle: "The image, free-books badge and secondary button.",
          },
          {
            key: "sections",
            title: "Section toggles",
            subtitle: "Type yes/no to show or hide whole sections.",
          },
        ]}
      />
    </>
  );
}
