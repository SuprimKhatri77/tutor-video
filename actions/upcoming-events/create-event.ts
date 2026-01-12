"use server";

import { db } from "@/db";
import { upcomingEvents } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  CreateEventInput,
  createEventInputSchema,
  CreateEventResponse,
} from "@/utils/validators/event.validator";
import { headers } from "next/headers";
import z from "zod";

export async function createEvent(
  input: CreateEventInput
): Promise<CreateEventResponse> {
  console.log("input data: ", input);
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

  const validateFields = createEventInputSchema.safeParse({ ...input });
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation Failed.",
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
    const [event] = await db
      .insert(upcomingEvents)
      .values({ ...input })
      .returning();
    console.log("event: ", event);
    return {
      success: false,
      message: "Event added successfully.",
      data: event,
    };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to add event." };
  }
}
