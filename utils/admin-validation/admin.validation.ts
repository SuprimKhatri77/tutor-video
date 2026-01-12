"use server";

import z from "zod";
import {
  Signup,
  SignupResponse,
  signupSchema,
} from "../validators/auth.validator";

export async function validateSignupData(
  data: Signup
): Promise<SignupResponse> {
  const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];
  console.log("admin emails: ", adminEmails);

  if (!adminEmails.includes(data.email)) {
    return { success: false, message: "User is not an admin." };
  }

  const validateFields = signupSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        properties: {
          name: tree?.name?.errors,
          email: tree?.email?.errors,
          password: tree?.password?.errors,
        },
      },
    };
  }

  return { success: true, message: "Eligible." };
}
