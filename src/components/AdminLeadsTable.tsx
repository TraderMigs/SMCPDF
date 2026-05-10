"use client";

import { useMemo, useState } from "react";
import { Check, Download } from "lucide-react";
import type { LeadExportRow } from "@/lib/leads";

const csvColumns: Array<keyof Omit<LeadExportRow, "id">> = [
  "email",
  "source",
  "created_at",
  "free_pdf_sent",
  "last_email_sent_at",
];

function escapeCsvValue(value: string | boolean | null) {
  const normalized = value === null ? "" : String(value);
  return `"${normalized.replace(/"/g, '""')}"`;
}

function buildCsv(rows: LeadExportRow[]) {
  const header = csvColumns.join(",");
  const body = rows.map((row) => csvColumns.map((column) => escapeCsvValue(row[column])).join(","));
  return [header, ...body].join("\r\n");
}

function formatDate(value: string | null) {
  if (!value) {
    return "-";
  }

  return new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
}

export function AdminLeadsTable({ leads }: { leads: LeadExportRow[] }) {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(() => new Set());

  const selectedRows = useMemo(
    () => leads.filter((lead) => selectedIds.has(lead.id)),
    [leads, selectedIds],
  );
  const allSelected = leads.length > 0 && selectedIds.size === leads.length;

  function toggleAll() {
    setSelectedIds(allSelected ? new Set() : new Set(leads.map((lead) => lead.id)));
  }

  function toggleOne(id: string) {
    setSelectedIds((current) => {
      const next = new Set(current);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function downloadCsv() {
    const rows = selectedRows.length > 0 ? selectedRows : leads;
    const blob = new Blob([buildCsv(rows)], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    const today = new Date().toISOString().slice(0, 10);

    link.href = url;
    link.download = `smc-leads-${today}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.045]">
      <div className="flex flex-col gap-3 border-b border-white/10 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-bold text-white">{leads.length} captured emails</p>
          <p className="mt-1 text-xs text-white/50">
            {selectedRows.length > 0 ? `${selectedRows.length} selected for export` : "No rows selected. Download exports all rows."}
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={toggleAll}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-white/14 px-4 py-2 text-sm font-bold text-white transition hover:bg-white/8"
          >
            <Check className="h-4 w-4" />
            {allSelected ? "Clear selection" : "Select all"}
          </button>
          <button
            type="button"
            onClick={downloadCsv}
            disabled={leads.length === 0}
            className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-[#d7ff61] px-4 py-2 text-sm font-bold text-[#10130f] transition hover:bg-[#ecff9d] disabled:cursor-not-allowed disabled:opacity-45"
          >
            <Download className="h-4 w-4" />
            Download CSV
          </button>
        </div>
      </div>

      <div className="max-h-[520px] overflow-auto">
        <table className="min-w-[860px] w-full text-left text-sm">
          <thead className="sticky top-0 bg-[#11161c] text-xs uppercase tracking-[0.14em] text-white/45">
            <tr>
              <th className="w-12 p-4">Pick</th>
              <th className="p-4">Email</th>
              <th className="p-4">Source</th>
              <th className="p-4">Captured</th>
              <th className="p-4">Free sent</th>
              <th className="p-4">Last email</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/8 text-white/72">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition hover:bg-white/[0.035]">
                <td className="p-4">
                  <input
                    aria-label={`Select ${lead.email}`}
                    type="checkbox"
                    checked={selectedIds.has(lead.id)}
                    onChange={() => toggleOne(lead.id)}
                    className="h-4 w-4 accent-[#d7ff61]"
                  />
                </td>
                <td className="p-4 font-semibold text-white">{lead.email}</td>
                <td className="p-4">{lead.source || "-"}</td>
                <td className="p-4">{formatDate(lead.created_at)}</td>
                <td className="p-4">{lead.free_pdf_sent ? "Yes" : "No"}</td>
                <td className="p-4">{formatDate(lead.last_email_sent_at)}</td>
              </tr>
            ))}
            {leads.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-white/52">
                  No leads yet. Once someone enters an email for the free guide, it will appear here.
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </div>
  );
}
