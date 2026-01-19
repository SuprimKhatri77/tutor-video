import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  }
  if (!session.user.role || session.user.role !== "admin") {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  }
  redirect("/admin/dashboard");
}
