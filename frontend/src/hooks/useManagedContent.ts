"use client";

import { useEffect, useState } from "react";
import { siteConfig } from "@/config/siteConfig";
import type { ManagedContent } from "@/types/managed-content";
import { apiFetch } from "@/lib/api";

const fallback: ManagedContent = siteConfig as ManagedContent;

export function useManagedContent() {
  const [content, setContent] = useState<ManagedContent>(fallback);

  useEffect(() => {
    apiFetch("/api/content")
      .then((response) => (response.ok ? response.json() : null))
      .then((data: ManagedContent | null) => {
        if (data && data.company) {
          setContent({
            ...fallback,
            ...data,
            company: { ...fallback.company, ...data.company },
            contact: { ...fallback.contact, ...data.contact },
            maps: { ...fallback.maps, ...data.maps },
            socialLinks: { ...fallback.socialLinks, ...data.socialLinks },
            navLinks: data.navLinks ?? fallback.navLinks,
            trustIndicators: data.trustIndicators ?? fallback.trustIndicators,
            stats: data.stats ?? fallback.stats,
            services: data.services ?? fallback.services,
            developmentCategories: data.developmentCategories ?? fallback.developmentCategories,
            projects: data.projects ?? fallback.projects,
            equipment: data.equipment ?? fallback.equipment,
            advantages: data.advantages ?? fallback.advantages,
            safetyPriorities: data.safetyPriorities ?? fallback.safetyPriorities,
            workProcess: data.workProcess ?? fallback.workProcess,
            testimonials: data.testimonials ?? fallback.testimonials,
          });
        }
      })
      .catch(() => undefined);
  }, []);

  return content;
}
