import AuthTabs from "@/modules/auth/auth-tabs";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (session && session.user.role === "admin") redirect("/admin/blogs");
  if (session && session.user.role !== "admin") {
    await auth.api.signOut({ headers: await headers() });
    redirect("/");
  }

  return <AuthTabs />;
}
