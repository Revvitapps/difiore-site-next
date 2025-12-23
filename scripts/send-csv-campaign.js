#!/usr/bin/env node

/**
 * Bulk email sender for CSV lists using Resend.
 *
 * Usage:
 *   node scripts/send-csv-campaign.js [csvPath] [subject]
 *
 * Env:
 *   RESEND_API_KEY (required unless DRY_RUN=true)
 *   MARKETING_FROM_EMAIL (optional; defaults to DiFiore sender)
 *   REPLY_TO (optional)
 *   EMAIL_HTML_PATH (defaults to tmp-email.html)
 *   CSV_PATH / SUBJECT (optional fallbacks when not passed as args)
 *   DRY_RUN=true to log without sending
 *   LIMIT=100 to cap sends for testing
 *   SEND_DELAY_MS=200 to pause between sends
 *   SENT_LOG_PATH=.campaign-sent-log.json to persist sent emails and skip on future runs
 *   DRIP_MODE=true to keep sending in batches until the CSV is exhausted
 *   DAILY_LIMIT=20 to cap each drip batch
 *   DRIP_INTERVAL_MINUTES=1440 to wait between drip batches (defaults to 1440 when DRIP_MODE=true)
 */

/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse/sync");
const { Resend } = require("resend");

const [, , csvArg, subjectArg] = process.argv;
const csvPath = (csvArg || process.env.CSV_PATH || "difiore_pasted_emails_dedup.csv").trim();
const htmlPath = (process.env.EMAIL_HTML_PATH || "tmp-email.html").trim();
const subject = (subjectArg || process.env.SUBJECT || "DiFiore Builders update").trim();
const from = (process.env.MARKETING_FROM_EMAIL || "DiFiore Builders <hello@difiorebuilders.com>").trim();
const replyTo = process.env.REPLY_TO;
const resendApiKey = process.env.RESEND_API_KEY;
const dryRun = (process.env.DRY_RUN || "").toLowerCase() === "true";
const limit = Number(process.env.LIMIT || "0");
const sendDelayMs = Number(process.env.SEND_DELAY_MS || "0");
const campaignTagValue = path.basename(csvPath).replace(/[^A-Za-z0-9_-]+/g, "-") || "campaign";
const sentLogPath = (process.env.SENT_LOG_PATH || ".campaign-sent-log.json").trim();
const dripMode = (process.env.DRIP_MODE || "").toLowerCase() === "true";
const dailyLimit = Number(process.env.DAILY_LIMIT || "0");
const dripIntervalMinutes = Number(process.env.DRIP_INTERVAL_MINUTES || (dripMode ? "1440" : "0"));

function fail(message) {
  console.error(message);
  process.exit(1);
}

function loadHtml(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) {
    fail(`HTML file not found: ${absolute}`);
  }
  return fs.readFileSync(absolute, "utf8");
}

function loadEmails(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) {
    fail(`CSV file not found: ${absolute}`);
  }

  const content = fs.readFileSync(absolute, "utf8");
  const rows = parse(content, {
    skip_empty_lines: true,
    relax_column_count: true,
    trim: true,
  });

  if (!rows.length) return [];

  const [firstRow] = rows;
  const headerLooksLikeEmails = firstRow.some((cell) => String(cell).toLowerCase().includes("email"));
  const startIndex = headerLooksLikeEmails ? 1 : 0;

  const seen = new Set();
  const emails = [];

  for (let i = startIndex; i < rows.length; i += 1) {
    const row = rows[i].map((value) => String(value || "").trim());
    const candidate = row.find((value) => value.includes("@"));
    if (!candidate) continue;

    const normalized = candidate.toLowerCase();
    if (seen.has(normalized)) continue;

    seen.add(normalized);
    emails.push(candidate);
  }

  return emails;
}

function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

