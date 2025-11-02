import { NextResponse } from 'next/server';
import { z } from 'zod';

const submissionSchema = z.object({
  project: z.string().min(1),
  projectLabel: z.string().optional(),
  address: z.object({
    street: z.string().min(1),
    city: z.string().min(1),
    state: z.string().min(2),
    zip: z.string().min(4),
  }),
  contact: z.object({
    firstName: z.string().min(2),
    lastName: z.string().min(2),
    email: z.string().email(),
    phone: z.string().min(10),
    phoneFormatted: z.string().optional(),
  }),
  details: z.record(z.string()).optional(),
  estimate: z
    .object({
      conservative: z.number().nullable().optional(),
      likely: z.number().nullable().optional(),
      premium: z.number().nullable().optional(),
      breakdownLines: z.array(z.string()).optional(),
    })
    .optional(),
  meta: z
    .object({
      source: z.string().optional(),
      submittedAt: z.string().optional(),
      url: z.string().optional(),
    })
    .optional(),
});

type SubmissionPayload = z.infer<typeof submissionSchema>;

const RESEND_ENDPOINT = 'https://api.resend.com/emails';

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

const line = (label: string, value?: string | null) =>
  value ? `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>` : '';

const buildDetailsTable = (details?: Record<string, string>) => {
  if (!details) return '';
  const rows = Object.entries(details)
    .filter(([, value]) => value && value.trim().length > 0)
    .map(
      ([key, value]) =>
        `<tr><td style="padding:4px 8px;border:1px solid #e5e7eb;"><strong>${escapeHtml(
          key
        )}</strong></td><td style="padding:4px 8px;border:1px solid #e5e7eb;">${escapeHtml(value)}</td></tr>`
    )
    .join('');

  if (!rows) return '';
  return `
    <h3 style="margin:20px 0 8px;">Project Details</h3>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <tbody>${rows}</tbody>
    </table>
  `;
};

const buildEstimateSummary = (estimate?: SubmissionPayload['estimate']) => {
  if (!estimate) return '';

  const hasValues =
    estimate.conservative != null || estimate.likely != null || estimate.premium != null;
  const currency = (value: number | null | undefined) =>
    typeof value === 'number' ? value.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) : '—';

  return `
    <h3 style="margin:20px 0 8px;">Ballpark Estimate</h3>
    <ul style="margin:0;padding-left:18px;font-size:14px;">
      ${
        hasValues
          ? `
        <li><strong>Conservative:</strong> ${currency(estimate.conservative ?? null)}</li>
        <li><strong>Most Likely:</strong> ${currency(estimate.likely ?? null)}</li>
        <li><strong>Premium:</strong> ${currency(estimate.premium ?? null)}</li>
      `
          : '<li>Square footage or scope details were not provided, so an estimate was not generated.</li>'
      }
      ${
        estimate.breakdownLines?.length
          ? `<li>Notes:<ul>${estimate.breakdownLines
              .map((item) => `<li>${escapeHtml(item)}</li>`)
              .join('')}</ul></li>`
          : ''
      }
    </ul>
  `;
};

