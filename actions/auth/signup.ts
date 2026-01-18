"use server";

import { db } from "@/db";
import { user } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  Signup,
  SignupResponse,
  signupSchema,
} from "@/utils/validators/auth.validator";
import { APIError } from "better-auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

const adminEmails = process.env.ADMIN_EMAILS?.split(",") ?? [];

export async function signup(data: Signup): Promise<SignupResponse> {
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

  try {
    await auth.api.signUpEmail({
      body: {
        ...data,
      },
      headers: await headers(),
    });

    await db
      .update(user)
      .set({
        role: "admin",
      })
      .where(eq(user.email, data.email));
    return { success: true, message: "Signup successful." };
  } catch (error) {
    console.log("error: ", error);
    if (error instanceof APIError) {
      console.log("api err msg: ", error.message);
      return {
        success: false,
        message: error.message,
      };
    }
    return { success: false, message: "Failed to signup." };
  }
}
