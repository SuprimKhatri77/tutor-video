"use server";

import { db } from "@/db";
import { BlogsSelectType } from "@/db/schema";

export async function getBlogById(
  blogId: string
): Promise<BlogsSelectType | null> {
  console.log("i got triggered and received blog id: ", blogId);
  const blog = await db.query.blogs.findFirst({
    where: (fields, { eq }) => eq(fields.id, blogId),
  });
  console.log("blog", blog);
  if (!blog) return null;
  return blog;
}
