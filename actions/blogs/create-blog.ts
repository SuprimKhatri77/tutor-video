"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  CreateBlog,
  CreateBlogResponse,
  createBlogSchema,
} from "@/utils/validators/blog.validator";
import { headers } from "next/headers";
import z from "zod";

export async function createBlog(
  data: CreateBlog
): Promise<CreateBlogResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return {
      success: false,
      message: "Not authorized to perform this action.",
    };
  }

  const validateFields = createBlogSchema.safeParse(data);
  if (!validateFields.success) {
    const tree = z.treeifyError(validateFields.error).properties;
    return {
      success: false,
      message: "Validation failed.",
      errors: {
        properties: {
          title: tree?.title?.errors,
          description: tree?.description?.errors,
          images: tree?.images?.errors,
        },
      },
    };
  }

  try {
    await db.insert(blogs).values({ ...data, authorId: session.user.id });
    return { success: true, message: "Blog created successfully." };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to create blog." };
  }
}
