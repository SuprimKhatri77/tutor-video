import { requireAdmin } from "@/helpers/auth/require-admin";
import { EventsList } from "@/modules/admin/events/events-list";

export default async function Page() {
  await requireAdmin();

  return <EventsList />;
}
