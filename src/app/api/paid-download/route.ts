import { NextResponse } from "next/server";
import { createPaidPdfSignedUrl } from "@/lib/downloads";
import { verifyPaidPurchase } from "@/lib/purchases";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");
    const purchase = await verifyPaidPurchase(sessionId);

    if (!purchase) {
      return NextResponse.json({ error: "A paid purchase is required for this download." }, { status: 403 });
    }

    return NextResponse.redirect(await createPaidPdfSignedUrl());
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unable to create download link." },
      { status: 500 },
    );
  }
}

