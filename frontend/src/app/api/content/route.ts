import { NextResponse } from "next/server";
import { getManagedContent } from "@/lib/content-store";

export async function GET() {
  return NextResponse.json(await getManagedContent());
}
