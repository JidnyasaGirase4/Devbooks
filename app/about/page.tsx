import AboutClient from "@/components/AboutClient";
import { getActiveTeamMembers, getSettingsMap } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = {
  title: "About — DevBooks",
};

export default async function AboutPage() {
  const [settings, team] = await Promise.all([
    getSettingsMap().catch(() => ({})),
    getActiveTeamMembers().catch(() => []),
  ]);
  return <AboutClient settings={settings} team={team} />;
}
