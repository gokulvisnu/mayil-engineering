"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Enquiry, ClientReview, ManagedContent } from "@/types/managed-content";
import type { EquipmentItem } from "@/types";
import { apiFetch } from "@/lib/api";
import { siteConfig } from "@/config/siteConfig";
import { getFirebaseAuth } from "@/lib/firebase";
import { VisualContentEditor } from "./VisualContentEditor";

const blankProject = () => ({ id: `project-${Date.now()}`, title: "New project", category: "Public Works" as const, location: "", description: "", fullDetails: "", image: "", scope: [], completionTime: "" });
const blankEquipment = (): EquipmentItem => ({ id: `equipment-${Date.now()}`, name: "New equipment", category: "", description: "", specifications: [], availability: "Available", image: "" });
const blankTestimonial = () => ({ id: `testimonial-${Date.now()}`, name: "", role: "Client", organization: "", content: "", rating: 5 });
const isUploadedProjectImage = (url: string) => url.includes("/storage/v1/object/public/project-images/");
const customDetailPrefix = "customDetail_";
const customDetailLabelPrefix = "customLabel_";
const detailFieldRows = [
  { key: "name", label: "Business name", source: "company" },
  { key: "phoneDisplay", label: "Phone display", source: "contact" },
  { key: "phoneRaw", label: "Primary phone (+91)", source: "contact" },
  { key: "gstin", label: "GSTIN", source: "contact" },
  { key: "address", label: "Address", source: "contact" },
  { key: "whatsappNumber", label: "WhatsApp number", source: "contact" },
] as const;
type AdminRecord = { email: string; isActive: boolean; createdAt: string };
type CompanyDetailRow = { id: string; key: string; label: string; value: string; source: "company" | "contact" };

function getCustomLabelKey(id: string) {
  return `${customDetailLabelPrefix}${id.replace(customDetailPrefix, "")}`;
}

function getCompanyDetailRows(content: ManagedContent): CompanyDetailRow[] {
  const companyRecord = content.company as unknown as Record<string, string | number>;
  const contactRecord = content.contact as unknown as Record<string, string | number>;
  const customRows = Object.entries(companyRecord)
    .filter(([key]) => key.startsWith(customDetailPrefix))
    .map(([key, value]) => ({
      id: key,
      key,
      label: String(companyRecord[getCustomLabelKey(key)] ?? "Custom detail"),
      value: String(value ?? ""),
      source: "company" as const,
    }));

  const rows = detailFieldRows.map(({ key, label, source }) => ({
    id: `${source}-${key}`,
    key,
    label,
    value: String((source === "company" ? companyRecord[key] : contactRecord[key]) ?? ""),
    source,
  }));

  return [...rows, ...customRows];
}

function normalizeContent(value: Partial<ManagedContent>): ManagedContent {
  return {
    ...siteConfig,
    ...value,
    company: { ...siteConfig.company, ...value.company },
    contact: { ...siteConfig.contact, ...value.contact },
    maps: { ...siteConfig.maps, ...value.maps },
    socialLinks: { ...siteConfig.socialLinks, ...value.socialLinks },
    navLinks: value.navLinks ?? siteConfig.navLinks,
    trustIndicators: value.trustIndicators ?? siteConfig.trustIndicators,
    stats: value.stats ?? siteConfig.stats,
    services: value.services ?? siteConfig.services,
    developmentCategories: value.developmentCategories ?? siteConfig.developmentCategories,
    projects: value.projects ?? siteConfig.projects,
    equipment: value.equipment ?? siteConfig.equipment,
    advantages: value.advantages ?? siteConfig.advantages,
    safetyPriorities: value.safetyPriorities ?? siteConfig.safetyPriorities,
    workProcess: value.workProcess ?? siteConfig.workProcess,
    testimonials: value.testimonials ?? siteConfig.testimonials,
  };
}

