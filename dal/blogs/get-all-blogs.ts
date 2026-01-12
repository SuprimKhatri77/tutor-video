"use server";

import { db } from "@/db";
import { BlogsSelectType } from "@/db/schema";

export async function getAllBlogs(): Promise<BlogsSelectType[] | []> {
  const blogsList = await db.query.blogs.findMany();
  return blogsList ?? [];
}
