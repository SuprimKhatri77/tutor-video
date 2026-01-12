import { requireAdmin } from "@/helpers/auth/require-admin";
import BlogListingPage from "@/modules/admin/blogs/blogs-list";

export default async function Page() {
  await requireAdmin();
  return <BlogListingPage />;
}
