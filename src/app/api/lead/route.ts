import { NextResponse } from "next/server";
import { getSiteUrl } from "@/lib/env";
import { sendFreePdfEmail } from "@/lib/email";
import { getSupabaseAdmin } from "@/lib/supabase";
import { createFreeDownloadToken } from "@/lib/tokens";
import { normalizeEmail } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string; website?: string };

    if (body.website) {
      return NextResponse.json({ error: "Unable to process this request." }, { status: 400 });
    }

    const email = normalizeEmail(body.email);

    if (!email) {
      return NextResponse.json({ error: "Enter a valid email address." }, { status: 400 });
    }

    const { error: upsertError } = await getSupabaseAdmin().from("leads").upsert(
      {
        email,
        source: "smc_free_pdf",
      },
      {
        onConflict: "email",
      },
    );

    if (upsertError) {
      throw new Error(upsertError.message);
    }

    const token = createFreeDownloadToken(email);
    await sendFreePdfEmail(email, token);

    const { error: updateError } = await getSupabaseAdmin()
      .from("leads")
      .update({
        free_pdf_sent: true,
        last_email_sent_at: new Date().toISOString(),
      })
      .eq("email", email);

    if (updateError) {
      throw new Error(updateError.message);
    }

    return NextResponse.json({
      ok: true,
      redirectTo: `${getSiteUrl()}/free-success?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to send the guide." },
      { status: 500 },
    );
  }
}

