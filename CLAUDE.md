# DiFiore Builders site (www.difiorebuilders.com)

Client site built and maintained by Revvit. Next.js 15 App Router + Turbopack. Push to `main` auto-deploys
production (Vercel project `difiore-site-next`, team revvit-apps). Never invent business facts: every claim
must already be on the site or confirmed by Matt DiFiore.

- Kill any `next dev` before `npm run build` (shared `.next` corrupts).
- Stage explicit paths only (parallel sessions share this tree).
- Keep the `verification.google` tag in `src/app/layout.tsx`: it verifies the Search Console property.
- NAP lives in `src/lib/seo/constants.ts` (`CANONICAL_NAP`); Charlotte line (980) 946-6791 is on the Charlotte pages.
- Blog posts are listed in `src/lib/blogPosts.ts` (drives /blog, /blog/rss.xml and sitemap images). Add new posts there and to the sitemap.

## SEO / GEO / AEO status (seo-launch skill)

Last audited 2026-11-10. Rerun `npm run build && npm run check:seo` after any page change.

| Item | Status |
|---|---|
| Hosting / domains | www.difiorebuilders.com on Vercel; apex 308s to www in `src/middleware.ts`. Domain + DNS at GoDaddy (client's account). |
| Previews noindex | Not set: robots.txt is the same on previews and there is no `X-Robots-Tag` for `*.vercel.app`. Open item. |
| robots / sitemap / llms.txt / RSS | `src/app/robots.ts` allows all, with AI/answer crawlers named explicitly (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, Claude-User, PerplexityBot, Perplexity-User, Google-Extended, Applebot-Extended, Bingbot, DuckAssistBot, CCBot, meta-externalagent). `src/app/sitemap.ts`: 56 URLs with image entries. `/llms.txt` route. `/blog/rss.xml` (6 posts), advertised via `alternates.types` on the root layout, homepage, /blog and each post. |
| Titles / descriptions / headings | `npm run check:seo` passing on built HTML: title <= 70, description <= 165, one h1, og:image present, JSON-LD parses (56 pages). |
| Schema | Homepage: GeneralContractor `/#organization` (hasMap, sameAs) + WebSite `/#website`. BreadcrumbList on every inner page. Service (provider `@id` → `/#organization`, areaServed) on service, city+service, cost-guide and Charlotte/Philadelphia service pages. Blog + BlogPosting (datePublished/dateModified, author/publisher `@id`). FAQPage on /faq, city+service pages, blog posts, Charlotte pages. Person (Matt DiFiore) on /our-story. |
| AEO pages | `/faq` (14 Q&As, direct first-sentence answers, facts already on the site only), linked from the footer. |
| NAP | `CANONICAL_NAP`: DiFiore Builders, 20 Whitetail Dr, Chadds Ford, PA 19317, (610) 358-5433. Charlotte (980) 946-6791. |
| GA4 | Account a372188553 (DiFiore Builders), `G-364C0XZKH3`, Matthew@revvit.io Administrator. `generate_lead` + `call_click` events sent; key events pending first hits (monthly sweep stars them). |
| IndexNow | Key `e971f7eb44d680da7d16674d01e8fadb` (`public/<key>.txt`), `npm run indexnow`, GitHub Action on production deploy. Last result: 403 pending key verification. |
| Search Console / Bing | Search Console verified under difiorebuilders@gmail.com (URL-prefix property, HTML tag), Matthew@revvit.io Full user, sitemap submitted (55 URLs at the time). Bing under Matthew@revvit.io (Read-Write via GSC import), sitemap submitted. |
| Email DNS | Microsoft 365 (MX outlook). DKIM off, DMARC p=none. Not changed. |
| Google Business Profile | Verified. Matt DiFiore primary owner (difiorebuilders@gmail.com), Revvit (Matthew@revvit.io) manager. Maps CID 6537379050061718332 in homepage `hasMap`/`sameAs`. |
