import type { Metadata } from "next";
import { LockKeyhole, LogOut } from "lucide-react";
import { AdminLeadsTable } from "@/components/AdminLeadsTable";
import { getLeadExportRows } from "@/lib/leads";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { loginAdmin, logoutAdmin } from "@/app/admin/actions";

export const metadata: Metadata = {
  title: "Admin | SMC Guide",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return (
      <main className="min-h-screen bg-background px-5 py-16 text-white">
        <section className="mx-auto max-w-md">
          <div className="mb-5 inline-flex items-center gap-2 text-sm font-bold text-[#d7ff61]">
            <LockKeyhole className="h-5 w-5" />
            SMC Guide Admin
          </div>
          <div className="glass rounded-xl p-6 sm:p-8">
            <h1 className="text-3xl font-black">Admin login</h1>
            <p className="mt-3 leading-7 text-white/62">
              Enter the admin password to view and export captured email leads.
            </p>
            <form action={loginAdmin} className="mt-6 space-y-4">
              <label className="block">
                <span className="text-sm font-bold text-white/72">Password</span>
                <input
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="mt-2 min-h-12 w-full rounded-lg border border-white/10 bg-black/30 px-4 text-white outline-none transition focus:border-[#d7ff61]/70"
                />
              </label>
              {params.error === "invalid" ? (
                <p className="rounded-lg border border-red-400/30 bg-red-500/10 p-3 text-sm text-red-100">
                  That password did not work. Try again.
                </p>
              ) : null}
              <button
                type="submit"
                className="inline-flex min-h-12 w-full items-center justify-center rounded-lg bg-[#d7ff61] px-5 py-3 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d]"
              >
                Log in
              </button>
            </form>
          </div>
        </section>
      </main>
    );
  }

  const leads = await getLeadExportRows();

  return (
    <main className="min-h-screen bg-background px-5 py-10 text-white">
      <section className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-bold text-[#d7ff61]">SMC Guide Admin</p>
            <h1 className="mt-2 text-3xl font-black sm:text-4xl">Lead export</h1>
            <p className="mt-3 max-w-2xl leading-7 text-white/62">
              Select the captured emails you want, then download a CSV for your marketing or retargeting platform.
            </p>
          </div>
          <form action={logoutAdmin}>
            <button
              type="submit"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/14 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/8"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </form>
        </div>

        <AdminLeadsTable leads={leads} />
      </section>
    </main>
  );
}
