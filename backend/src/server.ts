import express from "express";
import cors from "cors";
import multer from "multer";
import { config, supabase } from "./config.js";
import { requireAdmin } from "./middleware/admin.js";

const app = express();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024 } });
const defaultContent = {
  company: { name: "Mayil Engineering & Traders", tagline: "BUILDING BETTER COMMUNITIES THROUGH QUALITY INFRASTRUCTURE", subTagline: "Reliable Civil Construction & Infrastructure Solutions", shortDescription: "We deliver dependable civil construction and infrastructure solutions with a focus on quality, safety, durability and timely project execution.", fullDescription: "We deliver dependable civil construction and infrastructure solutions.", mission: "To deliver quality construction work.", qualityCommitment: "Quality, safety, and timely delivery.", establishedYear: 2014, headquarters: "Annur, Tamil Nadu, India" },
  contact: { phoneDisplay: "99428 03565", phoneRaw: "+919942803565", whatsappNumber: "919080072602", gstin: "33DKAPM4088M1ZT", address: "No. B 2/2, ST-4, Dharmar Kovil Street, Kaverivayal, Annur – 641 653, Tamil Nadu, India", addressArea: "Kaverivayal, Annur, Tamil Nadu, India", workingHours: "8:00 AM – 7:30 PM", workingDays: "Monday – Saturday", whatsappDefaultMessage: "Hello, I would like to enquire about your works." },
  stats: [], projects: [], testimonials: []
};

app.use(cors({ origin: config.frontendUrl, methods: ["GET", "POST", "PUT", "PATCH", "DELETE"], allowedHeaders: ["Content-Type", "Authorization"] }));
app.use(express.json());
app.get("/health", (_request, response) => response.json({ ok: true }));

async function getContent() {
  const { data, error } = await supabase.from("site_settings").select("content").eq("id", "main").maybeSingle();
  if (error) throw error;
  const content = data?.content as Record<string, unknown> | null;
  return content?.company ? content : null;
}

app.get("/api/content", async (_request, response) => {
  try { response.json(await getContent()); } catch (error) { response.status(500).json({ error: error instanceof Error ? error.message : "Unable to load content" }); }
});

app.get("/api/admin/content", requireAdmin, async (_request, response) => {
  try { response.json(await getContent()); } catch (error) { response.status(500).json({ error: error instanceof Error ? error.message : "Unable to load content" }); }
});

app.put("/api/admin/content", requireAdmin, async (request, response) => {
  const content = request.body;
  if (!content?.company?.name || !content?.contact?.phoneRaw || !Array.isArray(content?.projects) || !Array.isArray(content?.stats) || !Array.isArray(content?.testimonials)) return response.status(400).json({ error: "Invalid site content" });
  const { error } = await supabase.from("site_settings").upsert({ id: "main", company_name: content.company.name, phone_display: content.contact.phoneDisplay, phone_raw: content.contact.phoneRaw, whatsapp_number: content.contact.whatsappNumber, gstin: content.contact.gstin || null, email: content.contact.email || null, address: content.contact.address || null, content }, { onConflict: "id" });
  if (error) return response.status(500).json({ error: error.message });
  response.json(content);
});

app.post("/api/enquiries", async (request, response) => {
  const { fullName, phone, email, organization, projectType, location, details } = request.body;
  if (!fullName?.trim() || !phone?.trim() || !location?.trim()) return response.status(400).json({ error: "Name, phone, and location are required." });
  const { data, error } = await supabase.from("enquiries").insert({ full_name: fullName.trim(), phone: phone.trim(), email: email?.trim() || null, organization: organization?.trim() || null, project_type: projectType?.trim() || null, location: location.trim(), details: details?.trim() || null }).select("id").single();
  if (error) return response.status(500).json({ error: error.message });
  response.status(201).json({ id: data.id });
});

app.post("/api/reviews", async (request, response) => {
  const { name, role, organization, content, rating } = request.body;
  if (!name?.trim() || !content?.trim()) return response.status(400).json({ error: "Name and review are required." });
  const { data, error } = await supabase.from("reviews").insert({ name: name.trim(), role: role?.trim() || null, organization: organization?.trim() || null, content: content.trim(), rating: Math.min(5, Math.max(1, Number(rating) || 5)), status: "pending" }).select("id").single();
  if (error) return response.status(500).json({ error: error.message });
  response.status(201).json({ id: data.id });
});

app.get("/api/admin/inbox", requireAdmin, async (_request, response) => {
  const [{ data: enquiries, error: enquiryError }, { data: reviews, error: reviewError }] = await Promise.all([supabase.from("enquiries").select("*").order("created_at", { ascending: false }), supabase.from("reviews").select("*").order("created_at", { ascending: false })]);
  if (enquiryError || reviewError) return response.status(500).json({ error: enquiryError?.message || reviewError?.message });
  response.json({ enquiries: (enquiries || []).map((item) => ({ id: item.id, createdAt: item.created_at, status: item.status, fullName: item.full_name, phone: item.phone, email: item.email || undefined, organization: item.organization || undefined, projectType: item.project_type || "General enquiry", location: item.location, details: item.details || undefined })), reviews: (reviews || []).map((item) => ({ id: item.id, createdAt: item.created_at, status: item.status, name: item.name, role: item.role || "Client", organization: item.organization || "", content: item.content, rating: item.rating })) });
});

app.patch("/api/admin/inbox", requireAdmin, async (request, response) => {
  const { kind, id, status } = request.body;
  const table = kind === "enquiry" ? "enquiries" : kind === "review" ? "reviews" : null;
  if (!table || !id || !status) return response.status(400).json({ error: "Invalid inbox update" });
  const { data, error } = await supabase.from(table).update({ status }).eq("id", id).select().single();
  if (error) return response.status(400).json({ error: error.message });
  response.json(data);
});

async function handleUpload(request: express.Request, response: express.Response) {
  if (!request.file || !["image/jpeg", "image/png", "image/webp"].includes(request.file.mimetype)) return response.status(400).json({ error: "Upload a JPG, PNG, or WebP image smaller than 5 MB." });
  const extension = request.file.mimetype.split("/")[1];
  const path = `projects/${crypto.randomUUID()}.${extension}`;
  const { error } = await supabase.storage.from("project-images").upload(path, request.file.buffer, { contentType: request.file.mimetype, upsert: false });
  if (error) return response.status(500).json({ error: error.message });
  const { data } = supabase.storage.from("project-images").getPublicUrl(path);
  response.status(201).json({ url: data.publicUrl });
}
app.post("/api/admin/upload", requireAdmin, upload.single("image"), handleUpload);
app.post("/api/admin/uploads", requireAdmin, upload.single("image"), handleUpload);

app.listen(config.port, () => console.log(`Mayil backend running on port ${config.port}`));