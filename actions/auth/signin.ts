"use server";

import { auth } from "@/utils/auth";
import {
  Signin,
  SigninResponse,
  signinSchema,
} from "@/utils/validators/auth.validator";
import { APIError } from "better-auth";
import { headers } from "next/headers";
import z from "zod";

const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];
export async function signin(data: Signin): Promise<SigninResponse> {
  if (!adminEmails.includes(data.email)) {
    return { success: false, message: "User is not an admin." };
  }

  const validateFields = signinSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        properties: {
          email: tree?.email?.errors,
          password: tree?.password?.errors,
        },
      },
    };
  }

  try {
    await auth.api.signInEmail({
      body: {
        ...data,
      },
      headers: await headers(),
    });
    return { success: true, message: "Login successful." };
  } catch (error) {
    console.log("error: ", error);
    if (error instanceof APIError) {
      console.log("api err message: ", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Failed to login." };
  }
}
