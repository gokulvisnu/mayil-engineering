import "server-only";

import { auth } from "@/auth";

export async function isAdmin() {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL || "mayilengineering4204@gmail.com";
  return session?.user?.email === adminEmail;
}
