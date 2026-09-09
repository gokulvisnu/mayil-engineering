"use client";

import { getFirebaseAuth } from "@/lib/firebase";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

export async function apiFetch(path: string, options: RequestInit = {}, admin = false) {
  const headers = new Headers(options.headers);
  if (admin) {
    const user = getFirebaseAuth().currentUser;
    if (!user) throw new Error("Please sign in as the administrator.");
    headers.set("Authorization", `Bearer ${await user.getIdToken()}`);
  }
  return fetch(`${apiUrl}${path}`, { ...options, headers });
}
