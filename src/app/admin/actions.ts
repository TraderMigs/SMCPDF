"use server";

import { redirect } from "next/navigation";
import {
  clearAdminSessionCookie,
  setAdminSessionCookie,
  verifyAdminPassword,
} from "@/lib/admin-auth";

export async function loginAdmin(formData: FormData) {
  const password = String(formData.get("password") || "");

  if (!verifyAdminPassword(password)) {
    redirect("/admin?error=invalid");
  }

  await setAdminSessionCookie();
  redirect("/admin");
}

export async function logoutAdmin() {
  await clearAdminSessionCookie();
  redirect("/admin");
}
