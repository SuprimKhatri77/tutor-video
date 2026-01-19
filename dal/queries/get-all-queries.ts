"use server";

import { db } from "@/db";
import { ContactUsSelectType } from "@/db/schema";
import { auth } from "@/utils/auth";
import { headers } from "next/headers";

export async function getAllQueries(): Promise<ContactUsSelectType[] | []> {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return [];
  }
  if (session.user.role !== "admin") {
    await auth.api.signOut();
    return [];
  }
  const queries = await db.query.contactUs.findMany();

  if (!queries || queries.length === 0) {
    return [];
  }

  return queries;
}
