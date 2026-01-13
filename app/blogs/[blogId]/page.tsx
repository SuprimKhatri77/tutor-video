import { BlogDetail } from "@/modules/blogs/blog-detail/blog-detail";
import { InvalidBlogId } from "@/modules/blogs/invalid-blog-id-message";
import { redirect } from "next/navigation";
import z from "zod";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  const { blogId } = await params;
  if (!blogId) redirect("/blogs");
  const uuidSchema = z.uuid().nonempty();

  const validateBlogId = uuidSchema.safeParse(blogId);
  if (!validateBlogId.success) {
    return <InvalidBlogId />;
  }
  return <BlogDetail blogId={blogId} />;
}
