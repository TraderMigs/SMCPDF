import { getSupabaseAdmin } from "@/lib/supabase";
import { requireEnv } from "@/lib/env";

const SIGNED_URL_TTL_SECONDS = 60 * 10;

export async function createFreePdfSignedUrl() {
  return createSignedUrl(
    requireEnv("SUPABASE_FREE_PDF_BUCKET"),
    requireEnv("SUPABASE_FREE_PDF_PATH"),
  );
}

export async function createPaidPdfSignedUrl() {
  return createSignedUrl(
    requireEnv("SUPABASE_PAID_PDF_BUCKET"),
    requireEnv("SUPABASE_PAID_PDF_PATH"),
  );
}

async function createSignedUrl(bucket: string, path: string) {
  const { data, error } = await getSupabaseAdmin()
    .storage.from(bucket)
    .createSignedUrl(path, SIGNED_URL_TTL_SECONDS, {
      download: true,
    });

  if (error || !data?.signedUrl) {
    throw new Error(error?.message || "Unable to create signed download URL");
  }

  return data.signedUrl;
}

