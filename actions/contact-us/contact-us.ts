"use server";

import { db } from "@/db";
import { contactUs } from "@/db/schema";
import { nanoid } from "nanoid";
import {
  ContactUsInput,
  contactUsInputSchema,
  ContactUsResponse,
} from "@/utils/validators/contact-us.validator";
import z from "zod";

export async function contactUsAction(
  data: ContactUsInput,
): Promise<ContactUsResponse> {
  console.log("data: ", data);
  const validateFields = contactUsInputSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        name: tree?.name?.errors,
        message: tree?.message?.errors,
        subject: tree?.subject?.errors,
      },
    };
  }
  try {
    const id = nanoid(7);
    await db.insert(contactUs).values({ ...data, id });
    return { success: true, message: "Message sent successfully." };
  } catch (error) {
    console.error("error: ", error);
    return { success: false, message: "Failed to send contact message." };
  }
}
