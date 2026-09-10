"use client";

import { signInWithPopup, signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { apiFetch } from "@/lib/api";
import { getFirebaseAuth, getGoogleProvider } from "@/lib/firebase";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login() {
    setError("");
    setLoading(true);
    const auth = getFirebaseAuth();
    try {
      await signInWithPopup(auth, getGoogleProvider());
      const response = await apiFetch("/api/admin/content", {}, true);
      if (!response.ok) {
        await signOut(auth);
        setError("This Google account is not authorized to access the admin dashboard.");
        return;
      }
      router.replace("/admin");
    } catch {
      setError("Google sign-in could not be completed. Check Firebase Authentication settings.");
    } finally {
      setLoading(false);
    }
  }

  return <main className="min-h-screen grid place-items-center bg-slate-950 p-6"><div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl"><p className="text-xs font-bold uppercase tracking-widest text-amber-600">Mayil Engineering &amp; Traders</p><h1 className="mt-2 text-2xl font-black text-slate-900">Admin sign in</h1><p className="mt-3 text-sm leading-relaxed text-slate-600">Only approved Google accounts can access the management dashboard.</p>{error && <p className="mt-4 text-sm text-red-700">{error}</p>}<button onClick={login} disabled={loading} className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800 disabled:opacity-60">{loading ? "Signing in..." : "Continue with Google"}</button></div></main>;
}