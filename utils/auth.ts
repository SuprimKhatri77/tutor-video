import { db } from "@/db";
import * as schema from "@/db/schema";
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { nextCookies } from "better-auth/next-js";
import { admin } from "better-auth/plugins";

export const auth = betterAuth({
  database: drizzleAdapter(db, {
    provider: "pg",
    schema,
  }),

  baseURL: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },

  plugins: [admin(), nextCookies()],
});
