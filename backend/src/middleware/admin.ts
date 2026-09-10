import type { NextFunction, Request, Response } from "express";
import { cert, getApps, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { config, supabase } from "../config.js";

const privateKey = process.env.FIREBASE_PRIVATE_KEY?.trim().replace(/^["']|["']$/g, "").replace(/\\n/g, "\n");
if (!getApps().length && process.env.FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && privateKey) {
  initializeApp({ credential: cert({ projectId: process.env.FIREBASE_PROJECT_ID, clientEmail: process.env.FIREBASE_CLIENT_EMAIL, privateKey }) });
}

export async function requireAdmin(request: Request, response: Response, next: NextFunction) {
  const token = request.headers.authorization?.replace(/^Bearer\s+/i, "");
  if (!token) return response.status(401).json({ error: "Authentication required" });
  try {
    const user = await getAuth().verifyIdToken(token);
    const email = user.email?.trim().toLowerCase();
    if (!email) return response.status(403).json({ error: "Admin access required" });

    const { data, error } = await supabase.from("admins").select("is_active").eq("email", email).maybeSingle();
    if (!error && data) return data.is_active ? next() : response.status(403).json({ error: "Admin access required" });
    if (!error) {
      const { count } = await supabase.from("admins").select("email", { count: "exact", head: true });
      if ((count || 0) > 0) return response.status(403).json({ error: "Admin access required" });
    }

    if (config.adminEmails.includes(email)) return next();
    return response.status(403).json({ error: "Admin access required" });
  } catch {
    return response.status(401).json({ error: "Invalid or expired sign-in token" });
  }
}