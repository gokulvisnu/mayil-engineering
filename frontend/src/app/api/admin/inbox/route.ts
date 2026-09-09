import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin";
import { getEnquiries, getReviews, saveEnquiries, saveReviews } from "@/lib/content-store";

export async function GET() {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  return NextResponse.json({ enquiries: await getEnquiries(), reviews: await getReviews() });
}

export async function PATCH(request: Request) {
  if (!(await isAdmin())) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { kind, id, status } = await request.json();
  if (kind === "enquiry" && ["new", "contacted", "closed"].includes(status)) {
    const enquiries = await getEnquiries();
    const item = enquiries.find((entry) => entry.id === id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    item.status = status;
    await saveEnquiries(enquiries);
    return NextResponse.json(item);
  }
  if (kind === "review" && ["pending", "approved", "rejected"].includes(status)) {
    const reviews = await getReviews();
    const item = reviews.find((entry) => entry.id === id);
    if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
    item.status = status;
    await saveReviews(reviews);
    return NextResponse.json(item);
  }
  return NextResponse.json({ error: "Invalid request" }, { status: 400 });
}
