import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TrustedBadges from "@/components/TrustedBadges";

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
      {/* HERO: full-bleed image + overlay */}
      <section
        className="relative isolate min-h-[52svh] overflow-hidden"
        aria-label="Roofing & Siding"
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: "url('/difiore-services-showcase-3style-roof.png')" }}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {["Asphalt • Metal", "Vinyl • Fiber Cement", "Repairs & Replacements"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight">
              Roofing &amp; Siding
            </h1>
            <p className="mt-3 text-[15px] text-white/90">
              Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
            </p>
            <p className="mt-2 text-[15px] text-white/80">
              Weather-tight systems, clean lines, and long-term performance. From full tear-offs and re-roofs
              to premium siding upgrades, we handle everything with tidy job sites and clear communication.
            </p>
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
              Built for the elements — detailed for curb appeal
            </h2>
            <div className="prose prose-invert mt-3 max-w-none text-zinc-200">
              <p>
                As a full-service GC, we coordinate the entire scope—tear-offs, sheathing repairs,
                underlayments, flashings, siding replacement, trim, and inspections—so you get one tidy,
                accountable process start to finish.
              </p>
            </div>

            {/* Feature list */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
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
          <figure className="grid grid-cols-2 gap-4 self-start">
            {[
              {
                src: "/difiore-services-showcase-3style-roof.png",
                alt: "Clean roofing lines and materials",
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
            ].map((item, idx) => (
              <div
                key={`${item.src}-${idx}`}
                className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15"
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={idx === 0}
                />
              </div>
            ))}
          </figure>
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (placeholder) */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
            <div className="rvv-surface p-5 md:p-6">
              <div className="flex items-center justify-between">
                <strong className="text-[15px]">Homeowner Review</strong>
                <span className="ml-3 text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="mt-2 text-[15px] text-zinc-100">
                “Crew was punctual, respectful, and fast. New roof and siding look fantastic, flashing
                is tight, and cleanup was spotless. Communication was clear and the final price matched
                the proposal. Highly recommend.”
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
