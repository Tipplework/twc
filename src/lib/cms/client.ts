import { createClient, type SupabaseClient } from "@supabase/supabase-js";

const url = import.meta.env.VITE_SUPABASE_URL;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const cmsConfigured = Boolean(url && anonKey);

export const supabase: SupabaseClient | null = cmsConfigured
  ? createClient(url, anonKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

let reported = false;

export function reportCmsFallback(reason: string) {
  if (reported) return;
  reported = true;
  console.warn(`[cms] ${reason} The public site is using its local content fallback.`);
}
