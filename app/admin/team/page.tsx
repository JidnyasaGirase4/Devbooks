import Link from "next/link";
import { Plus, Edit3 } from "lucide-react";
import { getTeamMembers } from "@/lib/queries";
import { deleteTeamAction } from "@/lib/actions";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import StatusBanner from "@/components/admin/StatusBanner";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata = { title: "Team — DevBooks Admin" };

const STATUS: Record<string, { kind: "success"; text: string }> = {
  added: { kind: "success", text: "Team member added." },
  updated: { kind: "success", text: "Team member updated." },
  deleted: { kind: "success", text: "Team member removed." },
};

export default async function AdminTeamPage({
  searchParams,
}: {
  searchParams: { status?: string };
}) {
  const items = await getTeamMembers().catch(() => []);
  const banner =
    searchParams?.status && STATUS[searchParams.status]
      ? STATUS[searchParams.status]
      : null;

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow inline-flex">Site CMS</span>
          <h1 className="display mt-2 text-3xl font-semibold sm:text-4xl">
            Team
          </h1>
          <p className="mt-1 text-sm text-ink-700/70">
            People shown on the about page.
          </p>
        </div>
        <Link href="/admin/team/add" className="btn-primary">
          <Plus className="h-4 w-4" />
          Add member
        </Link>
      </div>

      {banner && (
        <StatusBanner kind={banner.kind} className="mt-6">
          {banner.text}
        </StatusBanner>
      )}

      {items.length === 0 ? (
        <div className="mt-8 rounded-3xl border border-dashed border-ink-900/15 bg-cream-50 p-16 text-center">
          <div className="display text-2xl text-ink-900">No team members.</div>
          <Link href="/admin/team/add" className="btn-primary mt-6 inline-flex">
            <Plus className="h-4 w-4" />
            Add member
          </Link>
        </div>
      ) : (
        <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((m) => (
            <li
              key={m.id}
              className={`flex flex-col rounded-3xl border bg-cream-50 p-6 shadow-sm ${
                m.is_active
                  ? "border-ink-900/10"
                  : "border-rose-200 opacity-70"
              }`}
            >
              <div className="flex items-start gap-3">
                <div
                  className={`flex h-14 w-14 flex-none items-center justify-center rounded-full bg-gradient-to-br ${m.accent} text-base font-bold text-white shadow-md`}
                >
                  {m.initials ?? m.name.slice(0, 2).toUpperCase()}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="display truncate text-lg font-semibold">
                    {m.name}
                  </div>
                  <div className="text-xs text-brand-700">{m.role ?? "—"}</div>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                    m.is_active
                      ? "bg-brand-500/15 text-brand-800"
                      : "bg-ink-900/10 text-ink-700"
                  }`}
                >
                  {m.is_active ? "Live" : "Hidden"}
                </span>
              </div>
              <p className="mt-3 line-clamp-3 text-sm text-ink-700/80">
                {m.bio ?? "—"}
              </p>
              <div className="mt-4 flex items-center gap-2">
                <Link
                  href={`/admin/team/edit/${m.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full bg-ink-900/5 px-3 py-1.5 text-xs font-semibold text-ink-800 hover:bg-ink-900 hover:text-cream-50"
                >
                  <Edit3 className="h-3.5 w-3.5" strokeWidth={1.8} />
                  Edit
                </Link>
                <ConfirmDeleteButton
                  action={deleteTeamAction}
                  hiddenFields={{ id: m.id }}
                  itemLabel={`${m.name} from the team`}
                />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
