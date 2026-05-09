import { NextResponse } from "next/server";
import { createFreePdfSignedUrl } from "@/lib/downloads";
import { getSupabaseAdmin } from "@/lib/supabase";
import { verifyFreeDownloadToken } from "@/lib/tokens";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const payload = verifyFreeDownloadToken(searchParams.get("token"));

    if (!payload) {
      return NextResponse.json({ error: "This download link is invalid or expired." }, { status: 401 });
    }

    const { data } = await getSupabaseAdmin()
      .from("leads")
      .select("email")
      .eq("email", payload.email)
      .maybeSingle();

    if (!data) {
      return NextResponse.json({ error: "No matching lead record was found." }, { status: 403 });
    }

    return NextResponse.redirect(await createFreePdfSignedUrl());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create download link." },
      { status: 500 },
    );
  }
}