export function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [content, setContent] = useState<ManagedContent | null>(normalizeContent(siteConfig));
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [admins, setAdmins] = useState<AdminRecord[]>([]);
  const [adminEmail, setAdminEmail] = useState("");
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");
  const [editingDetailId, setEditingDetailId] = useState<string | null>(null);
  const [detailDraft, setDetailDraft] = useState({ label: "", value: "" });
  const customDetailIdRef = useRef(0);

  function setManagedContent(next: ManagedContent) {
    setContent(next);
  }

  function addCompanyDetail() {
    if (!content) return;
    customDetailIdRef.current += 1;
    const detailId = `${customDetailPrefix}${customDetailIdRef.current}`;
    const nextCompany = { ...content.company } as Record<string, string | number>;
    nextCompany[detailId] = "";
    nextCompany[getCustomLabelKey(detailId)] = "New detail";
    update("company", nextCompany as unknown as typeof content.company);
    setEditingDetailId(detailId);
    setDetailDraft({ label: "New detail", value: "" });
  }

  function deleteCompanyDetail(row: CompanyDetailRow) {
    if (!content) return;

    if (row.source === "company" && row.id.startsWith(`${customDetailPrefix}`)) {
      const nextCompany = { ...content.company } as Record<string, string | number>;
      delete nextCompany[row.key];
      delete nextCompany[getCustomLabelKey(row.key)];
      update("company", nextCompany as unknown as typeof content.company);
      if (editingDetailId === row.id) {
        setEditingDetailId(null);
        setDetailDraft({ label: "", value: "" });
      }
      return;
    }

    const next = row.source === "company" ? { ...content.company } : { ...content.contact };
    const nextTarget = next as Record<string, string | number>;
    nextTarget[row.key] = "";
    update(row.source === "company" ? "company" : "contact", nextTarget as unknown as typeof next);
    if (editingDetailId === row.id) {
      setEditingDetailId(null);
      setDetailDraft({ label: "", value: "" });
    }
  }

  function saveCompanyDetailRow(row: CompanyDetailRow) {
    if (!content) return;

    if (row.source === "company" && row.id.startsWith(`${customDetailPrefix}`)) {
      const nextCompany = { ...content.company } as Record<string, string | number>;
      nextCompany[row.key] = detailDraft.value;
      nextCompany[getCustomLabelKey(row.key)] = detailDraft.label;
      update("company", nextCompany as unknown as typeof content.company);
      setEditingDetailId(null);
      setDetailDraft({ label: "", value: "" });
      return;
    }

    const nextTarget = (row.source === "company" ? { ...content.company } : { ...content.contact }) as Record<string, string | number>;
    nextTarget[row.key] = detailDraft.value;
    update(row.source === "company" ? "company" : "contact", nextTarget as unknown as typeof content.company);
    setEditingDetailId(null);
    setDetailDraft({ label: "", value: "" });
  }

  const companyDetailRows = content ? getCompanyDetailRows(content) : [];

  const load = useCallback(async function load() {
    try {
      const [contentResponse, inboxResponse, adminsResponse] = await Promise.all([
        apiFetch("/api/admin/content", {}, true),
        apiFetch("/api/admin/inbox", {}, true),
        apiFetch("/api/admin/admins", {}, true),
      ]);
      if (!contentResponse.ok) return false;
      const remoteContent = await contentResponse.json();
      if (remoteContent?.company) {
        setContent(normalizeContent(remoteContent));
      }
      if (inboxResponse.ok) {
        const inbox = await inboxResponse.json();
        setEnquiries(inbox.enquiries);
        setReviews(inbox.reviews);
      }
      if (adminsResponse.ok) setAdmins(await adminsResponse.json());
      return true;
    } catch {
      return false;
    }
  }, []);

  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (user) => {
      if (!user) {
        setAuthorized(false);
        router.replace("/login");
        return;
      }
      void load().then((isAllowed) => {
        if (!isAllowed) {
          void signOut(auth);
          setAuthorized(false);
          router.replace("/login");
          return;
        }
        setAuthorized(true);
      });
    });
  }, [load, router]);

  async function save(next = content) {
    if (!next) return;
    setSaving(true);
    const response = await apiFetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) }, true);
    setSaving(false);
    if (response.ok) { setManagedContent(normalizeContent(await response.json())); setNotice("Saved. Public pages update on their next load."); }
    else setNotice("Could not save changes.");
  }
  function update<K extends keyof ManagedContent>(key: K, value: ManagedContent[K]) { if (content) setManagedContent({ ...content, [key]: value }); }
  async function uploadContentImage(file: File) {
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setNotice("Invalid image format. Upload only JPG, PNG, or WebP files.");
      return null;
    }
    if (file.size > 5 * 1024 * 1024) {
      setNotice("Image is too large. Maximum allowed file size is 5 MB.");
      return null;
    }
    const form = new FormData();
    form.append("image", file);
    const response = await apiFetch("/api/admin/upload", { method: "POST", body: form }, true);
    if (!response.ok) {
      setNotice("Image upload failed. Please try again.");
      return null;
    }
    const { url } = await response.json();
    setNotice("Image uploaded. Click Save all changes to publish it.");
    return url as string;
  }
  async function upload(file: File, projectIndex: number) {
    if (!content) return;

    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
    const maxFileSize = 5 * 1024 * 1024;

    if (!allowedTypes.includes(file.type)) {
      setNotice("Invalid image format. Upload only JPG, PNG, or WebP files.");
      return;
    }

    if (file.size > maxFileSize) {
      setNotice("Image is too large. Maximum allowed file size is 5 MB.");
      return;
    }

    const form = new FormData();
    form.append("image", file);
    const response = await apiFetch("/api/admin/upload", { method: "POST", body: form }, true);

    if (!response.ok) {
      setNotice("Image upload failed. Please try again.");
      return;
    }

    const { url } = await response.json();
    const projects = [...content.projects];
    projects[projectIndex] = { ...projects[projectIndex], image: url };
    update("projects", projects);
    setNotice("Image uploaded successfully. Click Save all changes to publish it.");
  }
  async function removeProjectImage(projectIndex: number) {
    if (!content) return;
    const project = content.projects[projectIndex];
    if (!project?.image || !window.confirm("Remove this project image?")) return;
    if (isUploadedProjectImage(project.image)) {
      const response = await apiFetch("/api/admin/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: project.image }) }, true);
      if (!response.ok) return setNotice("Could not remove the stored image. Please try again.");
    }
    const projects = [...content.projects];
    projects[projectIndex] = { ...project, image: "" };
    const next = { ...content, projects };
    update("projects", projects);
    await save(next);
    setNotice("Project image removed.");
  }

  async function deleteProject(projectIndex: number) {
    if (!content) return;
    const project = content.projects[projectIndex];
      if (!project || !window.confirm(`Delete "${project.title || "this project"}"? This cannot be undone.`)) return;
    if (isUploadedProjectImage(project.image)) {
      const response = await apiFetch("/api/admin/upload", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ url: project.image }) }, true);
      if (!response.ok) return setNotice("Could not delete the project image. The project was kept unchanged.");
    }
    const next = { ...content, projects: content.projects.filter((_, index) => index !== projectIndex) };
    update("projects", next.projects);
    await save(next);
    setNotice("Project deleted.");
  }

  async function setInboxStatus(kind: "enquiry" | "review", id: string, status: string) {
    const response = await apiFetch("/api/admin/inbox", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ kind, id, status }) }, true);
    if (!response.ok) return;
    const item = await response.json();
    if (kind === "review" && status === "approved" && content && !content.testimonials.some((testimonial) => testimonial.id === item.id)) {
      const next = { ...content, testimonials: [...content.testimonials, { id: item.id, name: item.name, role: item.role, organization: item.organization, content: item.content, rating: item.rating }] };
      setManagedContent(next); await save(next);
    }
    await load();
  }

  async function addAdmin() {
    const response = await apiFetch("/api/admin/admins", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: adminEmail }) }, true);
    if (!response.ok) { const data = await response.json(); setNotice(data.error || "Could not add administrator."); return; }
    setAdminEmail("");
    setNotice("Administrator added. They can now use Continue with Google to sign in.");
    await load();
  }
  async function revokeAdmin(email: string) {
    if (!window.confirm(`Remove admin access for ${email}?`)) return;
    const response = await apiFetch("/api/admin/admins", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) }, true);
    if (!response.ok) { setNotice("Could not remove administrator access."); return; }
    setNotice("Administrator access removed.");
    await load();
  }
    if (authorized !== true || !content) return (
      <main className="grid min-h-screen place-items-center bg-slate-100 text-slate-700">
        <div className="flex flex-col items-center gap-4" role="status" aria-live="polite">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-slate-300 border-t-amber-500" />
          <span className="text-sm font-semibold">Loading admin dashboard...</span>
        </div>
      </main>
    );
  const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <main className="min-h-screen bg-slate-100 p-4 sm:p-8"><div className="mx-auto max-w-7xl space-y-8">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Protected area</p><h1 className="text-3xl font-black text-slate-900">Admin dashboard</h1></div><div className="flex gap-3"><Link href="/" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold">View website</Link><button onClick={() => save()} disabled={saving} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving ? "Saving..." : "Save all changes"}</button></div></header>
    {notice && <p className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-900">{notice}</p>}

    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-black">Company details</h2>
        <button onClick={addCompanyDetail} className="text-sm font-bold text-amber-700">+ Add detail</button>
      </div>
      <div className="mt-4 grid gap-3 md:grid-cols-2">
        {companyDetailRows.map((row) => {
          const isEditing = editingDetailId === row.id;
          const isCustom = row.id.startsWith(customDetailPrefix);

          return (
            <div key={row.id} className="rounded-xl border border-slate-200 p-3">
              <div className="mb-2 flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-700">{row.label}</span>
                <div className="flex gap-2 text-xs font-bold">
                  {isEditing ? (
                    <button onClick={() => saveCompanyDetailRow(row)} className="text-emerald-700">Save</button>
                  ) : (
                    <button onClick={() => {
                      setEditingDetailId(row.id);
                      setDetailDraft({ label: row.label, value: row.value });
                    }} className="text-amber-700">Edit</button>
                  )}
                  <button onClick={() => deleteCompanyDetail(row)} className="text-red-700">Delete</button>
                </div>
              </div>

              {isEditing ? (
                <div className="space-y-2">
                  {!isCustom && <div className="text-xs text-slate-500">{row.label}</div>}
                  {isCustom && (
                    <input
                      className={input}
                      value={detailDraft.label}
                      placeholder="Detail label"
                      onChange={(event) => setDetailDraft((current) => ({ ...current, label: event.target.value }))}
                    />
                  )}
                  <input
                    className={input}
                    value={detailDraft.value}
                    placeholder="Detail value"
                    onChange={(event) => setDetailDraft((current) => ({ ...current, value: event.target.value }))}
                  />
                </div>
              ) : (
                <div className="min-h-[42px] rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-800">
                  {row.value || "—"}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>

    <section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Key Milestones &amp; Track Record</h2><button onClick={() => update('stats', [...content.stats, { value: '', label: '', sublabel: '' }])} className="text-sm font-bold text-amber-700">+ Add milestone</button></div><div className="mt-4 grid gap-3 md:grid-cols-3">{content.stats.map((stat, index) => <div key={index} className="rounded-xl border p-3 space-y-2"><input className={input} placeholder="Value e.g. 50+" value={stat.value} onChange={(e) => { const next=[...content.stats]; next[index]={...stat,value:e.target.value};update('stats',next); }} /><input className={input} placeholder="Label" value={stat.label} onChange={(e) => { const next=[...content.stats]; next[index]={...stat,label:e.target.value};update('stats',next); }} /><button onClick={() => update('stats', content.stats.filter((_, i) => i !== index))} className="text-xs font-bold text-red-700">Delete</button></div>)}</div></section>

    <VisualContentEditor content={content} onChange={setManagedContent} onUpload={uploadContentImage} />

    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black">Project work &amp; images</h2><button onClick={() => update("projects", [...content.projects, blankProject()])} className="text-sm font-bold text-amber-700">+ Add project</button></div>
      <p className="mt-2 text-sm text-slate-600">Add a project, upload its work image, then select <b>Save all changes</b> to publish it on the website.</p>
      <div className="mt-4 space-y-5">
        {content.projects.map((project, index) => <div key={project.id} className="rounded-xl border border-slate-200 p-4 grid gap-3 md:grid-cols-2">
          <div className="md:col-span-2 flex flex-col gap-4 rounded-xl bg-slate-50 p-3 sm:flex-row">
            <div className="relative h-36 w-full overflow-hidden rounded-lg bg-slate-200 sm:w-56">
              {project.image ? <Image src={project.image} alt={project.title || "Project image"} fill sizes="224px" unoptimized className="object-cover"/>: <div className="grid h-full place-items-center text-xs font-semibold text-slate-500">No project image</div>}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2">
              <label className="w-fit cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Upload / replace image<input className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={(event) => event.target.files?.[0] && upload(event.target.files[0], index)} /></label>
              <button onClick={() => removeProjectImage(index)} disabled={!project.image} className="w-fit text-sm font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-40">Remove image</button>
              <p className="text-xs text-slate-500">JPG, PNG, or WebP; maximum 5 MB.</p>
            </div>
          </div>
          <input className={input} value={project.title} placeholder="Project title" onChange={(event) => { const next=[...content.projects]; next[index]={...project,title:event.target.value}; update("projects",next); }} />
          <select className={input} value={project.category} onChange={(event) => { const next=[...content.projects]; next[index]={...project,category:event.target.value as typeof project.category}; update("projects",next); }}><option>Roads</option><option>Public Works</option><option>Drainage</option><option>Earthwork</option><option>Buildings</option><option>Water Infrastructure</option></select>
          <input className={input} value={project.location} placeholder="Location" onChange={(event) => { const next=[...content.projects]; next[index]={...project,location:event.target.value}; update("projects",next); }} />
          <input className={input} value={project.completionTime} placeholder="Completion time" onChange={(event) => { const next=[...content.projects]; next[index]={...project,completionTime:event.target.value}; update("projects",next); }} />
          <textarea className={input} value={project.description} placeholder="Short description" onChange={(event) => { const next=[...content.projects]; next[index]={...project,description:event.target.value}; update("projects",next); }} />
          <textarea className={input} value={project.fullDetails} placeholder="Full details" onChange={(event) => { const next=[...content.projects]; next[index]={...project,fullDetails:event.target.value}; update("projects",next); }} />
          <input className="md:col-span-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={project.image} placeholder="Image URL (filled automatically after upload)" onChange={(event) => { const next=[...content.projects]; next[index]={...project,image:event.target.value}; update("projects",next); }} />
          <textarea className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" value={project.scope.join("\n")} placeholder="Scope items, one per line" onChange={(event) => { const next=[...content.projects]; next[index]={...project,scope:event.target.value.split("\n").filter(Boolean)}; update("projects",next); }} />
          <button onClick={() => deleteProject(index)} className="w-fit text-xs font-bold text-red-700">Delete project</button>
        </div>)}
      </div>
    </section>

    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div className="flex items-center justify-between gap-4"><h2 className="text-xl font-black">Equipment &amp; machinery</h2><button onClick={() => update("equipment", [...content.equipment, blankEquipment()])} className="text-sm font-bold text-amber-700">+ Add equipment</button></div>
      <p className="mt-2 text-sm text-slate-600">Manage the equipment cards shown on the website. Upload or replace an image, edit the details, then save all changes.</p>
      <div className="mt-4 space-y-5">
        {content.equipment.map((equipment, index) => <div key={equipment.id} className="grid gap-3 rounded-xl border border-slate-200 p-4 md:grid-cols-2">
          <div className="md:col-span-2 flex flex-col gap-4 rounded-xl bg-slate-50 p-3 sm:flex-row">
            <div className="relative h-36 w-full overflow-hidden rounded-lg bg-slate-200 sm:w-56">
              {equipment.image ? <Image src={equipment.image} alt={equipment.name || "Equipment image"} fill sizes="224px" unoptimized className="object-cover" /> : <div className="grid h-full place-items-center text-xs font-semibold text-slate-500">No equipment image</div>}
            </div>
            <div className="flex flex-1 flex-col justify-center gap-2">
              <label className="w-fit cursor-pointer rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white">Upload / replace image<input className="hidden" type="file" accept="image/jpeg,image/png,image/webp" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const url = await uploadContentImage(file); if (url) { const next = [...content.equipment]; next[index] = { ...equipment, image: url }; update("equipment", next); } event.target.value = ""; }} /></label>
              <button onClick={() => { const next = [...content.equipment]; next[index] = { ...equipment, image: "" }; update("equipment", next); }} disabled={!equipment.image} className="w-fit text-sm font-bold text-red-700 disabled:cursor-not-allowed disabled:opacity-40">Remove image</button>
              <p className="text-xs text-slate-500">JPG, PNG, or WebP; maximum 5 MB.</p>
            </div>
          </div>
          <input className={input} value={equipment.name} placeholder="Equipment name" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, name: event.target.value }; update("equipment", next); }} />
          <input className={input} value={equipment.category} placeholder="Category" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, category: event.target.value }; update("equipment", next); }} />
          <textarea className={input} value={equipment.description} placeholder="Description" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, description: event.target.value }; update("equipment", next); }} />
          <input className={input} value={equipment.availability} placeholder="Availability" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, availability: event.target.value }; update("equipment", next); }} />
          <input className="md:col-span-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm" value={equipment.image} placeholder="Image URL" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, image: event.target.value }; update("equipment", next); }} />
          <textarea className="md:col-span-2 rounded-lg border border-slate-300 px-3 py-2 text-sm" value={equipment.specifications.join("\n")} placeholder="Specifications, one per line" onChange={(event) => { const next = [...content.equipment]; next[index] = { ...equipment, specifications: event.target.value.split("\n").filter(Boolean) }; update("equipment", next); }} />
          <button onClick={() => update("equipment", content.equipment.filter((_, itemIndex) => itemIndex !== index))} className="w-fit text-xs font-bold text-red-700">Delete equipment</button>
        </div>)}
      </div>
    </section>

    <section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Published client reviews</h2><button onClick={() => update('testimonials', [...content.testimonials, blankTestimonial()])} className="text-sm font-bold text-amber-700">+ Add review</button></div><div className="mt-4 grid gap-4 md:grid-cols-2">{content.testimonials.map((review,index) => <div key={review.id} className="rounded-xl border p-4 space-y-2"><input className={input} value={review.name} placeholder="Name" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,name:e.target.value};update('testimonials',next)}} /><input className={input} value={review.organization} placeholder="Organization" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,organization:e.target.value};update('testimonials',next)}} /><textarea className={input} value={review.content} placeholder="Review" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,content:e.target.value};update('testimonials',next)}} /><select className={input} value={review.rating} onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,rating:Number(e.target.value)};update('testimonials',next)}}>{[1,2,3,4,5].map((n)=><option key={n} value={n}>{n} stars</option>)}</select><button onClick={()=>update('testimonials',content.testimonials.filter((_,i)=>i!==index))} className="text-xs font-bold text-red-700">Delete review</button></div>)}</div></section>

    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <h2 className="text-xl font-black">Admin access</h2>
      <p className="mt-2 text-sm text-slate-600">Save a valid Google email to allow that person to sign in to the admin portal with Google.</p>
      <div className="mt-4 flex flex-col gap-3 sm:flex-row"><input className={input} value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} type="email" placeholder="Google email address" /><button onClick={addAdmin} className="rounded-lg bg-emerald-700 px-4 py-2 text-sm font-bold text-white">Save as admin</button></div>      <div className="mt-5 space-y-2">{admins.filter((admin) => admin.isActive).map((admin) => <div key={admin.email} className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-200 px-3 py-2 text-sm"><span>{admin.email}</span><button onClick={() => revokeAdmin(admin.email)} className="font-bold text-red-700">Remove admin</button></div>)}</div>
    </section>    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Requested projects / enquiries</h2><div className="mt-4 space-y-3">{enquiries.length ? enquiries.map((entry)=><article key={entry.id} className="rounded-xl border p-4 text-sm"><div className="flex flex-wrap justify-between gap-2"><b>{entry.fullName}</b><select value={entry.status} onChange={(e)=>setInboxStatus('enquiry',entry.id,e.target.value)} className="rounded border px-2 py-1"><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><p>{entry.projectType} {"\u00B7"} {entry.location} {"\u00B7"} {entry.phone}</p><p className="mt-1 text-slate-600">{entry.details}</p></article>) : <p className="text-sm text-slate-500">No enquiries yet.</p>}</div></section>
    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Incoming client reviews</h2><div className="mt-4 space-y-3">{reviews.length ? reviews.map((review)=><article key={review.id} className="rounded-xl border p-4 text-sm"><b>{review.name}</b><p className="mt-1 text-slate-600">{review.content}</p><div className="mt-3 flex gap-3"><button onClick={()=>setInboxStatus('review',review.id,'approved')} className="font-bold text-emerald-700">Approve</button><button onClick={()=>setInboxStatus('review',review.id,'rejected')} className="font-bold text-red-700">Reject</button><span className="text-slate-500">{review.status}</span></div></article>) : <p className="text-sm text-slate-500">No client reviews yet.</p>}</div></section>
  </div></main>;
}
