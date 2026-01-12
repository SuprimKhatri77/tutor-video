import { requireAdmin } from "@/helpers/auth/require-admin";
import CreateBlogPage from "@/modules/admin/blogs/create-blog";

export default async function Page() {
  await requireAdmin();

  return <CreateBlogPage />;
}
