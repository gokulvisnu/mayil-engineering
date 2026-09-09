import "server-only";

import { promises as fs } from "fs";
import path from "path";
import { siteConfig } from "@/config/siteConfig";
import type { ProjectItem, SiteConfig, StatItem, TestimonialItem } from "@/types";

export type ManagedContent = Pick<
  SiteConfig,
  "company" | "contact" | "stats" | "projects" | "testimonials"
>;

export interface Enquiry {
  id: string;
  createdAt: string;
  status: "new" | "contacted" | "closed";
  fullName: string;
  phone: string;
  email?: string;
  organization?: string;
  projectType: string;
  location: string;
  details?: string;
}

export interface ClientReview extends TestimonialItem {
  createdAt: string;
  status: "pending" | "approved" | "rejected";
}

const dataDirectory = path.join(process.cwd(), "data");
const contentFile = path.join(dataDirectory, "admin-content.json");
const enquiriesFile = path.join(dataDirectory, "enquiries.json");
const reviewsFile = path.join(dataDirectory, "client-reviews.json");

const defaults: ManagedContent = {
  company: siteConfig.company,
  contact: siteConfig.contact,
  stats: siteConfig.stats,
  projects: siteConfig.projects,
  testimonials: siteConfig.testimonials,
};

async function readJson<T>(file: string, fallback: T): Promise<T> {
  try {
    return JSON.parse(await fs.readFile(file, "utf8")) as T;
  } catch {
    return fallback;
  }
}

async function writeJson(file: string, value: unknown) {
  await fs.mkdir(dataDirectory, { recursive: true });
  await fs.writeFile(file, JSON.stringify(value, null, 2), "utf8");
}

export async function getManagedContent() {
  const stored = await readJson<Partial<ManagedContent>>(contentFile, {});
  return {
    ...defaults,
    ...stored,
    company: { ...defaults.company, ...stored.company },
    contact: { ...defaults.contact, ...stored.contact },
  } as ManagedContent;
}

export async function saveManagedContent(content: ManagedContent) {
  await writeJson(contentFile, content);
}

export async function getEnquiries() {
  return readJson<Enquiry[]>(enquiriesFile, []);
}

export async function saveEnquiries(enquiries: Enquiry[]) {
  await writeJson(enquiriesFile, enquiries);
}

export async function getReviews() {
  return readJson<ClientReview[]>(reviewsFile, []);
}

export async function saveReviews(reviews: ClientReview[]) {
  await writeJson(reviewsFile, reviews);
}

export function newId(prefix: string) {
  return `${prefix}-${crypto.randomUUID()}`;
}

export type { ProjectItem, StatItem, TestimonialItem };
