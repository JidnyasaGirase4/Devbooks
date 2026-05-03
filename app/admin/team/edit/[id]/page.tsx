import { notFound } from "next/navigation";
import TeamForm from "@/components/admin/TeamForm";
import { updateTeamAction, type TeamFormState } from "@/lib/actions";
import { getTeamMemberById } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function EditTeamPage({
  params,
}: {
  params: { id: string };
}) {
  const id = Number(params.id);
  if (!Number.isFinite(id) || id <= 0) notFound();
  const m = await getTeamMemberById(id).catch(() => null);
  if (!m) notFound();

  const boundAction = async (
    prev: TeamFormState,
    formData: FormData
  ): Promise<TeamFormState> => {
    "use server";
    return updateTeamAction(id, prev, formData);
  };

  return (
    <TeamForm
      action={boundAction}
      submitLabel="Save changes"
      title={`Edit "${m.name}"`}
      defaults={{
        name: m.name,
        role: m.role,
        bio: m.bio,
        initials: m.initials,
        accent: m.accent,
        display_order: m.display_order,
        is_active: m.is_active,
      }}
    />
  );
}