function loadSentLog(filePath) {
  const absolute = path.resolve(filePath);
  if (!fs.existsSync(absolute)) return {};

  try {
    const parsed = JSON.parse(fs.readFileSync(absolute, "utf8"));
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch (error) {
    console.warn(`Could not parse sent log at ${absolute}; starting fresh.`, error);
    return {};
  }
}

function persistSentLog(filePath, logObject) {
  const absolute = path.resolve(filePath);
  fs.mkdirSync(path.dirname(absolute), { recursive: true });
  fs.writeFileSync(absolute, JSON.stringify(logObject, null, 2));
}

async function sendAll({ html, emails }) {
  if (!dryRun && !resendApiKey) {
    fail("RESEND_API_KEY is missing. Set it or use DRY_RUN=true to test.");
  }

  const resend = dryRun ? null : new Resend(resendApiKey);
  const total = emails.length;
  const successful = [];

  for (let i = 0; i < total; i += 1) {
    const email = emails[i];

    if (dryRun) {
      console.log(`[dry-run] Would send to ${email}`);
    } else {
      try {
        await resend.emails.send({
          from,
          to: email,
          subject,
          html,
          reply_to: replyTo,
          tags: [{ name: "campaign", value: campaignTagValue }],
        });
        successful.push(email);
        console.log(`Sent ${i + 1}/${total}: ${email}`);
      } catch (error) {
        const message = error?.message || error;
        console.error(`Failed ${i + 1}/${total} (${email}):`, message);
      }
    }

    if (sendDelayMs > 0 && i < total - 1) {
      await new Promise((resolve) => setTimeout(resolve, sendDelayMs));
    }
  }

  return successful;
}

async function runBatch({ html, limitOverride }) {
  const emails = loadEmails(csvPath);

  if (!emails.length) {
    fail("No email addresses found in the CSV.");
  }

  const sentLog = loadSentLog(sentLogPath);
  const campaignKey = campaignTagValue;
  const alreadySentSet = new Set((sentLog[campaignKey] || []).map(normalizeEmail));

  const freshEmails = emails.filter((email) => !alreadySentSet.has(normalizeEmail(email)));
  if (!freshEmails.length) {
    console.log(`All ${emails.length} emails in ${csvPath} are already marked as sent for campaign "${campaignKey}". Nothing to do.`);
    return { sentCount: 0, remaining: 0 };
  }

  const effectiveLimit = limitOverride && limitOverride > 0 ? limitOverride : limit > 0 ? limit : 0;
  const sliced = effectiveLimit > 0 ? freshEmails.slice(0, effectiveLimit) : freshEmails;

  console.log(`Loaded ${emails.length} unique emails from ${csvPath}`);
  if (alreadySentSet.size > 0) {
    console.log(`Skipping ${alreadySentSet.size} already-sent addresses for campaign "${campaignKey}".`);
  }
  console.log(`Ready to send to ${freshEmails.length} remaining addresses.`);
  if (effectiveLimit > 0 && sliced.length < freshEmails.length) {
    console.log(`LIMIT applied: sending to first ${sliced.length} addresses this run.`);
  }
  console.log(`Subject: ${subject}`);
  console.log(`HTML: ${path.resolve(htmlPath)}`);
  console.log(dryRun ? "Running in DRY_RUN mode (no emails will be sent)." : "Sending via Resend...");

  const successful = await sendAll({ html, emails: sliced });

  if (!dryRun && successful.length > 0) {
    const merged = new Set([...alreadySentSet]);
    successful.forEach((email) => merged.add(normalizeEmail(email)));
    sentLog[campaignKey] = Array.from(merged);
    persistSentLog(sentLogPath, sentLog);
    console.log(`Updated sent log at ${path.resolve(sentLogPath)} (campaign: ${campaignKey}, total sent: ${sentLog[campaignKey].length}).`);
  }

  const remainingAfter = freshEmails.length - successful.length;
  return { sentCount: successful.length, remaining: remainingAfter };
}

async function main() {
  const html = loadHtml(htmlPath);

  if (!dripMode) {
    await runBatch({ html });
    return;
  }

  const perBatchLimit = dailyLimit > 0 ? dailyLimit : limit;
  const intervalMs = dripIntervalMinutes > 0 ? dripIntervalMinutes * 60 * 1000 : 0;

  console.log(`Drip mode enabled. Per-batch limit: ${perBatchLimit > 0 ? perBatchLimit : "no cap"}. Interval: ${intervalMs > 0 ? `${dripIntervalMinutes} minute(s)` : "none (will exit after one batch)"}.`);

  while (true) {
    const { sentCount, remaining } = await runBatch({ html, limitOverride: perBatchLimit });

    if (remaining <= 0) {
      console.log("All emails sent for this campaign. Exiting drip mode.");
      break;
    }

    if (sentCount <= 0) {
      console.log("No emails were sent in this batch (possibly all were skipped). Exiting drip mode.");
      break;
    }

    if (intervalMs <= 0) {
      console.log("Drip interval not set. Completed one batch and exiting.");
      break;
    }

    console.log(`Sleeping ${dripIntervalMinutes} minute(s) before next batch...`);
    await new Promise((resolve) => setTimeout(resolve, intervalMs));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
