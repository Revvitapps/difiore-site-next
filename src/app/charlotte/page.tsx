import type { CSSProperties } from "react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Compass, Hammer, MapPin, ShieldCheck } from "lucide-react";
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
  telephone: "+1-980-946-6791",
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
    county: "Cabarrus County",
    coverage: "page" as const,
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Concord + Kannapolis",
    focus: "Kitchen remodeling, roof replacement, and full-scope additions",
    highlights: [
      "Scope locked before pricing — the estimate you approve is the project you get",
      "Cabarrus County permit coordination built in",
    ],
    localServices: ["Kitchen remodeling", "Roof replacement", "Additions & structural updates"],
    localCopy:
      "Most Kannapolis calls start the same way: a homeowner with a clear idea that still needs a real scope before anyone quotes a number. We translate kitchen, roofing, and addition projects into a defined plan with tighter schedule control and cleaner day-to-day communication, so nothing gets priced on a guess.",
  },
  {
    id: "concord",
    name: "Concord, NC",
    county: "Cabarrus County",
    coverage: "page" as const,
    href: "/charlotte/concord-kannapolis",
    cta: "Explore Concord + Kannapolis",
    focus: "Exterior + interior remodels, sequenced in the right order",
    highlights: [
      "Multi-scope remodels sequenced so trades don't collide",
      "One team managing estimate through final walkthrough",
    ],
    localServices: ["Exterior envelope upgrades", "Kitchen & bath remodels", "Whole-home improvements"],
    localCopy:
      "Concord projects often pair exterior work with interior remodeling, so sequencing is what keeps the job efficient. We help homeowners order roofing, kitchens, baths, and layout changes so the schedule holds and the site stays clean. It's the right fit when the project is bigger than a single room and needs someone managing the whole build.",
  },
  {
    id: "mooresville",
    name: "Mooresville, NC",
    county: "Lake Norman area",
    coverage: "walkthrough" as const,
    href: "/contact",
    cta: "Request a Mooresville walkthrough",
    focus: "Lake-area homes, larger footprints, and exteriors built to last",
    highlights: [
      "Bigger footprints and multi-room scopes",
      "Material selections weighted for long-term durability",
    ],
    localServices: ["Larger remodel scopes", "Additions & expansions", "Roofing & durable exteriors"],
    localCopy:
      "Mooresville and the Lake Norman area lean toward larger footprints and homes that take real weather exposure, so durability and material selection matter as much as finish. We scope additions, exterior protection, and interior upgrades for long-term value before construction starts. A dedicated Mooresville page is still in the works — the fastest path today is a direct walkthrough where we scope the project with you.",
  },
  {
    id: "huntersville",
    name: "Huntersville, NC",
    county: "North Mecklenburg",
    coverage: "walkthrough" as const,
    href: "/contact",
    cta: "Request a Huntersville walkthrough",
    focus: "Function-first kitchen, bath, and roofing work with clear phasing",
    highlights: [
      "Family layout and everyday-function upgrades",
      "Practical build sequence on a realistic budget",
    ],
    localServices: ["Kitchen & bath remodeling", "Roof replacement", "Layout improvements"],
    localCopy:
      "Huntersville projects usually center on functional upgrades that make daily life easier without giving up finish quality — the Birkdale-and-north-Mecklenburg family remodel. We help prioritize kitchens, baths, roofing, and layout changes against a realistic budget and a practical build sequence. Like Mooresville, a dedicated page is on the way; a walkthrough is the quickest way to get specific.",
  },
];

const CHARLOTTE_SIGNALS = [
  { label: "Charlotte-first planning", value: "Local scope reviews that start with budget, durability, and sequencing." },
  { label: "Primary growth markets", value: "Concord, Kannapolis, Mooresville, and Huntersville." },
  { label: "Best-fit work", value: "Kitchens, roofing, additions, and whole-home remodels." },
];

const CHARLOTTE_STATS = [
  { label: "Core markets", value: "4" },
  { label: "Review rating", value: `${REVIEW_SUMMARY.rating} stars` },
  { label: "Lead options", value: "Call, estimate, walkthrough" },
];

