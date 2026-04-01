import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { REVIEW_SUMMARY } from "@/lib/seo/reviewSummary";
import { breadcrumbSchema } from "@/lib/seo/schema";
import TrustedBadges from "@/components/TrustedBadges";
import { heroBackground } from "@/lib/theme";

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
    id: "kannapolis",
    name: "Kannapolis, NC",
    summary:
      "Cabarrus County homeowners call us for kitchen remodeling, roof replacement, and additions with clear scope and schedule visibility.",
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Kannapolis services",
    focus: "Kitchen remodeling, roof replacement, and full-scope additions",
    highlights: ["Cabarrus County planning support", "Budget-first scope alignment"],
    localServices: ["Kitchen remodeling", "Roof replacement", "Additions and structural updates"],
    localCopy:
      "Kannapolis homeowners usually need a contractor who can translate ideas into a disciplined scope before work starts. We focus on kitchens, roofing, additions, and broader remodel planning with tighter schedule control and cleaner communication.",
  },
  {
    id: "concord",
    name: "Concord, NC",
    summary:
      "From exterior envelope upgrades to full interior remodels, our Concord projects focus on planning-first execution and clean jobsite control.",
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Concord services",
    focus: "Exterior upgrades, remodel sequencing, and permit-aware planning",
    highlights: ["Strong fit for complex remodels", "Built around clean schedules"],
    localServices: ["Exterior upgrades", "Kitchen and bath remodels", "Full-scope home improvements"],
    localCopy:
      "Concord projects often combine exterior work with interior remodeling, which means sequencing matters. We help homeowners scope roofing, kitchens, baths, and layout updates in the right order so the project stays efficient from estimate through final walkthrough.",
  },
  {
    id: "mooresville",
    name: "Mooresville, NC",
    summary:
      "Mooresville projects often combine kitchen and bath upgrades with larger structural scopes and long-term durability requirements.",
    href: "/contact",
    cta: "Request Mooresville walkthrough",
    focus: "Lake-area remodels, additions, and durable exterior work",
    highlights: ["Good fit for larger footprints", "Material selections built for longevity"],
    localServices: ["Larger remodel scopes", "Additions and expansions", "Roofing and exterior durability"],
    localCopy:
      "Mooresville homes often need broader planning around additions, exterior protection, and upgraded interiors that can hold up over time. We approach those projects with a stronger emphasis on material durability, longer-term value, and scope clarity before construction begins.",
  },
  {
    id: "huntersville",
    name: "Huntersville, NC",
    summary:
      "Huntersville homeowners rely on our team for remodeling plans that balance modern function, quality finishes, and practical timelines.",
    href: "/contact",
    cta: "Request Huntersville walkthrough",
    focus: "High-function kitchen, bath, and roofing scopes with clear phasing",
    highlights: ["Modern-family layout priorities", "Timeline-focused project management"],
    localServices: ["Kitchen and bath remodeling", "Roofing replacement", "Family-focused layout improvements"],
    localCopy:
      "Huntersville projects tend to center on functional upgrades that make everyday living easier without losing finish quality. We help homeowners prioritize kitchens, baths, roofing, and layout improvements with a realistic budget and a practical build sequence.",
  },
];

