"use client";

import type { ManagedContent } from "@/types/managed-content";

type EditorValue = string | number | boolean | null | EditorValue[] | { [key: string]: EditorValue };
type EditorObject = { [key: string]: EditorValue };

const sectionLabels: Record<keyof ManagedContent, string> = {
  navLinks: "Navigation Menu",
  company: "Company and About",
  contact: "Contact and Enquiry",
  maps: "Map and Location",
  socialLinks: "Social Links",
  trustIndicators: "Trust Indicators",
  stats: "Key Milestones",
  services: "Services",
  developmentCategories: "Community Works",
  projects: "Projects",
  equipment: "Equipment and Machinery",
  advantages: "Why Choose Us",
  safetyPriorities: "Safety and Quality",
  workProcess: "Work Process",
  testimonials: "Client Testimonials",
};

const inputClass = "mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900";

function labelFor(key: string) {
  return key.replace(/([A-Z])/g, " $1").replace(/^./, (value) => value.toUpperCase());
}

function blankValue(value: EditorValue): EditorValue {
  if (Array.isArray(value)) return [];
  if (value && typeof value === "object") {
    return Object.fromEntries(Object.entries(value).map(([key, item]) => [key, key === "id" ? `${key}-${Date.now()}` : blankValue(item)]));
  }
  if (typeof value === "number") return 0;
  if (typeof value === "boolean") return false;
  return "";
}

function isImageField(key: string) {
  return key.toLowerCase().includes("image") || key.toLowerCase().includes("logo");
}

interface ValueEditorProps {
  value: EditorValue;
  fieldKey: string;
  onChange: (value: EditorValue) => void;
  onDelete?: () => void;
  onUpload: (file: File) => Promise<string | null>;
}

function ValueEditor({ value, fieldKey, onChange, onDelete, onUpload }: ValueEditorProps) {
  if (Array.isArray(value)) {
    return (
      <div className="mt-2 space-y-2 rounded-lg border border-slate-200 bg-slate-50 p-3">
        {value.map((item, index) => (
          <div key={index} className="rounded-lg border border-slate-200 bg-white p-3">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Item {index + 1}</span>
              <button type="button" onClick={() => onChange(value.filter((_, itemIndex) => itemIndex !== index))} className="text-xs font-bold text-red-700">Delete</button>
            </div>
            <ValueEditor value={item} fieldKey={fieldKey} onChange={(nextItem) => onChange(value.map((current, itemIndex) => itemIndex === index ? nextItem : current))} onUpload={onUpload} />
          </div>
        ))}
        <button type="button" onClick={() => onChange([...value, value.length ? blankValue(value[0]) : ""])} className="rounded-lg border border-amber-300 px-3 py-2 text-xs font-bold text-amber-800">+ Add item</button>
      </div>
    );
  }

  if (value && typeof value === "object") {
    return (
      <div className="grid gap-3 rounded-lg border border-slate-200 bg-slate-50 p-3 md:grid-cols-2">
        {Object.entries(value).map(([key, childValue]) => (
          <label key={key} className={`text-sm font-semibold text-slate-700 ${typeof childValue === "object" && childValue !== null ? "md:col-span-2" : ""}`}>
            {labelFor(key)}
            <ValueEditor value={childValue} fieldKey={key} onChange={(nextValue) => onChange({ ...value, [key]: nextValue })} onUpload={onUpload} />
          </label>
        ))}
      </div>
    );
  }

  const stringValue = value === null ? "" : String(value);
  const multiline = fieldKey.toLowerCase().includes("description") || fieldKey.toLowerCase().includes("details") || fieldKey.toLowerCase().includes("content") || fieldKey.toLowerCase().includes("message") || stringValue.length > 140;
  return (
    <>
      {multiline ? (
        <textarea className={`${inputClass} min-h-24`} value={stringValue} onChange={(event) => onChange(event.target.value)} />
      ) : (
        <input className={inputClass} type={typeof value === "number" ? "number" : "text"} value={stringValue} onChange={(event) => onChange(typeof value === "number" ? Number(event.target.value) : event.target.value)} />
      )}
      {isImageField(fieldKey) && <div className="mt-2 flex flex-wrap items-center gap-3">
        <label className="cursor-pointer rounded-lg bg-slate-900 px-3 py-2 text-xs font-bold text-white">
          Upload image
          <input type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={async (event) => { const file = event.target.files?.[0]; if (!file) return; const url = await onUpload(file); if (url) onChange(url); event.target.value = ""; }} />
        </label>
        {stringValue && <img src={stringValue} alt={`${labelFor(fieldKey)} preview`} className="h-24 w-48 rounded-lg object-cover" />}
      </div>}
    </>
  );
}

interface VisualContentEditorProps {
  content: ManagedContent;
  onChange: (content: ManagedContent) => void;
  onUpload: (file: File) => Promise<string | null>;
}

export function VisualContentEditor({ content, onChange, onUpload }: VisualContentEditorProps) {
  const entries = Object.entries(content) as [keyof ManagedContent, EditorValue][];
  return (
    <section className="rounded-2xl bg-white p-5 shadow-sm">
      <div>
        <h2 className="text-xl font-black">Website sections</h2>
        <p className="mt-2 text-sm text-slate-600">Open each section below to edit the website manually. Every field is editable without code. Use Add item or Delete on list content, then select Save all changes at the top.</p>
      </div>
      <div className="mt-5 space-y-3">
        {entries.map(([key, value]) => (
          <details key={String(key)} className="rounded-xl border border-slate-200 bg-slate-50 p-4" open={key === "company"}>
            <summary className="cursor-pointer text-base font-black text-slate-900">{sectionLabels[key]}</summary>
            <div className="mt-4">
              <ValueEditor value={value} fieldKey={String(key)} onChange={(nextValue) => onChange({ ...content, [key]: nextValue } as ManagedContent)} onUpload={onUpload} />
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}
