import TeamForm from "@/components/admin/TeamForm";
import { addTeamAction } from "@/lib/actions";

export const metadata = { title: "Add team member — DevBooks Admin" };

export default function AddTeamPage() {
  return (
    <TeamForm
      action={addTeamAction}
      submitLabel="Create member"
      title="Add a team member"
      defaults={{
        accent: "from-brand-500 to-brand-700",
        is_active: true,
        display_order: 0,
      }}
    />
  );
}
