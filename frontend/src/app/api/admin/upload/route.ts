import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";

const allowedTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const maxSize = 5 * 1024 * 1024;

export async function POST(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get("image");
  if (!(file instanceof File) || !allowedTypes.has(file.type) || file.size > maxSize) {
    return NextResponse.json({ error: "Upload a JPG, PNG, or WebP image smaller than 5 MB." }, { status: 400 });
  }
  const extension = file.type.split("/")[1];
  const filename = `${crypto.randomUUID()}.${extension}`;
  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  await fs.mkdir(uploadDirectory, { recursive: true });
  await fs.writeFile(path.join(uploadDirectory, filename), Buffer.from(await file.arrayBuffer()));
  return NextResponse.json({ url: `/uploads/${filename}` });
}
