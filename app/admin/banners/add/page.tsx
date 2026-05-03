import BannerForm from "@/components/admin/BannerForm";
import { addBannerAction } from "@/lib/actions";

export const metadata = { title: "Add banner — DevBooks Admin" };

export default function AddBannerPage() {
  return (
    <BannerForm
      action={addBannerAction}
      submitLabel="Create banner"
      title="Add a homepage banner"
      subtitle="Banners appear on the homepage in the order you set."
      defaults={{ is_active: true, display_order: 0 }}
    />
  );
}
