import { db } from "@/db";
import { requireAdmin } from "@/helpers/auth/require-admin";
import { EditBlogPage } from "@/modules/admin/blogs/edit-blog";

export default async function Page({
  params,
}: {
  params: Promise<{ blogId: string }>;
}) {
  await requireAdmin();
  const { blogId } = await params;
  if (!blogId) {
    return (
      <div>
        <h1>Missing blog id.</h1>
      </div>
    );
  }

  const blog = await db.query.blogs.findFirst({
    where: (fields, { eq }) => eq(fields.id, blogId),
  });

  if (!blog) {
    return (
      <div>
        <h1>Blog record not found.</h1>
      </div>
    );
  }

  return <EditBlogPage blog={blog} />;
}
