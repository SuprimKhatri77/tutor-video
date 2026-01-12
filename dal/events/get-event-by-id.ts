"use server";

import { db } from "@/db";
import { UpcomingEventsSelectType } from "@/db/schema";

export async function getEventById(
  eventId: string
): Promise<UpcomingEventsSelectType | null> {
  if (!eventId) return null;
  const event = await db.query.upcomingEvents.findFirst({
    where: (fields, { eq }) => eq(fields.id, eventId),
  });

  if (!event) return null;
  return event;
}
