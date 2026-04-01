import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";

export const metadata: Metadata = {
  title: "Philadelphia Roofing Replacement | DiFiore Builders",
  description:
    "Philadelphia roofing replacement and exterior upgrades with detailed inspections and clean job sites. DiFiore Builders delivers durable protection.",
  alternates: { canonical: "https://www.difiorebuilders.com/philadelphia/roofing" },
};

const faqs = [
  {
    q: "Do you handle older roof structures?",
    a: "Yes. We inspect decking, rafters, and flashing to ensure the structure is sound before installing new materials.",
  },
  {
    q: "Can you coordinate gutters and fascia?",
    a: "Absolutely. We align roofing, gutters, and trim for a clean exterior finish and proper drainage.",
  },
  {
    q: "How do you minimize disruption during a roof replacement?",
    a: "We stage materials, protect landscaping, and complete daily cleanups so the property stays safe and tidy.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://www.difiorebuilders.com/philadelphia/roofing",
  telephone: "+1-610-358-5433",
  areaServed: ["Philadelphia, PA"],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: REVIEW_SUMMARY.rating,
    reviewCount: REVIEW_SUMMARY.count,
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function PhiladelphiaRoofingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      <section className="px-4 py-16 md:py-20">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Philadelphia, PA</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Roofing built for Philly weather
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            From older row homes to suburban properties, we replace roofs with premium underlayments,
            clean flashing, and tidy work sites that protect your home during every phase.
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
              Get a Quote
            </Link>
          </div>
          <div className="mt-4 text-sm text-white/70">
            Back to <Link href="/philadelphia" className="text-amber-300 hover:underline">Philadelphia hub</Link> or view
            the <Link href="/services/roofing-siding" className="text-amber-300 hover:underline">roofing service page</Link>.
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Philadelphia roofing scope</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <li>• Full tear-offs and decking review</li>
            <li>• Ridge vents, drip edge, and flashing</li>
            <li>• Gutters, guards, and fascia refresh</li>
            <li>• Cleanup and magnet sweep daily</li>
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white">Philadelphia roofing FAQs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {faqs.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold text-white">{faq.q}</h3>
                <p className="mt-2 text-sm text-white/70">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