export default function CharlottePage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Charlotte Service Areas", path: "/charlotte" },
  ]);
  const heroBg = heroBackground;

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <section
        className="relative isolate min-h-[72svh] w-full overflow-hidden md:min-h-[84svh]"
        aria-label="Charlotte Hero"
        style={
          {
            "--hero-bg-mobile": heroBg.positions.mobile,
            "--hero-bg-md": heroBg.positions.tablet,
            "--hero-bg-lg": heroBg.positions.desktop,
          } as CSSProperties
        }
      >
        <div className="pointer-events-none absolute inset-0 -z-20">
          <div className="relative h-full w-full">
            <div className="h-full w-full max-w-full overflow-hidden">
              <Image
                src={heroBg.imageSrc}
                alt="DiFiore Builders project serving the Charlotte area"
                priority
                fetchPriority="high"
                fill
                sizes="100vw"
                quality={65}
                className="hero-background-image h-full w-full object-cover transition-[object-position] duration-500"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[rgba(5,10,18,0.34)]" />
            <div
              aria-hidden
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,.28)_0%,rgba(8,12,20,.45)_38%,rgba(8,12,20,.72)_100%)]"
            />
          </div>
        </div>

        <div className="absolute top-[5vh] right-[4%] z-10 text-right md:right-[3%] lg:right-[5%]">
          <span className="block max-w-[260px] text-[clamp(16px,3.2vw,28px)] font-semibold leading-snug text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.45)] md:max-w-none md:whitespace-nowrap">
            “Quality work from the{" "}
            <span className="block whitespace-nowrap sm:inline">foundation to the roof”</span>
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="grid min-h-[72svh] place-items-center md:min-h-[84svh]">
            <div className="w-full translate-y-[3vh] text-center sm:translate-y-[5vh] md:translate-y-[7vh]">
              <p className="text-[12px] font-semibold uppercase tracking-[0.28em] text-amber-300 sm:text-[13px]">
                Charlotte Service Areas
              </p>
              <h1 className="mt-4 font-serif text-[clamp(40px,6vw,72px)] font-black leading-[1.04] tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.45)]">
                Concord, Kannapolis, Mooresville, and Huntersville Remodeling
              </h1>
              <p className="mx-auto mt-6 max-w-[860px] text-[17px] font-bold leading-relaxed text-white/92 sm:text-[20px]">
                A Charlotte-area microsite for homeowners comparing kitchens, bathrooms, roofing, additions, and
                full-scope remodeling with stronger local service-area guidance.
              </p>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-5">
                <Link
                  href="/project-calculator"
                  className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
                >
                  Open Cost Estimator
                </Link>
                <Link
                  href="/charlotte/concord-kannapolis"
                  className="rounded-md border border-white/55 bg-black/20 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
                >
                  Explore Concord + Kannapolis
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-white/55 bg-black/20 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
                >
                  Request Charlotte Walkthrough
                </Link>
              </div>

              <a
                href="tel:+16103585433"
                className="mt-8 inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-300/90 hover:text-amber-300 sm:mt-9 sm:text-[14px]"
              >
                Call now (610) 358-5433
              </a>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-300/90 sm:text-[14px]">
                <a href="#concord" className="hover:text-amber-300">Concord NC</a>
                <a href="#kannapolis" className="hover:text-amber-300">Kannapolis NC</a>
                <a href="#mooresville" className="hover:text-amber-300">Mooresville NC</a>
                <a href="#huntersville" className="hover:text-amber-300">Huntersville NC</a>
              </div>

              <TrustedBadges compact className="pt-12" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Built Like a Mini Site</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Service-area guidance for the projects Charlotte homeowners actually search for
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            This page is structured to help homeowners in the north and northeast Charlotte suburbs compare service
            fit, planning needs, and next steps before moving into a quote or on-site walkthrough.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {GREATER_CHARLOTTE_AREAS.map((area) => (
            <article
              key={area.name}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,.35)]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Service Area</p>
              <h3 className="mt-3 text-2xl font-semibold text-white">{area.name}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{area.summary}</p>
              <p className="mt-4 text-sm font-medium text-white/90">{area.focus}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {area.highlights.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[12px] font-medium text-zinc-200"
                  >
                    {item}
                  </span>
                ))}
              </div>
              <Link
                href={area.href}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
              >
                {area.cta}
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-14 space-y-6">
          <div className="max-w-4xl">
            <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Local service areas around Charlotte
            </h2>
            <p className="mt-4 text-base leading-relaxed text-zinc-300">
              This page should work like a small local hub, not a generic regional placeholder. Each area below
              reflects the project types and planning concerns we expect to discuss most often with homeowners in that
              market.
            </p>
          </div>

          <div className="grid gap-6">
            {GREATER_CHARLOTTE_AREAS.map((area) => (
              <section
                key={area.id}
                id={area.id}
                className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-8"
              >
                <div className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
                  <div>
                    <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-amber-300">
                      {area.name}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold text-white md:text-3xl">
                      Remodeling and exterior work for {area.name}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-zinc-300">{area.localCopy}</p>
                    <p className="mt-4 text-sm font-medium text-white/90">{area.focus}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {area.localServices.map((service) => (
                        <span
                          key={service}
                          className="rounded-full border border-white/15 bg-zinc-950/45 px-3 py-1 text-[12px] font-medium text-zinc-200"
                        >
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                      Good Fit Projects
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                      {area.highlights.map((item) => (
                        <li key={item} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3">
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-5 flex flex-wrap gap-3">
                      <Link
                        href={area.href}
                        className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
                      >
                        {area.cta}
                      </Link>
                      <Link
                        href="/project-calculator"
                        className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                      >
                        Estimate project range
                      </Link>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
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

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white">Why this Charlotte page should feel like a mini site</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Homeowners in Concord, Kannapolis, Mooresville, and Huntersville are often evaluating project type,
              rough cost, timeline, and whether a contractor can manage larger scopes without loose estimating. This
              page now acts as a central index into that decision.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">North Charlotte</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Mooresville and Huntersville visitors usually need broader planning language, larger-scope examples,
                  and clearer next-step guidance.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Cabarrus County</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Concord and Kannapolis visitors respond to service pages that tie roofing, additions, and kitchen
                  remodeling to practical planning and execution.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
            <h2 className="text-xl font-semibold text-white">Ready for project pricing?</h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              Use the project calculator for a quick range, then connect with our team for a local scope review and
              next steps.
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
        </div>
      </section>
    </>
  );
}
