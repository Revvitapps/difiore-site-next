import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";

export const metadata: Metadata = {
  title: "Charlotte, NC Roofing Replacement | DiFiore Builders",
  description:
    "Charlotte roofing replacement, repairs, and exterior protection from a licensed general contractor. Get pricing ranges fast.",
  alternates: { canonical: "https://www.difiorebuilders.com/charlotte/roofing" },
};

const faqs = [
  {
    q: "Do you handle storm or wind damage inspections?",
    a: "Yes. We document shingles, flashing, and decking issues so you can prioritize repairs or plan a full replacement.",
  },
  {
    q: "What roofing materials are most common in Charlotte?",
    a: "Architectural shingles are the most common, but we also install metal and specialty systems for custom builds.",
  },
  {
    q: "How soon can you start a Charlotte roofing project?",
    a: "We schedule based on material lead times and inspection windows. Most roofing scopes start within a few weeks.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://www.difiorebuilders.com/charlotte/roofing",
  telephone: "+1-980-946-6791",
  areaServed: ["Charlotte, NC"],
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

export default function CharlotteRoofingPage() {
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
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">Charlotte, NC</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Roofing replacement done right
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            Protect your home with clean tear-offs, strong underlayments, and trim details that hold
            up to Charlotte storms. We keep the jobsite tidy and the scope tight.
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
            Back to <Link href="/charlotte" className="text-amber-300 hover:underline">Charlotte hub</Link> or view
            the <Link href="/services/roofing-siding" className="text-amber-300 hover:underline">roofing service page</Link>.
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Charlotte roofing scope</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <li>• Tear-offs, decking inspection, and ventilation</li>
            <li>• Ice &amp; water shield and synthetic underlayment</li>
            <li>• Flashing, gutters, and fascia coordination</li>
            <li>• Final cleanup with magnetic sweep</li>
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white">Charlotte roofing FAQs</h2>
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