const POPULAR_SERVICES = [
  {
    title: "Kitchen remodeling",
    copy: "Layout upgrades, storage planning, and finish packages designed around everyday use.",
    href: "/charlotte/kitchen-remodeling",
  },
  {
    title: "Roofing replacement",
    copy: "Storm-ready roofing scopes with tighter material guidance and cleaner scheduling.",
    href: "/charlotte/roofing",
  },
  {
    title: "Additions and expansions",
    copy: "Family-room growth, second-story planning, and larger structural scopes with real sequencing.",
    href: "/contact",
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
        className="relative isolate min-h-[100svh] w-full overflow-hidden border-b border-white/10 md:min-h-[92svh]"
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
              className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,12,20,.22)_0%,rgba(8,12,20,.38)_26%,rgba(8,12,20,.72)_62%,rgba(7,10,16,.96)_100%)]"
            />
          </div>
        </div>

        <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-4 py-14 sm:px-6 md:min-h-[92svh] md:px-8 md:py-20">
          <div className="grid w-full gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(320px,.8fr)] lg:items-end">
            <div className="max-w-4xl rounded-[32px] border border-white/12 bg-[linear-gradient(135deg,rgba(6,10,18,.82),rgba(11,17,29,.58))] p-6 shadow-[0_24px_80px_rgba(0,0,0,.42)] backdrop-blur md:p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full border border-amber-300/35 bg-amber-300/12 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.26em] text-amber-200">
                <MapPin className="h-3.5 w-3.5" />
                Charlotte service hub
              </div>
              <h1 className="mt-5 max-w-3xl font-serif text-[clamp(38px,7vw,76px)] font-black leading-[0.95] tracking-[-0.03em] text-white">
                Remodeling coverage for Charlotte&apos;s highest-intent suburbs.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-white/82 sm:text-lg">
                Compare kitchens, roofing, additions, and full-home remodeling for Concord, Kannapolis, Mooresville,
                and Huntersville without digging through generic service pages.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {CHARLOTTE_STATS.map((stat) => (
                  <div key={stat.label} className="rounded-2xl border border-white/10 bg-white/[0.06] px-4 py-4">
                    <div className="text-2xl font-semibold text-white">{stat.value}</div>
                    <div className="mt-1 text-xs uppercase tracking-[0.2em] text-zinc-300">{stat.label}</div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <Link
                  href="/project-calculator"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-5 py-3 text-sm font-semibold text-zinc-950 transition hover:bg-amber-300"
                >
                  Open Cost Estimator
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/35 bg-white/[0.06] px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.12]"
                >
                  Request Charlotte Walkthrough
                </Link>
                <Link
                  href="/charlotte/concord-kannapolis"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:border-white/40 hover:bg-white/[0.08]"
                >
                  Explore Concord + Kannapolis
                </Link>
              </div>

              <div className="mt-7 flex flex-wrap items-center gap-3 text-sm text-zinc-200">
                <a
                  href="tel:+19809466791"
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/20 px-4 py-2 font-semibold text-amber-200 hover:border-amber-200/40"
                >
                  <ShieldCheck className="h-4 w-4" />
                  Call now (980) 946-6791
                </a>
                <div className="text-xs uppercase tracking-[0.22em] text-zinc-300">Primary markets:</div>
                <a href="#concord" className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] hover:bg-white/[0.08]">Concord</a>
                <a href="#kannapolis" className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] hover:bg-white/[0.08]">Kannapolis</a>
                <a href="#mooresville" className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] hover:bg-white/[0.08]">Mooresville</a>
                <a href="#huntersville" className="rounded-full border border-white/10 px-3 py-1.5 text-xs uppercase tracking-[0.18em] hover:bg-white/[0.08]">Huntersville</a>
              </div>

              <TrustedBadges compact className="pt-8" />
            </div>

            <aside className="rounded-[28px] border border-white/12 bg-[linear-gradient(180deg,rgba(10,15,24,.9),rgba(10,15,24,.64))] p-5 shadow-[0_18px_60px_rgba(0,0,0,.34)] backdrop-blur md:p-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-amber-300">How this page works</p>
              <div className="mt-5 space-y-4">
                {CHARLOTTE_SIGNALS.map((signal, index) => (
                  <div key={signal.label} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 text-xs font-semibold text-amber-200">
                        0{index + 1}
                      </div>
                      <div className="text-sm font-semibold text-white">{signal.label}</div>
                    </div>
                    <p className="mt-3 text-sm leading-6 text-zinc-300">{signal.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-5 rounded-2xl border border-dashed border-white/18 bg-black/20 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white">
                  <Compass className="h-4 w-4 text-amber-300" />
                  Start with the market closest to your project.
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-300">
                  Concord and Kannapolis have the deepest local page coverage today. Mooresville and Huntersville
                  route directly into a walkthrough while those pages expand.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-14 sm:px-6 md:px-8 md:py-20">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(280px,.72fr)]">
          <header className="max-w-4xl">
            <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Charlotte-area coverage</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Pick your market and start with real local guidance
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-300">
              Every suburb below has its own project mix, budget concerns, and planning quirks. Jump to yours for a
              straight answer on scope, timing, and next steps — no generic regional filler.
            </p>
          </header>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <div className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.22em] text-amber-300">
              <Hammer className="h-4 w-4" />
              Best-fit project types
            </div>
            <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
              <li className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Kitchen remodeling with better layout planning</li>
              <li className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Roofing replacement tied to material and storm durability</li>
              <li className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3">Additions and larger remodel scopes that need sequencing</li>
            </ul>
          </div>
        </div>

        <div className="mt-16 space-y-6">
          <div className="grid gap-6">
            {GREATER_CHARLOTTE_AREAS.map((area) => (
              <section
                key={area.id}
                id={area.id}
                className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6 md:p-8"
              >
                <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
                  <div>
                    <div className="flex flex-wrap items-center gap-3">
                      <p className="text-[12px] font-semibold uppercase tracking-[0.24em] text-amber-300">
                        {area.name} · {area.county}
                      </p>
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] ${
                          area.coverage === "page"
                            ? "border-amber-300/40 bg-amber-300/10 text-amber-200"
                            : "border-white/20 bg-white/[0.05] text-zinc-300"
                        }`}
                      >
                        {area.coverage === "page" ? "Dedicated page" : "Walkthrough"}
                      </span>
                    </div>
                    <h3 className="mt-3 max-w-xl text-2xl font-semibold text-white md:text-3xl">
                      Remodeling and exterior work for {area.name}
                    </h3>
                    <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-300">{area.localCopy}</p>
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

                  <div className="rounded-[26px] border border-white/10 bg-zinc-950/40 p-5">
                    <h4 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">
                      Best fit projects
                    </h4>
                    <ul className="mt-4 space-y-3 text-sm leading-relaxed text-zinc-300">
                      {area.highlights.map((item) => (
                        <li key={item} className="rounded-xl border border-white/10 bg-white/[0.05] px-4 py-3">
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

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {POPULAR_SERVICES.map((service) => (
            <Link
              key={service.title}
              href={service.href}
              className="rounded-[28px] border border-white/10 bg-white/[0.04] p-6 transition hover:border-amber-300/30 hover:bg-white/[0.06]"
            >
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-amber-300">Popular service</p>
              <h3 className="mt-3 text-xl font-semibold text-white">{service.title}</h3>
              <p className="mt-3 text-sm leading-7 text-zinc-300">{service.copy}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-amber-200">
                Explore service
                <ArrowRight className="h-4 w-4" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
          <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6 md:p-8">
            <h2 className="text-xl font-semibold text-white">Two regions, one local builder</h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">
              Whether you&apos;re weighing project type, a rough budget, timeline, or whether a contractor can manage a
              larger scope without loose estimating, this page points you to the right starting place for your suburb.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">North Charlotte</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Mooresville and Huntersville projects tend to be larger footprints and function-first family
                  remodels — start with a walkthrough and we&apos;ll scope it with you.
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-zinc-950/40 p-5">
                <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-amber-300">Cabarrus County</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                  Concord and Kannapolis have the deepest coverage today, tying roofing, additions, and kitchen
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
