"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import type { ManagedContent } from "@/types/managed-content";
import { apiFetch } from "@/lib/api";

const fallback: ManagedContent = {
  company: siteConfig.company,
  contact: siteConfig.contact,
  stats: siteConfig.stats,
  projects: siteConfig.projects,
  testimonials: siteConfig.testimonials,
};

export function useManagedContent() {
  const [content, setContent] = useState<ManagedContent>(fallback);

  useEffect(() => {
    apiFetch("/api/content")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ManagedContent | null) => data?.company && setContent(data))
      .catch(() => undefined);
  }, []);

  return content;
}
