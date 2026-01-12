"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  EditBlog,
  EditBlogResponse,
  editBlogSchema,
} from "@/utils/validators/blog.validator";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import z from "zod";

export async function editBlog(data: EditBlog): Promise<EditBlogResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return {
      success: false,

      message: "Not authorized to perform this action.",
    };
  }

  const validateFields = editBlogSchema.safeParse(data);
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
    await db
      .update(blogs)
      .set({ ...data })
      .where(eq(blogs.id, data.blogId));
    return { success: true, message: "Blog updated successfully." };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to update blog." };
  }
}
