import { getEventById } from "@/dal/events/get-event-by-id";
import { requireAdmin } from "@/helpers/auth/require-admin";
import EventDetailPage from "@/modules/admin/events/event-detail";

export default async function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  await requireAdmin();
  const { eventId } = await params;
  if (!eventId) {
    return (
      <div>
        <h1>Missing required credentials</h1>
      </div>
    );
  }
  const event = await getEventById(eventId);
  if (!event) {
    return (
      <div>
        <h1>Event record not found!</h1>
      </div>
    );
  }
  return <EventDetailPage event={event} />;
}
