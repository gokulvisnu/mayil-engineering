import "dotenv/config";
import { createClient } from "@supabase/supabase-js";

const required = (name: string) => {
  const value = process.env[name];
  if (!value) throw new Error(`Missing required environment variable: ${name}`);
  return value;
};

export const config = {
  port: Number(process.env.PORT || 4000),
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:3000",
  adminEmail: required("ADMIN_EMAIL"),
  supabaseUrl: required("NEXT_PUBLIC_SUPABASE_URL"),
  supabaseSecretKey: required("SUPABASE_SECRET_KEY"),
};

export const supabase = createClient(config.supabaseUrl, config.supabaseSecretKey, {
  auth: { autoRefreshToken: false, persistSession: false },
});
