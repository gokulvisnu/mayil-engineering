import type { SiteConfig } from "@/types";

export type ManagedContent = Pick<SiteConfig, "company" | "contact" | "stats" | "projects" | "testimonials">;

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

export interface ClientReview {
  id: string;
  createdAt: string;
  status: "pending" | "approved" | "rejected";
  name: string;
  role: string;
  organization: string;
  content: string;
  rating: number;
}
