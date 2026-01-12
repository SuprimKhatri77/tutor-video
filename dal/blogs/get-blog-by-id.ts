"use server";

import { db } from "@/db";
import { BlogsSelectType } from "@/db/schema";

export async function getBlogById(
  blogId: string
): Promise<BlogsSelectType | null> {
  const blog = await db.query.blogs.findFirst({
    where: (fields, { eq }) => eq(fields.id, blogId),
  });
  if (!blog) return null;
  return blog;
}
