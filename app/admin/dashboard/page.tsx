import { requireAdmin } from "@/helpers/auth/require-admin";
import AdminDashboard from "@/modules/admin/dashboard/AdminDashboard";

export default async function page() {
    await requireAdmin();
  
  return <AdminDashboard />
}
