import type { Metadata } from "next";
import Link from "next/link";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Charlotte, NC General Contractor | DiFiore Builders",
  description:
    "Charlotte-first remodeling, roofing, and additions from a family-owned general contractor. Get real cost ranges and local guidance from DiFiore Builders.",
  alternates: { canonical: `${SITE_URL}/charlotte` },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: `${SITE_URL}/charlotte`,
  telephone: "+1-610-358-5433",
  areaServed: [
    "Charlotte, NC",
    "Kannapolis, NC",
    "Concord, NC",
    "Mooresville, NC",
    "Huntersville, NC",
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_SUMMARY.rating,
    reviewCount: REVIEW_SUMMARY.count,
  },
};

const GREATER_CHARLOTTE_AREAS = [
  {
    name: "Kannapolis, NC",
    summary:
      "Cabarrus County homeowners call us for kitchen remodeling, roof replacement, and additions with clear scope and schedule visibility.",
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Kannapolis services",
  },
  {
    name: "Concord, NC",
    summary:
      "From exterior envelope upgrades to full interior remodels, our Concord projects focus on planning-first execution and clean jobsite control.",
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Concord services",
  },
  {
    name: "Mooresville, NC",
    summary:
      "Mooresville projects often combine kitchen and bath upgrades with larger structural scopes and long-term durability requirements.",
    href: "/contact",
    cta: "Request Mooresville walkthrough",
  },
  {
    name: "Huntersville, NC",
    summary:
      "Huntersville homeowners rely on our team for remodeling plans that balance modern function, quality finishes, and practical timelines.",
    href: "/contact",
    cta: "Request Huntersville walkthrough",
  },
];

export default function CharlottePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Charlotte Service Areas", path: "/charlotte" },
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Charlotte Service Areas</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Remodeling and Exterior Services Across the Greater Charlotte Area
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            DiFiore Builders is actively serving homeowners in Kannapolis, Concord, Mooresville, and Huntersville
            with roofing, kitchen and bath remodeling, additions, and general construction support.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {GREATER_CHARLOTTE_AREAS.map((area) => (
            <article
              key={area.name}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,.35)]"
            >
              <h2 className="text-2xl font-semibold text-white">{area.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{area.summary}</p>
              <Link
                href={area.href}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
              >
                {area.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Popular Charlotte services</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            We focus on high-intent projects where local permitting knowledge and disciplined project management make
            the biggest difference for timeline and quality.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/charlotte/kitchen-remodeling"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Charlotte kitchen remodeling
            </Link>
            <Link
              href="/charlotte/roofing"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Charlotte roofing replacement
            </Link>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Ready for project pricing?</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Use the project calculator for a quick range, then connect with our team for a local scope review and next
            steps.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/project-calculator"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Open Cost Estimator
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact Charlotte Team
            </Link>
            <Link
              href="/charlotte/concord-kannapolis"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Concord + Kannapolis page
            </Link>
            <Link
              href="/service-areas"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              View PA/DE service areas
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
