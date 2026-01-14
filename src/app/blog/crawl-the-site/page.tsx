import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Crawl the DiFiore Builders site | Find holes before search engines do",
  description:
    "Why a fresh crawl is essential for the new DiFiore Builders site, plus the checklist we use to compare against the former GoDaddy pages.",
  alternates: {
    canonical: "https://difiorebuilders.com/blog/crawl-the-site",
  },
};

export default function CrawlTheSitePage() {
  return (
    <article className="py-16">
      <div className="mx-auto max-w-5xl px-4">
        <header className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">
            Blog · Site strategy
          </p>
          <h1 className="mt-6 font-serif text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Crawl the site before we lose more ground
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
            The GoDaddy version of DiFiore Builders had momentum—now the new Next.js site needs the
            same attention. A crawl captures every hidden redirect, broken asset, or missing tag before
            search engines mark the rebuild as unstable.
          </p>
        </header>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">What we learn from a crawl</h2>
          <p>
            Crawling the site with Screaming Frog (aka the SEO frog report your team mentioned) or
            a similar auditor gives us an instant comparison with the old GoDaddy pages in the areas
            that matter for rankings and conversions.
          </p>
          <ul className="space-y-3 pl-4 text-sm leading-relaxed text-zinc-300">
            <li>
              <strong>Redirect hygiene:</strong> Are the legacy GoDaddy URLs still pointing in the
              right direction, or do they 404 and leak authority?
            </li>
            <li>
              <strong>Metadata parity:</strong> Is every page carrying the descriptive titles and
              meta descriptions that once helped map search intent to the brand?
            </li>
            <li>
              <strong>Content structure:</strong> Do headings, internal links, and alt text mirror
              the clarity from the old site, or did we accidentally strip signals in the rebuild?
            </li>
          </ul>
          <p>
            The crawl also surfaces duplicates, missing canonical tags, and orphaned pages—issues
            the SEO frog report already called out. It’s our chance to prove the new site is
            cleaner, faster, and easier to index than the GoDaddy predecessor.
          </p>
        </section>

        <section className="mt-12 space-y-5 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
          <h2 className="text-xl font-semibold text-white">How we act on the crawl</h2>
          <p>
            1. Capture the crawl and archive the report so we can show progress to search engines and
            future auditors.
          </p>
          <p>
            2. Turn every 4xx/5xx page into a tracked task: either fix the URL, reroute to the new
            equivalent, or remove it intentionally.
          </p>
          <p>
            3. Use the crawl insights alongside Screaming Frog to keep watch over structured data,
            loading experience, and on-page content hierarchy.
          </p>
        </section>

        <section className="mt-12 text-center text-[15px] leading-relaxed text-zinc-200">
          <p>
            Ready to compare the wreckage and build a stronger site structure? We align the crawl
            results with DiFiore Builders’ service pages so each visit feels like the craftsmanship the
            GoDaddy site promised.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
            >
              Share the crawl report
            </Link>
          </div>
        </section>
      </div>
    </article>
  );
}
