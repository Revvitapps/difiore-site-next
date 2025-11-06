# Resend DNS & Analytics Verification Checklist

## 1. Resend (transactional email) DNS records

Resend requires three DNS records for domain verification and DKIM signing. These records should remain in place when the site moves to Vercel – they live wherever the domain’s DNS is managed (currently GoDaddy).

1. **TXT** – `resend._domainkey.yourdomain.com`  
   Value: provided in the Resend dashboard. Confirms domain ownership.
2. **CNAME** – `dkim1._domainkey.yourdomain.com` → Resend DKIM host (`dkim1...rsend.net`).  
3. **CNAME** – `dkim2._domainkey.yourdomain.com` → Resend DKIM host (`dkim2...rsend.net`).

> Replace `yourdomain.com` with `difiorebuilders.com`. Copy the exact values from Resend; the strings above are placeholders.

Implementation notes:
- Add these records in GoDaddy now if they are not already present. They continue to work after the A/AAAA/CNAME records are repointed to Vercel.
- Keep `RESEND_API_KEY`, `ESTIMATOR_NOTIFICATION_TO`, and any other Resend-related environment variables in Vercel’s project settings before launch.
- After DNS propagates (typically <15 minutes), re-check the domain status in Resend – it needs to show **Verified** before contact/estimator forms will send from production.

## 2. Analytics & search verification

### Google Analytics 4
- The Next.js app already loads GA4 via `NEXT_PUBLIC_GA_ID`. Confirm the same Measurement ID that is on the current GoDaddy site is configured in Vercel’s Environment Variables (`Production` + `Preview`).
- After launch, verify real-time traffic is registering in GA4.

### Google Search Console
- Preferred verification method: HTML file upload. Download the existing `googlexxxxxxxxxxxx.html` file from the current site, place it in the Next.js `public/` directory (replace `google-site-verification-placeholder.html`), and keep it there before launch so the verification persists once DNS switches.
- Alternative: meta tag in `app/layout.tsx` if the original file is unavailable.
- Once live, re-submit `https://difiorebuilders.com/sitemap.xml` inside Search Console.

### Bing Webmaster Tools (optional but recommended)
- If currently verified, replicate the verification method (HTML file or meta tag) in the new codebase. Otherwise, add the Bing verification meta tag to `app/layout.tsx` during launch week and submit the sitemap.

## 3. Launch-day reminders

- Lower DNS TTL at GoDaddy ~24 hours before the cutover if possible.
- Re-point only the A/AAAA (and `www` CNAME) records to Vercel when ready; do **not** remove MX/TXT records for email or Resend.
- Run `npm run sitemap` and deploy so `sitemap.xml` is generated, then after DNS cutover visit `/robots.txt` and `/sitemap.xml` to ensure the new files are live.
- Trigger a test submission from the estimator form to confirm Resend delivers to the inbox listed in `ESTIMATOR_NOTIFICATION_TO`.
