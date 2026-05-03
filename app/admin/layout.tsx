import AdminShell from "@/components/admin/AdminShell";
import { isAdmin } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Login page handles its own layout — render the shell only for authed pages.
  // Middleware already redirects unauthenticated requests, but isAdmin() acts
  // as a defence-in-depth check for any direct call.
  if (!isAdmin()) return <>{children}</>;
  return <AdminShell>{children}</AdminShell>;
}
