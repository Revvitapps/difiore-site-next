import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";
import HeroSection from "@/components/services/HeroSection";
import AnimatedImageGrid from "@/components/services/AnimatedImageGrid";
import ReviewHighlight from "@/components/reviews/ReviewHighlight";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Home Additions, Finished Basements & Decks | DiFiore Builders",
  description:
    "Family-owned, licensed and insured general contractor serving Chadds Ford, PA, Glen Mills, West Chester, and Wilmington since 2003. Second-story additions, first-floor expansions, primary suites, finished basements, and outdoor living decks completed with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: `${SITE_URL}/services/additions-basements`,
  },
};

const HERO = "/difiore-services-showcase-additions-playroom1.webp";

export default function AdditionsBasementsPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Additions and Basements", path: "/services/additions-basements" },
  ]);
  const serviceLd = serviceSchema({
    name: "Home Additions and Basement Finishing",
    description:
      "Home additions and basement finishing services including design-build planning, framing, utility coordination, and interior finishes.",
    path: "/services/additions-basements",
    areaServed: ["Chadds Ford, PA", "Glen Mills, PA", "West Chester, PA", "Wilmington, DE"],
  });

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={serviceLd} />
      <HeroSection
        title="Additions & Basements"
        subtitle="Family-owned, licensed and insured general contractor serving Chadds Ford, PA, Glen Mills, West Chester, and Wilmington since 2003."
        blurb="New space that looks like it was always part of your home — from suites and sunrooms to dormers, garages, and fully finished basements."
        imageSrc={HERO}
        chips={["Design–Build", "Permit Ready", "Seamless Tie-ins"]}
      >
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/project-calculator"
            className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
          >
            Plan My Addition
          </Link>
          <Link
            href="/our-projects"
            className="rounded-md border border-white/50 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
          >
            See Projects
          </Link>
        </div>
      </HeroSection>

      {/* OVERVIEW */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div className="flex flex-col gap-8 md:gap-9">
            <div className="space-y-4 md:space-y-5">
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
                Seamless expansions, inside and out
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-200">
                <p>
                  We handle design coordination, permitting, structural work, utilities, and finishes —
                  with clean job sites and clear communication at every step.
                </p>
              </div>
            </div>

            {/* Feature pills */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Primary suites & sunrooms",
                "Garage & dormer expansions",
                "Basement build-outs",
                "Foundations, framing & envelopes",
                "Insulation & energy-smart assemblies",
                "Trim, paint & finish carpentry",
              ].map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[14px] text-zinc-100 backdrop-blur"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini gallery */}
          <AnimatedImageGrid
            items={[
              {
                src: "/difiore-services-showcase-additions-playroom1.webp",
                alt: "Family room addition",
              },
              {
                src: "/difiore-services-addition-familyroom.JPG",
                alt: "Open living expansion",
              },
              {
                src: "/difiore-services-showcase-addition-showcase.jpeg",
                alt: "Exterior addition tie-in",
              },
              {
                src: "/difiore-services-additions-secondstory2.jpeg",
                alt: "Second-story addition exterior",
              },
            ]}
          />
        </div>
      </section>

      {/* REVIEW HIGHLIGHT */}
      <section className="px-4 pb-16 md:pb-20 mt-16 md:mt-24">
        <div className="mx-auto max-w-6xl">
          <ReviewHighlight
            label="Homeowner Review"
            fallback={{
              name: "Homeowner in Chadds Ford, PA",
              text:
                "Our addition looks like it was always part of the house. DiFiore handled permits, structural work, and finishes professionally — on schedule and with great communication.",
              rating: 5,
            }}
            truncateAt={190}
            reviewOffset={2}
          />

          <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3">
            <Link
              href="/project-calculator"
              className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
            >
              Get a Quote
            </Link>
            <Link
              href="/our-projects"
              className="rounded-md border border-white/50 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
            >
              See Projects
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-14">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Additions and basements by city</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/chadds-ford/home-additions" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Chadds Ford additions</Link>
            <Link href="/glen-mills/home-additions" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Glen Mills additions</Link>
            <Link href="/west-chester/home-additions" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">West Chester additions</Link>
            <Link href="/wilmington-de/home-additions" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Wilmington additions</Link>
            <Link href="/chadds-ford/basement-finishing" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Chadds Ford basements</Link>
            <Link href="/glen-mills/basement-finishing" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Glen Mills basements</Link>
            <Link href="/west-chester/basement-finishing" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">West Chester basements</Link>
            <Link href="/wilmington-de/basement-finishing" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">Wilmington basements</Link>
          </div>
        </div>
      </section>

      <TrustedBadges />
    </>
  );
}
