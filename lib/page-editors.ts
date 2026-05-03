import "server-only";
import { getSettings, type Setting } from "./queries";

export async function loadGroupedSettings(): Promise<
  Record<string, Setting[]>
> {
  const all = await getSettings().catch(() => [] as Setting[]);
  const groups: Record<string, Setting[]> = {};
  for (const s of all) (groups[s.group] ||= []).push(s);
  return groups;
}
