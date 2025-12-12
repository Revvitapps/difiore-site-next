import { NextResponse } from "next/server";
import { z } from "zod";

const contactSchema = z.object({
  firstName: z.string().trim().min(2, "First name is required."),
  lastName: z.string().trim().min(2, "Last name is required."),
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().trim().min(10, "Phone number is required."),
  address: z.preprocess(
    (value) => {
      if (typeof value !== "string") return value;
      const trimmed = value.trim();
      return trimmed.length ? trimmed : undefined;
    },
    z.string().min(3, "Address should be at least 3 characters.").optional()
  ),
  message: z.string().trim().min(10, "Message must be at least 10 characters."),
  honeypot: z.string().max(0, "Invalid submission.").optional(),
  turnstileToken: z.string().trim().min(10, "Verification required."),
});

type ContactPayload = z.infer<typeof contactSchema>;

const RESEND_ENDPOINT = "https://api.resend.com/emails";

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const line = (label: string, value?: string | null) =>
  value && value.trim().length > 0 ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : "";

const buildInternalHtml = (payload: ContactPayload, meta: { submittedAt: string; url?: string | null }) => {
  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h2 style="margin-bottom:12px;">New contact request</h2>
      ${line("Name", `${payload.firstName} ${payload.lastName}`.trim())}
      ${line("Email", payload.email)}
      ${line("Phone", payload.phone)}
      ${line("Address", payload.address)}
      ${line("Submitted From", meta.url ?? "Contact Page")}
      <h3 style="margin:20px 0 8px;">Message</h3>
      <p style="white-space:pre-line;">${escapeHtml(payload.message)}</p>
      <p style="margin-top:24px;font-size:12px;color:#475569;">Submitted ${escapeHtml(
        new Date(meta.submittedAt).toLocaleString()
      )}</p>
    </div>
  `;
};

const buildInternalText = (payload: ContactPayload, meta: { submittedAt: string; url?: string | null }) => {
  return [
    `Name: ${payload.firstName} ${payload.lastName}`,
    `Email: ${payload.email}`,
    `Phone: ${payload.phone}`,
    payload.address ? `Address: ${payload.address}` : null,
    meta.url ? `Submitted From: ${meta.url}` : null,
    "",
    "Message:",
    payload.message,
    "",
    `Submitted ${new Date(meta.submittedAt).toLocaleString()}`,
  ]
    .filter(Boolean)
    .join("\n");
};

const buildAutoReplyHtml = (payload: ContactPayload) => {
  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;font-size:15px;line-height:1.6;">
      <p>Hi ${escapeHtml(payload.firstName)},</p>
      <p>Thanks for reaching out to DiFiore Builders. Our team received your message and will follow up shortly to talk through next steps.</p>
      <p>Here&rsquo;s a quick summary of what you shared:</p>
      <ul style="padding-left:18px;">
        <li><strong>Phone:</strong> ${escapeHtml(payload.phone)}</li>
        ${payload.address ? `<li><strong>Address:</strong> ${escapeHtml(payload.address)}</li>` : ""}
      </ul>
      <p>If you need immediate assistance, you can always call the office at (610) 358-5433.</p>
      <p style="margin-top:24px;">Talk soon,<br />The DiFiore Builders Team</p>
    </div>
  `;
};

async function verifyTurnstile(token: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  if (!secret) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return { success: false, status: 500, error: "Verification unavailable." };
  }

  try {
    const params = new URLSearchParams();
    params.append("secret", secret);
    params.append("response", token);

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: params.toString(),
    });

    if (!response.ok) {
      const text = await response.text();
      console.error("Turnstile verification HTTP failure", response.status, text);
      return { success: false, status: 502, error: "Verification failed." };
    }

    const result = (await response.json()) as { success: boolean; "error-codes"?: string[] };

    if (!result.success) {
      console.warn("Turnstile verification rejected", result["error-codes"]);
      return { success: false, status: 400, error: "Verification failed." };
    }

    return { success: true as const };
  } catch (error) {
    console.error("Turnstile verification error", error);
    return { success: false, status: 500, error: "Verification failed." };
  }
}

async function sendEmailThroughResend(resendKey: string, message: Record<string, unknown>): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${resendKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Resend API error: ${response.status} ${response.statusText} – ${errorBody}`);
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      console.warn("Contact form validation failed", parsed.error.flatten());
      return NextResponse.json(
        { error: "Invalid contact submission.", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const payload = parsed.data;

    // Honeypot filled => likely bot
    if (payload.honeypot && payload.honeypot.trim().length > 0) {
      console.warn("Contact honeypot tripped; dropping submission");
      return NextResponse.json({ success: true });
    }

    const captchaCheck = await verifyTurnstile(payload.turnstileToken);
    if (!captchaCheck.success) {
      const status = captchaCheck.status ?? 400;
      return NextResponse.json({ error: captchaCheck.error ?? "Verification failed." }, { status });
    }
    const resendKey = process.env.RESEND_API_KEY;
    const notificationList = process.env.CONTACT_NOTIFICATION_TO || process.env.ESTIMATOR_NOTIFICATION_TO;
    const fromEmail =
      process.env.CONTACT_FROM_EMAIL || process.env.ESTIMATOR_FROM_EMAIL || "DiFiore Builders <no-reply@difiorebuilders.com>";

    if (!resendKey) {
      return NextResponse.json(
        { error: "RESEND_API_KEY missing. Configure email credentials." },
        { status: 500 }
      );
    }

    if (!notificationList) {
      return NextResponse.json(
        { error: "CONTACT_NOTIFICATION_TO (or ESTIMATOR_NOTIFICATION_TO) missing. Provide at least one recipient." },
        { status: 500 }
      );
    }

    const to = notificationList
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean);

    if (!to.length) {
      return NextResponse.json(
        { error: "Contact notification list must include at least one valid email address." },
        { status: 500 }
      );
    }

    const meta = {
      submittedAt: new Date().toISOString(),
      url: request.headers.get("referer"),
    };

    const subject = `New contact request — ${payload.firstName} ${payload.lastName}`;
    const html = buildInternalHtml(payload, meta);
    const text = buildInternalText(payload, meta);

    await sendEmailThroughResend(resendKey, {
      from: fromEmail,
      to,
      subject,
      html,
      text,
      reply_to: payload.email,
    });

    await sendEmailThroughResend(resendKey, {
      from: fromEmail,
      to: payload.email,
      subject: "We received your message",
      html: buildAutoReplyHtml(payload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form submission failed", error);
    return NextResponse.json({ error: "Unable to send your message right now." }, { status: 500 });
  }
}
