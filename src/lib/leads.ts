import { getSupabaseAdmin } from "@/lib/supabase";

export type LeadExportRow = {
  id: string;
  email: string;
  source: string | null;
  created_at: string | null;
  free_pdf_sent: boolean | null;
  last_email_sent_at: string | null;
};

export async function getLeadExportRows() {
  const { data, error } = await getSupabaseAdmin()
    .from("leads")
    .select("id,email,source,created_at,free_pdf_sent,last_email_sent_at")
    .order("created_at", { ascending: false })
    .range(0, 9999);

  if (error) {
    throw new Error(error.message);
  }

  return (data || []) as LeadExportRow[];
}
