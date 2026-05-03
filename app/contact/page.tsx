import ContactClient from "@/components/ContactClient";
import { getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Contact — DevBooks",
};

export default async function ContactPage() {
  const settings = await getSettingsMap().catch(() => ({}));
  return <ContactClient settings={settings} />;
}
