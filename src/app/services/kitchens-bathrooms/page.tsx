import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";
import HeroSection from "@/components/services/HeroSection";
import AnimatedImageGrid from "@/components/services/AnimatedImageGrid";

export const metadata: Metadata = {
  title: "Kitchen & Bathroom Remodeling | Cabinets, Tile, Layout Changes",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Full kitchen gut-and-redesigns, cabinet replacements, appliance upgrades, tile showers, and custom bathrooms delivered with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/services/kitchens-bathrooms",
  },
};

export default function KitchensBathroomsPage() {
  return (
    <>
      <HeroSection
        title="Kitchens & Bathrooms"
        subtitle="Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003."
        blurb="Smart layouts, durable materials, and beautiful details — from fixture updates to full gut renovations, we handle everything with clean job sites and attentive service."
        imageSrc="/difiore-services-showcase-kitchen-whole.webp"
        chips={["Cabinetry", "Tile & Stone", "Lighting"]}
      >
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link
            href="/project-calculator"
            className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
          >
            Start My Remodel
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
                Designed for daily life — built to last
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-200">
                <p>
                  As a full-service GC, we coordinate every phase — design guidance, permitting, demo,
                  rough-ins, finishes, and punch list. Expect clear schedules, careful protection, and a
                  tidy workspace from start to finish.
                </p>
              </div>
            </div>

            {/* Feature list */}
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Space planning & layout optimization",
                "Cabinetry (stock, semi-custom, custom)",
                "Quartz/granite/stone surfaces & backsplash",
                "Plumbing & electrical (licensed trades)",
                "Lighting & ventilation upgrades",
                "Tile setting, waterproofing & heated floors",
                "Trim, paint, hardware & finish carpentry",
                "Accessibility & code compliance",
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
                src: "/difiore-services-showcase-kitchen-whole.webp",
                alt: "Kitchen detail — stone, tile, and clean lines",
              },
              {
                src: "/difiore-services-kitchen-darkwood-stainless-appoliances.JPG",
                alt: "Bathroom refresh — tile, fixtures, and lighting",
              },
              {
                src: "/difiore-reviews-cindy-colvin.png",
                alt: "Full kitchen remodel — bright, functional, and durable",
              },
              {
                src: "/difiore-services -bathroom-shower1.JPG",
                alt: "Tile & stone craftsmanship",
              },
            ]}
          />
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (static text for now) */}
      <section className="px-4 pb-16 md:pb-20 mt-16 md:mt-24">
        <div className="mx-auto max-w-6xl">
          <div className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
            <div className="rvv-surface p-5 md:p-6">
              <div className="flex items-center justify-between">
                <strong className="text-[15px]">Cindy Colvin</strong>
                <span className="ml-3 text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
             <p className="mt-2 text-[15px] text-zinc-100">
  “Matt and Alex, Thank you for the amazing workmanship, quality and efficient remodel of our master bathroom. We are VERY happy with the work and would be calling again for future jobs in our home. Will recommend to everyone.
  Positive Responsiveness, Punctuality, Quality, Professionalism and Value.”
  <br />
  <strong>Recommended services:</strong> Remodeling, Drywall installation, Fan installation, Install flooring, Tile work installation, Plumbing fixture installation, Paint indoors, Drywall repair
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

      {/* Prefooter badges */}
      <TrustedBadges />
    </>
  );
}
