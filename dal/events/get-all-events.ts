"use server";

import { db } from "@/db";
import { UpcomingEventsSelectType } from "@/db/schema";

export async function getAllEvents(): Promise<UpcomingEventsSelectType[]> {
  const events = await db.query.upcomingEvents.findMany({
    orderBy: (fields, { desc }) => desc(fields.createdAt),
  });

  return events ?? [];
}
