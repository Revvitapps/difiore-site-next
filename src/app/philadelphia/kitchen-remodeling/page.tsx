import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";

export const metadata: Metadata = {
  title: "Philadelphia Kitchen Remodeling | DiFiore Builders",
  description:
    "Philadelphia kitchen remodeling with trusted crews, clear timelines, and high-end finishes. Get pricing ranges from DiFiore Builders.",
  alternates: { canonical: "https://www.difiorebuilders.com/philadelphia/kitchen-remodeling" },
};

const faqs = [
  {
    q: "Do you manage permits in Philadelphia?",
    a: "Yes. We handle permitting requirements and coordinate inspections so the project keeps moving.",
  },
  {
    q: "Can you keep part of the kitchen usable during the remodel?",
    a: "Whenever possible we stage work to keep essential appliances available, but full gut remodels require downtime.",
  },
  {
    q: "What finishes are popular in the Philly market?",
    a: "We see a mix of classic shaker cabinetry, quartz counters, and warm hardware to match older home character.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://www.difiorebuilders.com/philadelphia/kitchen-remodeling",
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

export default function PhiladelphiaKitchenRemodelingPage() {
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
            Kitchen remodeling that respects older homes
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            We blend modern layouts with the character of Philly-area homes. Expect careful protection,
            clear scopes, and a finish package that fits your style.
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
            the <Link href="/services/kitchens-bathrooms" className="text-amber-300 hover:underline">kitchen service page</Link>.
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">Philadelphia kitchen scope</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <li>• Cabinet upgrades and layout optimization</li>
            <li>• Electrical, plumbing, and ventilation coordination</li>
            <li>• Tile, stone, and flooring installs</li>
            <li>• Trim, paint, and finishing details</li>
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white">Philadelphia kitchen FAQs</h2>
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
