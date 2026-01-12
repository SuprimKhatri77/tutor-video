export const dynamic = "force-dynamic";

import { getAllBlogs } from "@/dal/blogs/get-all-blogs";
import BlogsFeed from "@/modules/Blogs/BlogFeed";

export default async function Page() {
  const blogLists = await getAllBlogs();
  return <BlogsFeed blogs={blogLists} />;
}
