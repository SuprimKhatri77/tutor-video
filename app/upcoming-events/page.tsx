import { events, EventType } from '@/components/landing/Upcoming'
import { EventsPage } from '@/modules/upcoming-events/upcoming-events'

export async function getEvents():Promise<EventType[]> {
  await new Promise((res) => setTimeout(res, 2000)) // mock delay
  return events
}

export default async function page() {
    const eventDetails = await getEvents()
  return <EventsPage events={eventDetails}  />
}
