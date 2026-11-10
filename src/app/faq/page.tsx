import type { Metadata } from "next";
import Link from "next/link";
import SeoJsonLd from "@/components/SeoJsonLd";
import { CANONICAL_NAP, SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";
const CHARLOTTE_PHONE_TEL = "tel:+19809466791";

export const metadata: Metadata = {
  title: "Frequently Asked Questions | DiFiore Builders",
  description:
    "Straight answers about DiFiore Builders: licensed and insured, family-owned since 2003, serving PA, DE and the Charlotte, NC area, and how estimates work.",
  alternates: {
    canonical: `${SITE_URL}/faq`,
  },
};

type Faq = {
  question: string;
  /** Direct one-sentence answer; answer engines quote this first. */
  answer: string;
  /** Supporting detail, all taken from facts already published on the site. */
  detail?: string;
  links?: { href: string; label: string }[];
};

// Every answer restates something the site already says (our-story, contact, services,
// project calculator, Charlotte / Concord-Kannapolis pages, blog FAQs). No new claims.
const SECTIONS: { heading: string; faqs: Faq[] }[] = [
  {
    heading: "About DiFiore Builders",
    faqs: [
      {
        question: "Is DiFiore Builders licensed and insured?",
        answer: "Yes. DiFiore Builders Inc. is a licensed and insured general contractor.",
        detail: "That includes North Carolina, where we work in Concord, Kannapolis and the greater Charlotte area.",
      },
      {
        question: "How long has DiFiore Builders been in business?",
        answer: "DiFiore Builders has served homeowners since 2003.",
        detail:
          "It is family-owned (Matt DiFiore is a third-generation general contractor) and has grown on repeat customers and referrals.",
        links: [{ href: "/our-story", label: "Read our story" }],
      },
      {
        question: "Is DiFiore Builders a family-owned company?",
        answer: "Yes. DiFiore Builders is family-owned and run as a small, local team.",
        detail: "Working with a small, local team means personal service and attention to detail.",
      },
    ],
  },
  {
    heading: "Services and service areas",
    faqs: [
      {
        question: "What services does DiFiore Builders offer?",
        answer:
          "DiFiore Builders is a full-service general contractor for roofing and siding, kitchen and bathroom remodeling, home additions, basement finishing, decks, and new builds and general construction.",
        detail: "One team manages the project from the estimate through the final walkthrough.",
        links: [
          { href: "/services", label: "All services" },
          { href: "/our-projects", label: "Past projects" },
        ],
      },
      {
        question: "What areas does DiFiore Builders serve?",
        answer:
          "DiFiore Builders serves southeastern Pennsylvania and Wilmington, Delaware from its base in Chadds Ford, PA, and also works in the Charlotte, NC area.",
        detail:
          "In Pennsylvania and Delaware that means Chadds Ford, Glen Mills, West Chester and Wilmington, plus Garnet Valley, Kennett Township, Concord, East and West Marlborough, Pocopson, West Goshen and London Grove.",
        links: [{ href: "/service-areas", label: "Pennsylvania and Delaware service areas" }],
      },
      {
        question: "Do you work in the Charlotte, NC area?",
        answer: "Yes. DiFiore Builders works in Concord, Kannapolis and the greater Charlotte area, and the owner is now based in Kannapolis.",
        detail:
          "Cabarrus County work includes Harrisburg, Landis, China Grove, Midland and Mount Pleasant. Mooresville and Huntersville projects start with a walkthrough request.",
        links: [
          { href: "/charlotte", label: "Charlotte service areas" },
          { href: "/charlotte/concord-kannapolis", label: "Concord and Kannapolis" },
        ],
      },
    ],
  },
  {
    heading: "Estimates and pricing",
    faqs: [
      {
        question: "How do I get an estimate?",
        answer: "Call the office or send the contact form, and a DiFiore project specialist will acknowledge your request the same day.",
        detail:
          "A follow-up call confirms scope, timeline and whether a site visit is needed. An on-site walkthrough verifies conditions before you receive a formal written quote.",
        links: [{ href: "/contact", label: "Contact DiFiore Builders" }],
      },
      {
        question: "Is the online project calculator a quote?",
        answer: "No. The project calculator gives a rough planning range, not a quote.",
        detail: "A final quote requires a site visit to check structure, utilities and permits.",
        links: [{ href: "/project-calculator", label: "Open the project calculator" }],
      },
      {
        question: "How is the price for my project set?",
        answer: "Pricing, schedule and next steps are laid out before work starts, and the work is done at an agreed-upon price.",
      },
      {
        question: "What phone number should I call?",
        answer: `Call ${CANONICAL_NAP.phoneDisplay} for projects in Pennsylvania and Delaware, or ${CHARLOTTE_PHONE_DISPLAY} for projects in the Charlotte, NC area.`,
        detail: `The office is at ${CANONICAL_NAP.streetAddress}, ${CANONICAL_NAP.city}, ${CANONICAL_NAP.region} ${CANONICAL_NAP.postalCode}.`,
      },
    ],
  },
  {
    heading: "Planning your project",
    faqs: [
      {
        question: "Do you handle permits and inspections?",
        answer:
          "Yes. DiFiore Builders coordinates permit requirements and inspections for roofing, structural changes, additions and interior remodels.",
        detail: "HOA and permit requirements are reviewed when we confirm the scope.",
      },
      {
        question: "How soon can my project start?",
        answer: "Projects begin once scope, selections and permit timing are confirmed, and you get a realistic schedule before work starts.",
      },
      {
        question: "Can you work with my designer?",
        answer: "Yes. DiFiore Builders can work with your designer or help guide planning and selections in-house.",
      },
      {
        question: "Do you explain warranty coverage?",
        answer:
          "Yes. Product warranty options and workmanship expectations are reviewed during planning so you know what is covered.",
      },
    ],
  },
];

const ALL_FAQS = SECTIONS.flatMap((section) => section.faqs);

export default function FaqPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "FAQ", path: "/faq" },
  ]);

  const faqLd = {
    ...faqSchema(
      ALL_FAQS.map((faq) => ({
        question: faq.question,
        answer: faq.detail ? `${faq.answer} ${faq.detail}` : faq.answer,
      })),
    ),
    url: `${SITE_URL}/faq`,
    about: { "@id": `${SITE_URL}/#organization` },
  };

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={faqLd} />
      <section className="mx-auto max-w-4xl px-4 py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">FAQ</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Frequently asked questions
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            DiFiore Builders is a family-owned, licensed and insured general contractor based in Chadds Ford, PA,
            serving southeastern Pennsylvania and Wilmington, DE since 2003, with Charlotte-area work in Concord and
            Kannapolis, NC.
          </p>
        </header>

        {SECTIONS.map((section) => (
          <section key={section.heading} className="mt-12">
            <h2 className="text-2xl font-semibold text-white">{section.heading}</h2>
            <div className="mt-5 space-y-4">
              {section.faqs.map((faq) => (
                <article
                  key={faq.question}
                  className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5 md:p-6"
                >
                  <h3 className="text-lg font-semibold text-white">{faq.question}</h3>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">{faq.answer}</p>
                  {faq.detail ? (
                    <p className="mt-2 text-sm leading-relaxed text-zinc-400">{faq.detail}</p>
                  ) : null}
                  {faq.links?.length ? (
                    <div className="mt-4 flex flex-wrap gap-3">
                      {faq.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-full border border-white/30 px-4 py-1.5 text-sm font-semibold text-white hover:bg-white/10"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Still have a question?</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Pennsylvania and Delaware:{" "}
            <a href={`tel:${CANONICAL_NAP.phoneE164}`} className="font-semibold text-amber-300 hover:underline">
              {CANONICAL_NAP.phoneDisplay}
            </a>
            . Charlotte, NC area:{" "}
            <a href={CHARLOTTE_PHONE_TEL} className="font-semibold text-amber-300 hover:underline">
              {CHARLOTTE_PHONE_DISPLAY}
            </a>
            .
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Contact DiFiore Builders
            </Link>
            <Link
              href="/project-calculator"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Get a rough cost range
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
