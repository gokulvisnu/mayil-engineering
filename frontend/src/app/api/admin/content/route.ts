import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getManagedContent, saveManagedContent, type ManagedContent } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json(await getManagedContent());
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const content = (await request.json()) as ManagedContent;
  if (!content?.company?.name || !content?.contact?.phoneDisplay || !Array.isArray(content.projects) || !Array.isArray(content.stats) || !Array.isArray(content.testimonials)) {
    return NextResponse.json({ error: "Invalid content" }, { status: 400 });
  }
  await saveManagedContent(content);
  return NextResponse.json(content);
}
