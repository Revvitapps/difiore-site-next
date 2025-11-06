import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";
import HeroSection from "@/components/services/HeroSection";
import AnimatedImageGrid from "@/components/services/AnimatedImageGrid";

export const metadata: Metadata = {
  title: "Home Additions, Finished Basements & Decks | DiFiore Builders",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Second-story additions, first-floor expansions, primary suites, finished basements, and outdoor living decks completed with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/services/additions-basements",
  },
};

const HERO = "/difiore-services-showcase-additions-playroom1.JPG";

export default function AdditionsBasementsPage() {
  return (
    <>
      <HeroSection
        title="Additions & Basements"
        subtitle="Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003."
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
                src: "/difiore-services-showcase-additions-playroom1.JPG",
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

      {/* REVIEW HIGHLIGHT (swap text later if you want) */}
      <section className="px-4 pb-16 md:pb-20 mt-16 md:mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
            <div className="rvv-surface p-5 md:p-6">
              <div className="flex items-center justify-between">
                <strong className="text-[15px]">Homeowner in Chadds Ford</strong>
                <span className="ml-3 text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="mt-2 text-[15px] text-zinc-100">
                “Our addition looks like it was always part of the house. DiFiore handled permits,
                structural work, and finishes professionally — on schedule and with great communication.”
              </p>
            </div>
          </div>

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

      <TrustedBadges />
    </>
  );
}
