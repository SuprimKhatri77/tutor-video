import { requireAdmin } from "@/helpers/auth/require-admin";

export default async function Page() {
  await requireAdmin();
  return null;
}
