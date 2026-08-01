import type { Metadata } from "next";
import Link from "next/link";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";

export const metadata: Metadata = {
  title: "Charlotte, NC Kitchen Remodeling | DiFiore Builders",
  description:
    "Kitchen remodeling in Charlotte, NC with design guidance, transparent pricing, and clean project management from DiFiore Builders.",
  alternates: { canonical: "https://www.difiorebuilders.com/charlotte/kitchen-remodeling" },
};

const faqs = [
  {
    q: "How long does a typical Charlotte kitchen remodel take?",
    a: "Most kitchens land in the 6-10 week range once materials are onsite. Permitting and custom cabinetry can extend timelines.",
  },
  {
    q: "Do you help with design selections?",
    a: "Yes. We guide layout decisions, cabinet specs, and finish packages so everything is ordered and staged before demo starts.",
  },
  {
    q: "Can you work with HOA requirements?",
    a: "Absolutely. We confirm HOA requirements early and align schedules around any architectural review timelines.",
  },
];

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://www.difiorebuilders.com/charlotte/kitchen-remodeling",
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

export default function CharlotteKitchenRemodelingPage() {
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
            Kitchen remodeling designed for how you live
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-white/70">
            From open-concept layouts to storage upgrades, we build Charlotte kitchens that feel
            custom without the chaos. Expect clear schedules, organized trades, and a tidy job site.
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
            the <Link href="/services/kitchens-bathrooms" className="text-amber-300 hover:underline">kitchen service page</Link>.
          </div>
        </div>
      </section>

      <section className="px-4 pb-16">
        <div className="mx-auto max-w-6xl rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white">What you get</h2>
          <ul className="mt-4 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            <li>• Layout planning and cabinet strategy</li>
            <li>• Appliance, lighting, and ventilation coordination</li>
            <li>• Stone, quartz, or butcher block surfaces</li>
            <li>• Tile, flooring, and trim with full protection</li>
          </ul>
        </div>
      </section>

      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-semibold text-white">Charlotte kitchen FAQs</h2>
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
