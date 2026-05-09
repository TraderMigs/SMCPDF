import { getSiteUrl } from "@/lib/env";
import { getResend } from "@/lib/resend";

function fromAddress() {
  return process.env.EMAIL_FROM || "Smart Money Concepts <onboarding@resend.dev>";
}

export async function sendFreePdfEmail(email: string, token: string) {
  const downloadUrl = `${getSiteUrl()}/api/free-download?token=${encodeURIComponent(token)}`;
  const paidUrl = `${getSiteUrl()}/?email=${encodeURIComponent(email)}#advanced`;

  return getResend().emails.send({
    from: fromAddress(),
    to: email,
    subject: "Your Free Smart Money Concepts Guide",
    html: `
      <div style="font-family:Arial,sans-serif;background:#07090c;color:#f7f7f2;padding:28px">
        <div style="max-width:620px;margin:0 auto;background:#11161c;border:1px solid #26313a;padding:28px;border-radius:12px">
          <h1 style="margin-top:0">Your free Smart Money Concepts guide is ready</h1>
          <p>Thanks for starting with the foundation. This free guide is built to help you understand the basic structure before going deeper.</p>
          <p><a href="${downloadUrl}" style="display:inline-block;background:#d7ff61;color:#10130f;text-decoration:none;padding:14px 18px;border-radius:8px;font-weight:700">Download the free guide</a></p>
          <p>If you are ready for the full intermediate/advanced version, it is available for $37 during this launch price.</p>
          <p><a href="${paidUrl}" style="color:#d7ff61">View the full guide offer</a></p>
          <p style="font-size:13px;color:#a8b2bd">Educational content only. This is not financial advice, does not guarantee profits, and trading involves substantial risk. You are responsible for your own decisions.</p>
        </div>
      </div>
    `,
  });
}

export async function sendPaidPdfEmail(email: string, sessionId: string) {
  const downloadUrl = `${getSiteUrl()}/api/paid-download?session_id=${encodeURIComponent(sessionId)}`;

  return getResend().emails.send({
    from: fromAddress(),
    to: email,
    subject: "Your Full Smart Money Concepts Guide",
    html: `
      <div style="font-family:Arial,sans-serif;background:#07090c;color:#f7f7f2;padding:28px">
        <div style="max-width:620px;margin:0 auto;background:#11161c;border:1px solid #26313a;padding:28px;border-radius:12px">
          <h1 style="margin-top:0">Your full Smart Money Concepts guide is ready</h1>
          <p>Your purchase is confirmed. Use the secure button below to download the full intermediate/advanced PDF and save a copy for your own study.</p>
          <p><a href="${downloadUrl}" style="display:inline-block;background:#d7ff61;color:#10130f;text-decoration:none;padding:14px 18px;border-radius:8px;font-weight:700">Download the full guide</a></p>
          <p style="font-size:13px;color:#a8b2bd">Educational content only. This is not financial advice, does not guarantee profits, and trading involves substantial risk. You are responsible for your own decisions. Past examples do not guarantee future results.</p>
        </div>
      </div>
    `,
  });
}

