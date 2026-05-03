import LoginPageClient from "@/components/LoginPageClient";
import { getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "Sign in — DevBooks",
};

export default async function LoginPage() {
  const settings = await getSettingsMap().catch(() => ({}));
  return <LoginPageClient settings={settings} />;
}
