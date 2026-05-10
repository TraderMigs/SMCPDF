import crypto from "node:crypto";
import { cookies } from "next/headers";
import { requireEnv } from "@/lib/env";

const ADMIN_COOKIE = "smc_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12;

function getSecret() {
  return requireEnv("ADMIN_SESSION_SECRET");
}

function sign(value: string) {
  return crypto.createHmac("sha256", getSecret()).update(value).digest("base64url");
}

function timingSafeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return crypto.timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyAdminPassword(password: string) {
  const expectedPassword = requireEnv("ADMIN_PASSWORD");
  return timingSafeEqual(password, expectedPassword);
}

export function createAdminSessionValue() {
  const expiresAt = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = `admin.${expiresAt}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyAdminSessionValue(session: string | undefined) {
  if (!session) {
    return false;
  }

  const parts = session.split(".");
  if (parts.length !== 3) {
    return false;
  }

  const [role, expiresAt, signature] = parts;
  const payload = `${role}.${expiresAt}`;
  const expiry = Number(expiresAt);

  if (role !== "admin" || !Number.isFinite(expiry) || expiry < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return timingSafeEqual(signature, sign(payload));
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionValue(cookieStore.get(ADMIN_COOKIE)?.value);
}

export async function setAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE, createAdminSessionValue(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: SESSION_TTL_SECONDS,
    path: "/admin",
  });
}

export async function clearAdminSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE);
}
