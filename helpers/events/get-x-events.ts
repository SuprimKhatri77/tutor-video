"use server";

import { db } from "@/db";
import { UpcomingEventsSelectType } from "@/db/schema";

export async function getXEvents(
  length: number
): Promise<UpcomingEventsSelectType[] | []> {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const events = await db.query.upcomingEvents.findMany({
    limit: length,
    orderBy: (fields, { desc }) => desc(fields.createdAt),
  });

  return events.length > 0 ? events : [];
}
