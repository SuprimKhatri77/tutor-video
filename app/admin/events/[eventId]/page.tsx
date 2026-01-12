import { requireAdmin } from "@/helpers/auth/require-admin";
import EventDetailPage from "@/modules/admin/events/event-detail";

export default async function Page() {
  await requireAdmin();
  return <EventDetailPage />;
}
