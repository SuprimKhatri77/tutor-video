import { requireAdmin } from "@/helpers/auth/require-admin";
import BlogDetailPage from "@/modules/admin/blogs/blog-detail";
import { notFound } from "next/navigation";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  await requireAdmin();
  const { blogId } = await params;
  if (!blogId) {
    return notFound();
  }

  return <BlogDetailPage blogId={blogId} />;
}
