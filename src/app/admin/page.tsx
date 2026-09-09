import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export default async function AdminPage() {
  if (!(await isAdmin())) redirect("/login");
  return <AdminDashboard />;
}
