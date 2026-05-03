import { notFound } from "next/navigation";
import BannerForm from "@/components/admin/BannerForm";
import { updateBannerAction, type BannerFormState } from "@/lib/actions";
import { getBannerById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditBannerPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();

  const banner = await getBannerById(id).catch(() => null);
  if (!banner) notFound();

  const boundAction = async (
    prev: BannerFormState,
    formData: FormData
  ): Promise<BannerFormState> => {
    "use server";
    return updateBannerAction(id, prev, formData);
  };

  return (
    <BannerForm
      action={boundAction}
      submitLabel="Save changes"
      title={`Edit "${banner.title}"`}
      subtitle="Live previews — update and the homepage refreshes instantly."
      defaults={{
        title: banner.title,
        subtitle: banner.subtitle,
        image_url: banner.image_url,
        link_url: banner.link_url,
        link_label: banner.link_label,
        display_order: banner.display_order,
        is_active: banner.is_active,
      }}
    />
  );
}
