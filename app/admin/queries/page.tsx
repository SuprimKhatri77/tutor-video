import { getAllQueries } from "@/dal/queries/get-all-queries";
import { requireAdmin } from "@/helpers/auth/require-admin";
import { QueriesListPage } from "@/modules/admin/queries/queries-listing";

export default async function Page() {
  await requireAdmin();
  const queries = await getAllQueries();
  return <QueriesListPage queries={queries} />;
}
