"use server";

import { db } from "@/db";
import { upcomingEvents } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  EditEventInput,
  editEventInputSchema,
  EditEventResponse,
} from "@/utils/validators/event.validator";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

export async function editEvent(
  input: EditEventInput
): Promise<EditEventResponse> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, message: "User is not authorized." };
  }
  if (!session.user.role || session.user.role !== "admin") {
    return {
      success: false,
      message: "User is not authorized to perform this action.",
    };
  }

  const validateFields = editEventInputSchema.safeParse({ ...input });
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        properties: {
          title: tree?.title?.errors,
          body: tree?.body?.errors,
          eventDate: tree?.eventDate?.errors,
        },
      },
    };
  }

  try {
    await db
      .update(upcomingEvents)
      .set({ ...input })
      .where(eq(upcomingEvents.id, input.id));
    return { success: true, message: "Event updated successfully." };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to update the event." };
  }
}
