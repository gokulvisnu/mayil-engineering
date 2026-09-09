import { NextResponse } from "next/server";
import { getReviews, newId, saveReviews, type ClientReview } from "@/lib/content-store";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.name?.trim() || !body.content?.trim()) {
    return NextResponse.json({ error: "Name and review are required." }, { status: 400 });
  }
  const rating = Math.max(1, Math.min(5, Number(body.rating) || 5));
  const review: ClientReview = {
    id: newId("review"), createdAt: new Date().toISOString(), status: "pending",
    name: body.name.trim(), role: body.role?.trim() || "Client", organization: body.organization?.trim() || "",
    content: body.content.trim(), rating,
  };
  const reviews = await getReviews();
  reviews.unshift(review);
  await saveReviews(reviews);
  return NextResponse.json({ id: review.id });
}
