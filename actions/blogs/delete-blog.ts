"use server";

import { db } from "@/db";
import { blogs } from "@/db/schema";
import { auth } from "@/utils/auth";
import {
  DeletBlog,
  DeleteBlogResponse,
  deleteBlogSchema,
} from "@/utils/validators/blog.validator";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

export async function deleteBlog(data: DeletBlog): Promise<DeleteBlogResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.role !== "admin") {
    return {
      success: false,
      message: "Not authorized to perform this action.",
    };
  }

  const validateField = deleteBlogSchema.safeParse(data);
  if (!validateField.success) {
    return {
      success: false,
      message: "Invalid blog id.",
    };
  }
  try {
    await db.delete(blogs).where(eq(blogs.id, data.blogId));
    return { success: true, message: "Blog deleted successfully." };
  } catch (error) {
    console.log("error: ", error);
    return { success: false, message: "Failed to delete blog." };
  }
}
