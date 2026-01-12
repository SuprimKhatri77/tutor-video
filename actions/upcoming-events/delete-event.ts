"use server";

import { db } from "@/db";
import { upcomingEvents } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  DeleteEventInput,
  deleteEventInputSchema,
  DeleteEventResponse,
} from "@/utils/validators/event.validator";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function deleteEvent(
  input: DeleteEventInput
): Promise<DeleteEventResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, message: "Unauthorized." };
  }
  if (!session.user.role || session.user.role !== "admin") {
    return {
      success: false,
      message: "User is not authorized to perform this action.",
    };
  }
  const validateField = deleteEventInputSchema.safeParse({ ...input });
  if (!validateField.success) {
    return { success: false, message: "Validation failed." };
  }
  try {
    await db.delete(upcomingEvents).where(eq(upcomingEvents.id, input.eventId));
    return { success: true, message: "Event deleted successfully." };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to delete the event." };
  }
}
