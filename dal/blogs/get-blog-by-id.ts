"use server";

import { db } from "@/db";
import { BlogsSelectType } from "@/db/schema";

export async function getBlogById(param: {
  blogId?: string;
  slug?: string;
}): Promise<BlogsSelectType | null> {
  const { slug, blogId } = param;
  if (slug) {
    const blog = await db.query.blogs.findFirst({
      where: (fields, { eq }) => eq(fields.slug, slug),
    });
    if (!blog) return null;
    return blog;
  } else if (blogId) {
    const blog = await db.query.blogs.findFirst({
      where: (fields, { eq }) => eq(fields.id, blogId),
    });
    if (!blog) return null;
    return blog;
  }
  return null;
}
