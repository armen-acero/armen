// Vercel serverless function: sends a branded thank-you email to someone who
// completes the AI Opportunity quiz, using Resend.
//
// Requires the environment variable RESEND_API_KEY to be set in the Vercel
// project (Settings -> Environment Variables). Until it is set, this function
// safely no-ops so the quiz still works.
//
// The "from" domain (armenandonian.com) must be verified in Resend before
// emails will deliver to real addresses.

const FROM = "Armen Andonian <hello@armenandonian.com>";
const REPLY_TO = "armen@acero.digital";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const key = process.env.RESEND_API_KEY;
  if (!key) {
    // Not configured yet, so don't block the visitor's experience.
    return res.status(200).json({ ok: false, reason: "email-not-configured" });
  }

  // Body may arrive parsed or as a raw string depending on runtime.
  let data = req.body;
  if (typeof data === "string") {
    try {
      data = JSON.parse(data);
    } catch {
      data = {};
    }
  }
  data = data || {};

  const email = (data.email || "").trim();
  if (!email) {
    return res.status(400).json({ ok: false, error: "Missing email" });
  }

  const fmt = (n) => "£" + Number(n || 0).toLocaleString("en-GB");
  const monthlyHrs = Number(data.monthlyHrs || 0);
  const hasNumbers = monthlyHrs > 0;

  const resultBlock = hasNumbers
    ? `
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:24px 0;border-collapse:separate;">
        <tr>
          <td style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:16px;padding:24px;">
            <p style="margin:0;font-size:13px;font-weight:600;letter-spacing:.08em;text-transform:uppercase;color:#4f46e5;">Your estimate</p>
            <p style="margin:10px 0 0;font-size:22px;font-weight:800;color:#0a0e1a;line-height:1.3;">
              Around ${monthlyHrs} hours a month
            </p>
            <p style="margin:8px 0 0;font-size:15px;color:#475569;">
              Roughly <strong style="color:#0a0e1a;">${fmt(data.monthlyCost)} a month</strong>
              (about ${fmt(data.yearlyCost)} a year) spent on work AI could take off your plate.
            </p>
            ${data.band ? `<p style="margin:10px 0 0;font-size:13px;color:#64748b;">${data.band}</p>` : ""}
          </td>
        </tr>
      </table>`
    : "";

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px;color:#0a0e1a;">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">Hi,</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
      Thanks for taking the AI opportunity quiz. Here's the quick version of your result.
    </p>
    ${resultBlock}
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
      That number is an estimate. The real value is knowing <em>which</em> processes to fix
      first and what each one is actually costing you, which is exactly what the AI Opportunity
      Audit pins down. I'll be in touch shortly with a short breakdown tailored to your answers.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
      If you'd like the full picture sooner, you can book the audit here:
    </p>
    <p style="margin:0 0 28px;">
      <a href="https://armenandonian.com/#book"
         style="display:inline-block;background:#4f46e5;color:#ffffff;text-decoration:none;font-size:15px;font-weight:600;padding:14px 24px;border-radius:9999px;">
        Book your AI Opportunity Audit
      </a>
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 4px;">Armen Andonian</p>
    <p style="font-size:13px;line-height:1.6;margin:0;color:#64748b;">
      AI Automation &amp; Search Visibility Consultant<br/>
      <a href="https://armenandonian.com" style="color:#4f46e5;text-decoration:none;">armenandonian.com</a>
    </p>
  </div>`;

  const text =
    `Hi,\n\nThanks for taking the AI opportunity quiz.\n\n` +
    (hasNumbers
      ? `Your estimate: around ${monthlyHrs} hours a month, roughly ${fmt(
          data.monthlyCost
        )} a month (about ${fmt(data.yearlyCost)} a year) on work AI could handle.\n\n`
      : "") +
    `That number is an estimate. The real value is knowing which processes to fix first, which is what the AI Opportunity Audit pins down. I'll be in touch shortly with a short breakdown tailored to your answers.\n\n` +
    `Book the audit: https://armenandonian.com/#book\n\nArmen Andonian\nAI Automation & Search Visibility Consultant\narmenandonian.com`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        reply_to: REPLY_TO,
        subject: "Your AI opportunity estimate",
        html,
        text,
      }),
    });

    if (!r.ok) {
      const detail = await r.text().catch(() => "");
      return res.status(200).json({ ok: false, status: r.status, detail });
    }
    return res.status(200).json({ ok: true });
  } catch (e) {
    // Never block the visitor; the Web3Forms notification still reaches you.
    return res.status(200).json({ ok: false, error: String(e) });
  }
}
