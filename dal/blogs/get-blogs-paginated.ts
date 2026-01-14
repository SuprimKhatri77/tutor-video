"use server";

import { db } from "@/db";
import { BlogsSelectType, blogs } from "@/db/schema";
import { desc } from "drizzle-orm";

export async function getBlogsPaginated(
  page: number = 0,
  limit: number = 3
): Promise<{ blogs: BlogsSelectType[]; total: number }> {
  /* 
offset determines how many rows to skip.
Initially when page is 0 and limit is 3, offset is 0 meaning no skip.
In the second iteration page becomes 1 and 1 x 3 = 3 so we skip the first 3 rows and get the next 3 rows.
*/
  const offset = page * limit;

  const blogsList = await db.query.blogs.findMany({
    limit: limit,
    offset: offset,
    orderBy: [desc(blogs.createdAt)],
  });

  const allBlogs = await db.query.blogs.findMany();
  const total = allBlogs.length;

  return {
    blogs: blogsList ?? [],
    total,
  };
}
