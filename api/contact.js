// Vercel serverless function: sends a branded thank-you email to someone who
// submits the contact form, using Resend.
//
// Requires the environment variable RESEND_API_KEY to be set in the Vercel
// project (Settings -> Environment Variables). Until it is set, this function
// safely no-ops so the form still works.
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

  const name = (data.name || "").trim();
  const greeting = name ? `Hi ${name},` : "Hi,";

  const html = `
  <div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:560px;margin:0 auto;padding:8px;color:#0a0e1a;">
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">${greeting}</p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 16px;">
      Thanks for getting in touch. Your message has reached me and I'll reply
      personally, usually within one working day.
    </p>
    <p style="font-size:16px;line-height:1.6;margin:0 0 24px;">
      If you'd like to skip ahead, you can grab a time for an AI Opportunity
      Audit directly here:
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
    `${greeting}\n\n` +
    `Thanks for getting in touch. Your message has reached me and I'll reply personally, usually within one working day.\n\n` +
    `If you'd like to skip ahead, you can book an AI Opportunity Audit here: https://armenandonian.com/#book\n\n` +
    `Armen Andonian\nAI Automation & Search Visibility Consultant\narmenandonian.com`;

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
        subject: "Thanks for getting in touch",
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