const createInternalHtml = (payload: SubmissionPayload) => {
  const contactName = `${payload.contact.firstName} ${payload.contact.lastName}`.trim();
  const phoneDisplay = payload.contact.phoneFormatted || payload.contact.phone;
  const addressLines = [
    payload.address.street,
    `${payload.address.city}, ${payload.address.state} ${payload.address.zip}`,
  ];

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;">
      <h2 style="margin-bottom:12px;">New Project Calculator Submission</h2>
      ${line('Project', payload.projectLabel ?? payload.project)}
      ${line('Submitted From', payload.meta?.url ?? 'Project Calculator')}
      <h3 style="margin:20px 0 8px;">Client</h3>
      ${line('Name', contactName)}
      ${line('Email', payload.contact.email)}
      ${line('Phone', phoneDisplay)}
      <h3 style="margin:20px 0 8px;">Project Address</h3>
      <p>${addressLines.map((l) => escapeHtml(l)).join('<br />')}</p>
      ${buildEstimateSummary(payload.estimate)}
      ${buildDetailsTable(payload.details)}
      <p style="margin-top:24px;font-size:12px;color:#475569;">
        Submitted ${
          payload.meta?.submittedAt
            ? escapeHtml(new Date(payload.meta.submittedAt).toLocaleString())
            : 'just now'
        }
        ${payload.meta?.source ? ` via ${escapeHtml(payload.meta.source)}` : ''}
      </p>
    </div>
  `;
};

const createInternalText = (payload: SubmissionPayload) => {
  const lines = [
    `Project: ${payload.projectLabel ?? payload.project}`,
    `Submitted From: ${payload.meta?.url ?? 'Project Calculator'}`,
    '',
    'Client',
    `Name: ${payload.contact.firstName} ${payload.contact.lastName}`,
    `Email: ${payload.contact.email}`,
    `Phone: ${payload.contact.phoneFormatted || payload.contact.phone}`,
    '',
    'Address',
    payload.address.street,
    `${payload.address.city}, ${payload.address.state} ${payload.address.zip}`,
    '',
  ];

  if (payload.estimate) {
    lines.push('Ballpark Estimate');
    if (
      payload.estimate.conservative != null ||
      payload.estimate.likely != null ||
      payload.estimate.premium != null
    ) {
      lines.push(
        `  Conservative: ${
          payload.estimate.conservative != null
            ? payload.estimate.conservative.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })
            : '—'
        }`
      );
      lines.push(
        `  Most Likely: ${
          payload.estimate.likely != null
            ? payload.estimate.likely.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            : '—'
        }`
      );
      lines.push(
        `  Premium: ${
          payload.estimate.premium != null
            ? payload.estimate.premium.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
            : '—'
        }`
      );
    } else {
      lines.push('  (No estimate values were generated)');
    }
    if (payload.estimate.breakdownLines?.length) {
      lines.push('  Notes:');
      payload.estimate.breakdownLines.forEach((note) => lines.push(`    - ${note}`));
    }
    lines.push('');
  }

  if (payload.details) {
    lines.push('Project Details:');
    Object.entries(payload.details)
      .filter(([, value]) => value && value.trim().length > 0)
      .forEach(([key, value]) => {
        lines.push(`  ${key}: ${value}`);
      });
  }

  lines.push('', `Submitted ${payload.meta?.submittedAt ?? 'just now'}`);
  if (payload.meta?.source) lines.push(`Source: ${payload.meta.source}`);

  return lines.join('\n');
};

const buildAutoReplyHtml = (payload: SubmissionPayload) => {
  const name = escapeHtml(payload.contact.firstName);
  const project = escapeHtml(payload.projectLabel ?? payload.project);
  const addressLine = `${escapeHtml(payload.address.city)}, ${escapeHtml(payload.address.state)} ${
    payload.address.zip
  }`;

  return `
    <div style="font-family:Arial,sans-serif;color:#0f172a;font-size:15px;line-height:1.6;">
      <p>Hi ${name},</p>
      <p>Thanks for reaching out to DiFiore Builders about your ${project} project. We received your request and a project specialist will review the details shortly.</p>
      <p>Here&rsquo;s what you shared:</p>
      <ul style="padding-left:18px;">
        <li><strong>Project:</strong> ${project}</li>
        <li><strong>Address:</strong> ${escapeHtml(payload.address.street)}, ${addressLine}</li>
        <li><strong>Phone:</strong> ${escapeHtml(payload.contact.phoneFormatted || payload.contact.phone)}</li>
      </ul>
      <p>We&rsquo;ll reach out soon to confirm timeline, gather any additional info, and schedule a site visit.</p>
      <p style="margin-top:24px;">Talk soon,<br />The DiFiore Builders Team</p>
    </div>
  `;
};

async function sendEmailThroughResend(
  resendKey: string,
  message: Record<string, unknown>
): Promise<void> {
  const response = await fetch(RESEND_ENDPOINT, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${resendKey}`,
      'Content-Type': 'application/json',
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
    const json = await request.json();
    const parsed = submissionSchema.safeParse(json);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten(), message: 'Invalid estimator payload.' },
        { status: 400 }
      );
    }

    const payload = parsed.data;
    const resendKey = process.env.RESEND_API_KEY;
    const fromEmail = process.env.ESTIMATOR_FROM_EMAIL;
    const notificationList = process.env.ESTIMATOR_NOTIFICATION_TO;

    if (!resendKey) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY missing. Configure email credentials.' },
        { status: 500 }
      );
    }

    if (!notificationList) {
      return NextResponse.json(
        { error: 'ESTIMATOR_NOTIFICATION_TO missing. Provide at least one recipient.' },
        { status: 500 }
      );
    }

    const to = notificationList
      .split(',')
      .map((item) => item.trim())
      .filter(Boolean);

    if (!to.length) {
      return NextResponse.json(
        { error: 'ESTIMATOR_NOTIFICATION_TO must include at least one valid email address.' },
        { status: 500 }
      );
    }

    const cc = process.env.ESTIMATOR_NOTIFICATION_CC
      ? process.env.ESTIMATOR_NOTIFICATION_CC.split(',').map((item) => item.trim()).filter(Boolean)
      : undefined;
    const bcc = process.env.ESTIMATOR_NOTIFICATION_BCC
      ? process.env.ESTIMATOR_NOTIFICATION_BCC.split(',').map((item) => item.trim()).filter(Boolean)
      : undefined;

    const internalSubject = `New project estimate request — ${payload.projectLabel ?? payload.project}`;
    const html = createInternalHtml(payload);
    const text = createInternalText(payload);

    await sendEmailThroughResend(resendKey, {
      from: fromEmail ?? 'DiFiore Builders <no-reply@difiorebuilders.com>',
      to,
      cc,
      bcc,
      subject: internalSubject,
      html,
      text,
      reply_to: payload.contact.email,
    });

    await sendEmailThroughResend(resendKey, {
      from: fromEmail ?? 'DiFiore Builders <no-reply@difiorebuilders.com>',
      to: payload.contact.email,
      subject: 'We received your project request',
      html: buildAutoReplyHtml(payload),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Estimator submission failed', error);
    return NextResponse.json(
      { error: 'Unable to send estimator submission at this time.' },
      { status: 500 }
    );
  }
}
