import { signIn } from "@/auth";

export default function LoginPage() {
  async function login() {
    "use server";
    await signIn("google", { redirectTo: "/admin" });
  }

  return (
    <main className="min-h-screen grid place-items-center bg-slate-950 p-6">
      <form action={login} className="w-full max-w-md rounded-2xl bg-white p-8 shadow-2xl">
        <p className="text-xs font-bold uppercase tracking-widest text-amber-600">Mayil Engineering &amp; Traders</p>
        <h1 className="mt-2 text-2xl font-black text-slate-900">Admin sign in</h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Only the Google account matching the configured administrator email can access the management dashboard.</p>
        <button className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-bold text-white hover:bg-slate-800">Continue with Google</button>
      </form>
    </main>
  );
}
