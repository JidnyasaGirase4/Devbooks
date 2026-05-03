import SettingsForm from "@/components/admin/SettingsForm";
import StatusBanner from "@/components/admin/StatusBanner";
import { getSettings } from "@/lib/queries";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Settings — DevBooks Admin" };

export default async function AdminSettingsPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const settings = await getSettings().catch(() => []);

  // Group by `group`
  const groups: Record<string, typeof settings> = {};
  for (const s of settings) {
    (groups[s.group] ||= []).push(s);
  }

  const saved = searchParams?.status === "saved";

  return (
    <div>
      <div>
        <span className="eyebrow inline-flex">Site CMS</span>
        <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
          Site settings
        </h1>
        <p className="mt-1 text-sm text-ink-700/70">
          Edit any text used across the public site. Changes apply instantly.
        </p>
      </div>

      {saved && (
        <StatusBanner kind="success" className="mt-6">
          Settings saved.
        </StatusBanner>
      )}

      <SettingsForm groups={groups} />
    </div>
  );
}
