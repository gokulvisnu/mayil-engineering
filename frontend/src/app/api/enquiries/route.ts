import { NextResponse } from "next/server";
import { getEnquiries, newId, saveEnquiries, type Enquiry } from "@/lib/content-store";

export async function POST(request: Request) {
  const body = await request.json();
  if (!body.fullName?.trim() || !body.phone?.trim() || !body.location?.trim()) {
    return NextResponse.json({ error: "Name, phone, and location are required." }, { status: 400 });
  }
  const enquiry: Enquiry = {
    id: newId("enq"), createdAt: new Date().toISOString(), status: "new",
    fullName: body.fullName.trim(), phone: body.phone.trim(), email: body.email?.trim(),
    organization: body.organization?.trim(), projectType: body.projectType?.trim() || "General enquiry",
    location: body.location.trim(), details: body.details?.trim(),
  };
  const enquiries = await getEnquiries();
  enquiries.unshift(enquiry);
  await saveEnquiries(enquiries);
  return NextResponse.json({ id: enquiry.id });
}
