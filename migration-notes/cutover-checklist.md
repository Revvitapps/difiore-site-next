# Vercel Cutover Checklist (GoDaddy → Vercel)

## 1. 48–24 hours before launch
- In GoDaddy DNS, lower TTL for the apex (`@`) and `www` records to the minimum (usually 600 seconds). This shortens propagation during the switch.
- Confirm Resend TXT/CNAME and any existing MX records are present; they must remain untouched during cutover.
- Ensure Vercel project env vars are populated:
  - `NEXT_PUBLIC_GA_ID`
  - `NEXT_PUBLIC_GOOGLE_MAPS_KEY`
  - `RESEND_API_KEY`
  - `ESTIMATOR_NOTIFICATION_TO`

## 2. Prep Vercel domains
- In the Vercel project, add both domains:
  - `difiorebuilders.com`
  - `www.difiorebuilders.com`
- Choose `difiorebuilders.com` as the primary domain and configure `www` → apex redirect inside Vercel.
- Note the DNS instructions Vercel provides:
  - Apex: A/AAAA records pointing to `76.76.21.21` (A) and the IPv6 addresses shown.
  - `www`: CNAME to `cname.vercel-dns.com`.

## 3. Deployment prep
- Replace `google-site-verification-placeholder.html` with the real Search Console file.
- Run `npm run sitemap` locally to generate sitemap/static files, then `npm run build` to ensure no errors.
- Deploy the latest commit to Vercel (Preview). Visit the preview URL and QA critical pages/forms.
- Keep `<meta name="robots" content="noindex">` on staging only; remove it from production before launch (ensure the production build is indexable).

## 4. Launch day sequence
1. Verify no pending changes in Git. Deploy the production build from the latest main commit.
2. Remove temporary protections (password/basic auth) if used on staging.
3. Update GoDaddy DNS:
   - Set `@` A record to `76.76.21.21`. Remove any conflicting A records.
   - Optionally add AAAA records Vercel provided.
   - Point `www` CNAME to `cname.vercel-dns.com`.
4. Wait for Vercel to detect the correct records (dashboard will show “Configured”).
5. Once live, hard-refresh key pages: `/`, `/services`, `/project-calculator`, `/before-and-after`.
6. Submit a test estimator form to confirm Resend email delivery.

## 5. Post-launch QA (within first few hours)
- Check `https://difiorebuilders.com/robots.txt` and `/sitemap.xml` serve the Vercel versions.
- In Google Search Console (domain property), use “Inspect URL” on `/` and `/project-calculator`, then request indexing.
- Verify GA4 real-time traffic.
- Monitor Vercel analytics/logs for errors or unexpected 404s.
- Walk through the navigation, galleries, and estimator flow on mobile + desktop.

## 6. Follow-up (within 24–72 hours)
- Revert DNS TTLs in GoDaddy to their previous values.
- Submit the sitemap in Search Console and (optionally) Bing Webmaster Tools.
- Update any third-party profiles (Yelp, Nextdoor, MapQuest, Yahoo) if they cached a staging URL.
- Plan incremental publication of the new service/location pages once traffic stabilizes.
