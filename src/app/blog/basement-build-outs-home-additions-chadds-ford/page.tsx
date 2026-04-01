import Link from "next/link";
import type { Metadata } from "next";
import HeroSection from "@/components/services/HeroSection";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Basement Build-Outs and Home Additions in Chadds Ford, PA | DiFiore Builders",
  description:
    "Thinking of finishing your basement or adding space to your home? Here is what is possible, what to plan for, and when to call DiFiore Builders in Chadds Ford, PA.",
  alternates: {
    canonical: `${SITE_URL}/blog/basement-build-outs-home-additions-chadds-ford`,
  },
};

export default function BasementAdditionsPost() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Basement Build-Outs and Home Additions", path: "/blog/basement-build-outs-home-additions-chadds-ford" },
  ]);

  const article = articleSchema({
    headline: "Basement Build-Outs and Home Additions in Chadds Ford, PA",
    description: "Planning guidance for finished basements and home additions in the Chadds Ford area.",
    path: "/blog/basement-build-outs-home-additions-chadds-ford",
    datePublished: "2025-12-20",
    dateModified: "2026-03-11",
    image: "/difiore-services-showcase-additions-playroom1.webp",
  });

  const faq = faqSchema([
    {
      question: "Do I need a permit to finish my basement or build an addition?",
      answer: "Yes in most cases. We coordinate required permit and inspection steps during preconstruction.",
    },
    {
      question: "Can I turn my basement into an in-law suite?",
      answer: "Often yes, based on local code, egress, and utility considerations. We review feasibility up front.",
    },
    {
      question: "How long does a typical basement build-out take?",
      answer: "Many basement finish projects run 4-6 weeks depending on scope and inspections.",
    },
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={article} />
      <SeoJsonLd data={faq} />
      <HeroSection
        title="Finished basements & home additions in Chadds Ford, PA"
        subtitle="Basements, suites, and expansions that feel like they always belonged."
        blurb="See what you can handle yourself and when to bring in a licensed builder for structural, permitting, and system work."
        imageSrc="/difiore-services-showcase-additions-playroom1.webp"
        chips={["Design-Build", "Permit Ready", "Seamless Tie-ins"]}
      />

      <article className="py-16">
        <div className="mx-auto max-w-5xl px-4">

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Why homeowners are expanding instead of moving</h2>
          <p>
            With interest rates and moving costs staying high, building out has become the go-to solution for families
            who love their neighborhood but need more space.
          </p>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Home office, gym, or guest suite needs.</li>
            <li>Playroom or teen hangout space.</li>
            <li>In-law suites for aging parents.</li>
            <li>Kitchen or main living area expansions.</li>
            <li>Resale value and everyday comfort upgrades.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">What you can handle yourself</h2>
          <p>
            Basements and additions are serious projects, but there are a few tasks you can take on to save time and
            money without risking structural issues.
          </p>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Planning and vision boards for layout ideas.</li>
            <li>Painting finished walls after construction.</li>
            <li>Installing dry-area flooring like vinyl planks.</li>
            <li>Decor and lighting selections.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">What needs a licensed pro</h2>
          <p>
            These projects involve permits, inspections, and systems that need to meet code. A licensed contractor keeps
            everything safe and insurable.
          </p>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Foundation work and structural framing.</li>
            <li>Electrical and plumbing installation.</li>
            <li>Moisture-proofing and insulation details.</li>
            <li>HVAC extensions and upgrades.</li>
            <li>Load-bearing wall changes or egress work.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Local expertise makes projects smoother</h2>
          <p>
            DiFiore Builders understands local building codes in Chadds Ford, PA, Glen Mills, West Chester, and
            Wilmington, plus the common basement moisture issues and permitting timelines in the area. That local
            insight means fewer delays, better materials, and a finished space that feels like it always belonged.
          </p>
          <p>
            For more details on what is possible, explore the additions and basements service page.
          </p>
          <div>
            <Link
              href="/services/additions-basements"
              className="inline-flex rounded-full border border-white/20 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              View additions & basements
            </Link>
          </div>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
          <h2 className="text-xl font-semibold text-white">ROI snapshot</h2>
          <ul className="mt-4 space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Finished basement: up to 70% ROI.</li>
            <li>Primary suite addition: around 60-75% ROI.</li>
            <li>Bathroom addition: 55-65% ROI.</li>
            <li>Family room bump-out: 50-60% ROI.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">FAQs</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-white">Do I need a permit to finish my basement or build an addition?</dt>
              <dd className="mt-1 text-zinc-300">Yes. DiFiore handles the permitting and inspection process.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Can I turn my basement into an in-law suite?</dt>
              <dd className="mt-1 text-zinc-300">
                Often yes, but zoning and egress requirements vary. A local contractor can verify what is allowed.
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-white">How long does a typical basement build-out take?</dt>
              <dd className="mt-1 text-zinc-300">Most projects take 4-6 weeks depending on scope and inspections.</dd>
            </div>
          </dl>
        </section>

        <section className="mt-12 text-center text-[15px] leading-relaxed text-zinc-200">
          <p>
            Ready to expand your living space with a basement build-out or addition that feels seamless? The DiFiore
            Builders team will help you plan the scope, timeline, and finish selections from day one.
          </p>
          <div className="mt-6">
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
            >
              Schedule a consultation
            </Link>
            <Link
              href="/chadds-ford/home-additions"
              className="ml-3 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Chadds Ford additions page
            </Link>
            <Link
              href="/project-calculator"
              className="ml-3 inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              Estimate project cost
            </Link>
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
