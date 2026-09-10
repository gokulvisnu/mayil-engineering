"use client";

import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Enquiry, ClientReview, ManagedContent } from "@/types/managed-content";
import { apiFetch } from "@/lib/api";
import { siteConfig } from "@/config/siteConfig";
import { isAdminEmail } from "@/lib/admin-access";
import { getFirebaseAuth } from "@/lib/firebase";

const blankProject = () => ({ id: `project-${Date.now()}`, title: "New project", category: "Public Works" as const, location: "", description: "", fullDetails: "", image: "", scope: [], completionTime: "" });
const blankTestimonial = () => ({ id: `testimonial-${Date.now()}`, name: "", role: "Client", organization: "", content: "", rating: 5 });
const isUploadedProjectImage = (url: string) => url.includes("/storage/v1/object/public/project-images/");

export function AdminDashboard() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const [content, setContent] = useState<ManagedContent | null>({ company: siteConfig.company, contact: siteConfig.contact, stats: siteConfig.stats, projects: siteConfig.projects, testimonials: siteConfig.testimonials });
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [reviews, setReviews] = useState<ClientReview[]>([]);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  async function load() {
    const [contentResponse, inboxResponse] = await Promise.all([apiFetch("/api/admin/content", {}, true), apiFetch("/api/admin/inbox", {}, true)]);
    if (contentResponse.ok) { const remoteContent = await contentResponse.json(); if (remoteContent?.company) setContent(remoteContent); }
    if (inboxResponse.ok) { const inbox = await inboxResponse.json(); setEnquiries(inbox.enquiries); setReviews(inbox.reviews); }
  }
  useEffect(() => {
    const auth = getFirebaseAuth();
    return onAuthStateChanged(auth, (user) => {
      if (!isAdminEmail(user?.email)) {
        void signOut(auth);
        setAuthorized(false);
        router.replace("/login");
        return;
      }
      setAuthorized(true);
      void load();
    });
  }, [router]);

  async function save(next = content) {
    if (!next) return;
    setSaving(true);
    const response = await apiFetch("/api/admin/content", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(next) }, true);
    setSaving(false);
    if (response.ok) { setContent(await response.json()); setNotice("Saved. Public pages update on their next load."); }
    else setNotice("Could not save changes.");
  }
  function update<K extends keyof ManagedContent>(key: K, value: ManagedContent[K]) { if (content) setContent({ ...content, [key]: value }); }
  async function upload(file: File, projectIndex: number) {
    if (!content) return;
    const form = new FormData();
    form.append("image", file);
    const response = await apiFetch("/api/admin/upload", { method: "POST", body: form }, true);
    if (!response.ok) return setNotice("Image upload failed. Use JPG, PNG, or WebP under 5 MB.");
    const { url } = await response.json();
    const projects = [...content.projects];
    projects[projectIndex] = { ...projects[projectIndex], image: url };
    update("projects", projects);
    setNotice("Image uploaded. Click Save all changes to publish it on the website.");
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
    if (!project || !window.confirm(`Delete “${project.title || "this project"}”? This cannot be undone.`)) return;
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
      setContent(next); await save(next);
    }
    await load();
  }

  if (authorized !== true || !content) return <main className="min-h-screen grid place-items-center bg-slate-100 text-slate-700">Loading admin dashboardÃ¢â‚¬Â¦</main>;
  const input = "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm";
  return <main className="min-h-screen bg-slate-100 p-4 sm:p-8"><div className="mx-auto max-w-7xl space-y-8">
    <header className="flex flex-wrap items-center justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-widest text-amber-700">Protected area</p><h1 className="text-3xl font-black text-slate-900">Admin dashboard</h1></div><div className="flex gap-3"><Link href="/" className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-bold">View website</Link><button onClick={() => save()} disabled={saving} className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-bold text-white disabled:opacity-60">{saving ? "SavingÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦" : "Save all changes"}</button></div></header>
    {notice && <p className="rounded-lg bg-amber-100 px-4 py-3 text-sm text-amber-900">{notice}</p>}

    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Company details</h2><div className="mt-4 grid gap-3 md:grid-cols-2">
      {[['name','Business name'],['phoneDisplay','Phone display'],['phoneRaw','Primary phone (+91ÃƒÂ¢Ã¢â€šÂ¬Ã‚Â¦)'],['gstin','GSTIN'],['address','Address'],['whatsappNumber','WhatsApp number']].map(([key,label]) => <label key={key} className="text-sm font-semibold">{label}<input className={input} value={(key in content.company ? content.company : content.contact)[key as never] as string} onChange={(e) => key in content.company ? update('company', { ...content.company, [key]: e.target.value }) : update('contact', { ...content.contact, [key]: e.target.value })} /></label>)}
    </div></section>

    <section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Key Milestones &amp; Track Record</h2><button onClick={() => update('stats', [...content.stats, { value: '', label: '', sublabel: '' }])} className="text-sm font-bold text-amber-700">+ Add milestone</button></div><div className="mt-4 grid gap-3 md:grid-cols-3">{content.stats.map((stat, index) => <div key={index} className="rounded-xl border p-3 space-y-2"><input className={input} placeholder="Value e.g. 50+" value={stat.value} onChange={(e) => { const next=[...content.stats]; next[index]={...stat,value:e.target.value};update('stats',next); }} /><input className={input} placeholder="Label" value={stat.label} onChange={(e) => { const next=[...content.stats]; next[index]={...stat,label:e.target.value};update('stats',next); }} /><button onClick={() => update('stats', content.stats.filter((_, i) => i !== index))} className="text-xs font-bold text-red-700">Delete</button></div>)}</div></section>

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

    <section className="rounded-2xl bg-white p-5 shadow-sm"><div className="flex items-center justify-between"><h2 className="text-xl font-black">Published client reviews</h2><button onClick={() => update('testimonials', [...content.testimonials, blankTestimonial()])} className="text-sm font-bold text-amber-700">+ Add review</button></div><div className="mt-4 grid gap-4 md:grid-cols-2">{content.testimonials.map((review,index) => <div key={review.id} className="rounded-xl border p-4 space-y-2"><input className={input} value={review.name} placeholder="Name" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,name:e.target.value};update('testimonials',next)}} /><input className={input} value={review.organization} placeholder="Organization" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,organization:e.target.value};update('testimonials',next)}} /><textarea className={input} value={review.content} placeholder="Review" onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,content:e.target.value};update('testimonials',next)}} /><select className={input} value={review.rating} onChange={(e)=>{const next=[...content.testimonials];next[index]={...review,rating:Number(e.target.value)};update('testimonials',next)}}>{[1,2,3,4,5].map((n)=><option key={n} value={n}>{n} stars</option>)}</select><button onClick={()=>update('testimonials',content.testimonials.filter((_,i)=>i!==index))} className="text-xs font-bold text-red-700">Delete review</button></div>)}</div></section>

    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Requested projects / enquiries</h2><div className="mt-4 space-y-3">{enquiries.length ? enquiries.map((entry)=><article key={entry.id} className="rounded-xl border p-4 text-sm"><div className="flex flex-wrap justify-between gap-2"><b>{entry.fullName}</b><select value={entry.status} onChange={(e)=>setInboxStatus('enquiry',entry.id,e.target.value)} className="rounded border px-2 py-1"><option value="new">New</option><option value="contacted">Contacted</option><option value="closed">Closed</option></select></div><p>{entry.projectType} Ãƒâ€šÃ‚Â· {entry.location} Ãƒâ€šÃ‚Â· {entry.phone}</p><p className="mt-1 text-slate-600">{entry.details}</p></article>) : <p className="text-sm text-slate-500">No enquiries yet.</p>}</div></section>
    <section className="rounded-2xl bg-white p-5 shadow-sm"><h2 className="text-xl font-black">Incoming client reviews</h2><div className="mt-4 space-y-3">{reviews.length ? reviews.map((review)=><article key={review.id} className="rounded-xl border p-4 text-sm"><b>{review.name}</b><p className="mt-1 text-slate-600">{review.content}</p><div className="mt-3 flex gap-3"><button onClick={()=>setInboxStatus('review',review.id,'approved')} className="font-bold text-emerald-700">Approve</button><button onClick={()=>setInboxStatus('review',review.id,'rejected')} className="font-bold text-red-700">Reject</button><span className="text-slate-500">{review.status}</span></div></article>) : <p className="text-sm text-slate-500">No client reviews yet.</p>}</div></section>
  </div></main>;
}
