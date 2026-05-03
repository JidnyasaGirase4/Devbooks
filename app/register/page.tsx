import RegisterPageClient from "@/components/RegisterPageClient";
import { getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Create account — DevBooks",
};

export default async function RegisterPage() {
  const settings = await getSettingsMap().catch(() => ({}));
  return <RegisterPageClient settings={settings} />;
}
