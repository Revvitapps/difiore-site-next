import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";

export const metadata: Metadata = {
  title: "Philadelphia, PA General Contractor | DiFiore Builders",
  description:
    "Remodeling, roofing, and additions for Philadelphia-area homeowners. DiFiore Builders brings a Charlotte-first focus with established Philly crews.",
  alternates: { canonical: "https://www.difiorebuilders.com/philadelphia" },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://www.difiorebuilders.com/philadelphia",
  telephone: "+1-610-358-5433",
  areaServed: ["Philadelphia, PA"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_SUMMARY.rating,
    reviewCount: REVIEW_SUMMARY.count,
  },
};

export default function PhiladelphiaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Philadelphia, PA</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Trusted crews across the Main Line
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Philadelphia remains a core market with long-standing clients. We coordinate permitting,
            design details, and site logistics so you can remodel without the chaos.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/project-calculator"
              className="rounded-md bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow hover:bg-amber-400"
            >
              Project Calculator
            </Link>
            <Link
              href="/contact"
              className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact the team
            </Link>
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Philadelphia service focus</h2>
            <p className="mt-2 text-sm text-white/70">
              Explore the most requested scopes for Philly and Main Line homeowners.
            </p>
            <div className="mt-4 flex flex-col gap-3">
              <Link
                href="/philadelphia/kitchen-remodeling"
                className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Kitchen remodeling in Philadelphia →
              </Link>
              <Link
                href="/philadelphia/roofing"
                className="rounded-xl border border-white/15 bg-black/30 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Roofing replacement in Philadelphia →
              </Link>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h3 className="text-xl font-semibold text-white">Still Charlotte-first</h3>
            <p className="mt-3 text-sm text-white/70">
              Matt is based in Charlotte, so new builds and urgent scopes there get priority, while
              our Philly crews keep existing clients covered without delays.
            </p>
            <div className="mt-4 text-sm text-white/70">
              Need Charlotte coverage? Visit the{" "}
              <Link href="/charlotte" className="text-amber-300 hover:underline">
                Charlotte hub
              </Link>
              .
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
