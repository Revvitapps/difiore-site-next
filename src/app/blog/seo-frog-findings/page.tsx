import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Screaming Frog report wins for DiFiore Builders",
  description:
    "Actionable takeaways from the SEO frog report, from canonical consistency to speed tweaks, so DiFiore Builders beats the old GoDaddy site on organic traffic.",
  alternates: {
    canonical: "https://difiorebuilders.com/blog/seo-frog-findings",
  },
};

const checkpoints = [
  "Canonical & hreflang tags that match the service hierarchy",
  "Meta descriptions that target roofing, renovations, and additions searches",
  "Header structure (H1-H3) that mirrors the GoDaddy site’s trusted messaging",
  "Image alt text and filenames referencing the Tri-State service area",
  "Site speed and mobile response, especially on the hero/core service pages",
];

const auditStats = [
  { label: "Missing canonical tags", detail: "5 key pages on the old GoDaddy site lacked canonicals, so we need to stabilize the rebuild." },
  { label: "Missing H1s", detail: "Every page in that crawl (home, before-and-after, services, our projects, our story) was flagged without a clear H1." },
  { label: "Missing meta descriptions", detail: "Before & After plus Our Projects depended on no descriptions, which starved click-through signals." },
  { label: "Overlong meta descriptions", detail: "Services (400 characters) and Our Story (625 characters) exceeded Google's recommended length." },
];

export default function SeoFrogFindingsPage() {
  return (
    <article className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">
            Blog · SEO action
          </p>
          <h1 className="mt-6 font-serif text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Turn the SEO frog report into wins for DiFiore Builders
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
            The Screaming Frog crawl already highlighted a few gaps—our job is to feed that data into
            content, technical fixes, and reporting so the new site actually climbs back on top.
          </p>
        </header>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <p>
            When the report lists dozens of warnings (missing titles, duplicate content, slow pages)
            it can feel overwhelming. Breaking the work into checkpoints keeps us aligned with what
            customers search for: licensed contractors, remodeling teams, and roofers that deliver
            across the Tri-State area.
          </p>
          <ul className="space-y-3 pl-4 text-sm leading-relaxed text-zinc-300">
            {checkpoints.map((item) => (
              <li key={item}>
                <span className="font-semibold text-white">{item}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
          <h2 className="text-xl font-semibold text-white">What the old Screaming Frog crawl taught us</h2>
          <p className="text-sm text-zinc-300">
            The 2025 crawl of the GoDaddy site (see <span className="font-semibold text-white">Old site Seo/out/seo-summary.md</span>) already exposed the holes we’re fixing on the Next.js build.
          </p>
          <dl className="space-y-3 text-sm leading-relaxed text-zinc-300">
            {auditStats.map((stat) => (
              <div key={stat.label} className="rounded-2xl border border-white/5 bg-white/5 p-3">
                <dt className="text-white">{stat.label}</dt>
                <dd>{stat.detail}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-12 grid gap-10 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200 md:grid-cols-2">
          <div>
            <h2 className="text-xl font-semibold text-white">Technical wins</h2>
            <p className="mt-3">
              Fix every HTTP/HTTPS redirect and make sure the canonical tags reflect the live, fast
              routing that the new Next.js site offers. That keeps Google from preferring the old
              infrastructure just because it still exists in the report.
            </p>
            <p className="mt-3">
              Surface the service area (Chadds Ford, Glen Mills, West Chester, Wilmington) in
              structured data and schema to match what the GoDaddy site once did organically.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Content wins</h2>
            <p className="mt-3">
              Refresh meta descriptions with keywords that prioritize local remodeling and roofing
              searches. Keep the tone consistent with the family-owned story DiFiore Builders carries.
            </p>
            <p className="mt-3">
              Add short paragraphs or bullets on each service page so the crawlers see the same depth
              they did before—this closes the gap the SEO frog flagged when the new site felt thin.
            </p>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-amber-500/40 bg-amber-500/10 p-6 text-[15px] text-zinc-100">
          <h2 className="text-xl font-semibold text-white">Next steps</h2>
          <p className="mt-3">
            Run the crawl weekly, document the changes, and compare the numbers (page speed, index
            coverage, conversion signals) to the GoDaddy benchmark we held earlier this year.
          </p>
          <p className="mt-3">
            That keeps the SEO frog report from being a relic and turns it into a living checklist for
            the DiFiore Builders marketing effort.
          </p>
          <div className="mt-6 text-center">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
            >
              Schedule a walkthrough
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
