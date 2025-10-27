import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TrustedBadges from "@/components/TrustedBadges";

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
      {/* HERO: full-bleed image + overlay */}
      <section
        className="relative isolate min-h-[52svh] overflow-hidden"
        aria-label="Kitchens & Bathrooms"
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/difiore-services-showcase-kitchen-whole.webp')" }}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {["Cabinetry", "Tile & Stone", "Lighting"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight">
              Kitchens & Bathrooms
            </h1>
            <p className="mt-3 text-[15px] text-white/90">
              Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
            </p>
            <p className="mt-2 text-[15px] text-white/80">
              Smart layouts, durable materials, and beautiful details — from fixture updates to full gut
              renovations, we handle everything with clean job sites and attentive service.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
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
          </div>
        </div>
      </section>

      <section className="px-4">
        <div className="mx-auto max-w-6xl">
          <section className="max-w-3xl text-[14px] leading-relaxed text-white/70 space-y-4">
            <p>
              DiFiore Builders is a family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. We specialize in roofing, siding, additions, kitchens, bathrooms, decks, and full interior/exterior renovations with high-quality craftsmanship at an agreed-upon price. We proudly support homeowners in Chadds Ford, Glen Mills, Garnet Valley, Kennett Township, Concord, West Chester, East Marlborough, West Marlborough, Pocopson, West Goshen, and London Grove, PA.
            </p>
            <p>
              We handle full project scope — design input, permitting, structural framing, mechanicals, finishes, inspections, and cleanup. Whether it’s a full roof tear-off and replacement, Hardie/fiber-cement siding, a new deck or outdoor living space, a tile bathroom remodel, or adding livable square footage with a primary suite addition or a finished basement, you’re working directly with the builder — not a lead aggregator.
            </p>
            <p>
              Want a ballpark before we visit?{' '}
              <a
                href="/project-calculator"
                className="text-amber-300 hover:text-amber-200 font-semibold underline underline-offset-2"
              >
                Get a rough cost estimate →
              </a>
            </p>
          </section>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
              Designed for daily life — built to last
            </h2>
            <div className="prose prose-invert mt-3 max-w-none text-zinc-200">
              <p>
                As a full-service GC, we coordinate every phase — design guidance, permitting, demo,
                rough-ins, finishes, and punch list. Expect clear schedules, careful protection, and a
                tidy workspace from start to finish.
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
          <figure className="grid grid-cols-2 gap-4 self-start">
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15">
              <Image
                src="/difiore-services-showcase-kitchen-whole.webp"
                alt="Kitchen detail — stone, tile, and clean lines"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15">
              <Image
                src="/difiore-services-kitchen-darkwood-stainless-appoliances.JPG"
                alt="Bathroom refresh — tile, fixtures, and lighting"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15">
              <Image
                src="/difiore-reviews-cindy-colvin.png"
                alt="Full kitchen remodel — bright, functional, and durable"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <div className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15">
              <Image
                src="/difiore-services -bathroom-shower1.JPG"
                alt="Tile & stone craftsmanship"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (static text for now) */}
      <section className="px-4 pb-12 md:pb-16">
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

          <div className="mt-6 flex flex-wrap gap-3">
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
