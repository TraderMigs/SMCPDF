import crypto from "node:crypto";
import { requireEnv } from "@/lib/env";

type DownloadPurpose = "free_pdf";

type TokenPayload = {
  email: string;
  purpose: DownloadPurpose;
  exp: number;
};

function base64url(input: string | Buffer) {
  return Buffer.from(input)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

function sign(data: string) {
  return base64url(
    crypto
      .createHmac("sha256", requireEnv("SUPABASE_SERVICE_ROLE_KEY"))
      .update(data)
      .digest(),
  );
}

export function createFreeDownloadToken(email: string) {
  const payload: TokenPayload = {
    email,
    purpose: "free_pdf",
    exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 7,
  };
  const encodedPayload = base64url(JSON.stringify(payload));
  return `${encodedPayload}.${sign(encodedPayload)}`;
}

export function verifyFreeDownloadToken(token: string | null) {
  if (!token) {
    return null;
  }

  const [encodedPayload, signature] = token.split(".");

  if (!encodedPayload || !signature || sign(encodedPayload) !== signature) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encodedPayload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString(),
    ) as TokenPayload;

    if (payload.purpose !== "free_pdf" || payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

