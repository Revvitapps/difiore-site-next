import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";
import HeroSection from "@/components/services/HeroSection";
import AnimatedImageGrid from "@/components/services/AnimatedImageGrid";
import ReviewHighlight from "@/components/reviews/ReviewHighlight";

export const metadata: Metadata = {
  title: "Roofing & Siding Replacement | Tear-Offs, Exterior Wraps, Gutters",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Complete tear-offs, premium roofing, vinyl and fiber-cement siding, exterior wraps, gutters, fascia, and trim delivered with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/services/roofing-siding",
  },
};

export default function RoofingSidingPage() {
  return (
    <>
      <HeroSection
        title="Roofing & Siding"
        subtitle="Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003."
        blurb="Weather-tight systems, clean lines, and long-term performance. From full tear-offs and re-roofs to premium siding upgrades, we handle everything with tidy job sites and clear communication."
        imageSrc="/difiore-services-showcase-3style-roof.png"
        chips={["Asphalt • Metal", "Vinyl • Fiber Cement", "Repairs & Replacements"]}
      >
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
      </HeroSection>

      {/* OVERVIEW */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div className="flex h-full flex-col gap-8 md:gap-9">
            <div className="space-y-4 md:space-y-5">
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
                <span>Built for the elements —</span>
                <span className="block">detailed for curb appeal</span>
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-200">
                <p>
                  As a full-service GC, we coordinate the entire scope—tear-offs, sheathing repairs,
                  underlayments, flashings, siding replacement, trim, and inspections—so you get one tidy,
                  accountable process start to finish.
                </p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="grid gap-3 pb-6 sm:grid-cols-2 md:pb-10">
              {[
                "Tear-offs, re-roofs & leak repairs",
                "Ice & water shield, synthetic underlayments",
                "Step/pipe/chimney flashing & drip edge",
                "Vinyl & fiber-cement siding systems",
                "Soffit, fascia & aluminum trim",
                "Gutters, guards & downspouts",
                "Color-matched accessories & vents",
                "Cleanup, carting & magnet sweep",
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
                src: "/difiore-services-showcase-3style-roof.png",
                alt: "Clean roofing lines and materials",
                priority: true,
              },
              {
                src: "/difiore-services-showcase-roofing-gutter.webp",
                alt: "Roofing & gutter integration",
              },
              {
                src: "/difiore-services-showcase-roofing-gutter.webp",
                alt: "Detailing at eaves and trim",
              },
              {
                src: "/difiore-services-showcase-3style-roof.png",
                alt: "Roof planes and color-matched accessories",
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
              name: "Roofing & Siding homeowner",
              text:
                "Crew was punctual, respectful, and fast. New roof and siding look fantastic, flashing is tight, and cleanup was spotless. Communication was clear and the final price matched the proposal. Highly recommend.",
              rating: 5,
            }}
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

      {/* Prefooter badges */}
      <TrustedBadges />
    </>
  );
}
