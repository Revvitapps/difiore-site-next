import type { Metadata } from "next";
import Link from "next/link";
import type { CSSProperties } from "react";
import Image from "next/image";
import TrustedBadges from "@/components/TrustedBadges";

export const metadata: Metadata = {
  title: "Before & After Project Gallery | DiFiore Builders",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Explore roofing, siding, kitchen, bathroom, deck, and home addition transformations delivered with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/before-and-after",
  },
};

type Review = { name: string; rating: number; text: string };

const REVIEWS: Review[] = [
  {
    name: "Kevin Parchen",
    rating: 5,
    text:
      "We can absolutely recommend DiFiore Builders for any project around the house. Over the 15 years, Matt and crew have flawlessly performed for us on demanding jobs. From remodeling our 45‑year‑old kitchen and bathrooms to replacement windows and doors, new deck and gutters, and even the repair of a water‑damaged exterior wall, they’ve come through every time. Matt provides great personal service and attention to detail; often offering suggestions and guidance vastly improving the finished product. The mark of a true professional is how they respond to the unexpected challenges that arise during any remodeling project; Matt and his sub‑contractors work seamlessly to overcome all obstacles with ease. Bottom line: from roof to basement you can trust DiFiore Builders to do the job right…",
  },
  {
    name: "Josh Kobylarz",
    rating: 5,
    text:
      "DiFiore remodeled a bathroom in our previous house and later converted a sunroom into an extension of our kitchen/family room. Work was quick, well‑done, and within budget (lowest of four bids). The crew was friendly, helpful, and receptive to feedback. We love the new room and use it constantly.",
  },
  {
    name: "Kelly Smith",
    rating: 5,
    text:
      "We’ve used DiFiore Builders for many projects: finished basement, two bathroom renovations, new roof, new front entryway and porch work. Reliable, fair pricing, and top‑tier workmanship. Highly recommend!",
  },
  {
    name: "Kelly Smith — Kitchen 2019",
    rating: 5,
    text:
      "DiFiore Builders did a phenomenal job remodeling our kitchen in 2019. Matt helped with layout and materials; the team kept the mess contained throughout. We couldn’t be happier and will absolutely use them again.",
  },
];

export default function BeforeAfterPage() {
  return (
    <>
      {/* HERO: blended before/after background — centered chips, heading, CTAs */}
      <section
        className="relative isolate min-h-[60svh] overflow-hidden"
        aria-label="Before & After"
      >
        {/* Two-layer blended background */}
        <div className="absolute inset-0 -z-10">
          {/* Left (Before) */}
          <div
            className="absolute inset-y-0 left-0 w-[60%] md:w-1/2 bg-cover bg-center"
            style={
              {
                backgroundImage: "url('/difiore-services-showcase-newbuild.jpg')",
                maskImage: "linear-gradient(to right, black 62%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 62%, transparent 100%)",
              } as CSSProperties
            }
            aria-hidden
          />
          {/* Right (After) */}
          <div
            className="absolute inset-y-0 right-0 w-[60%] md:w-1/2 bg-cover bg-center"
            style={
              {
                backgroundImage: "url('/difiore-os-newbuild-after-tr.png')",
                maskImage: "linear-gradient(to left, black 62%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to left, black 62%, transparent 100%)",
              } as CSSProperties
            }
            aria-hidden
          />
          {/* Dark overlay for contrast */}
          <div aria-hidden className="absolute inset-0 bg-[rgba(8,16,28,.48)]" />
        </div>

        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex flex-wrap justify-center gap-2">
              {["Kitchens", "Bathrooms", "Additions"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight text-white">
              Before &amp; After
            </h1>
            <p className="mt-3 text-[15px] text-white/90">
              Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
            </p>
            <p className="mt-2 text-[15px] text-white/80">
              Real renovations from kitchens to patios — see what makes DiFiore Builders trusted by families across the region.
            </p>
            {/* Note: Keeping hero CTAs here; review-section CTAs moved near badges */}
            <div className="mt-6 flex flex-wrap justify-center gap-3">
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

      <section className="px-4 pb-0">
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

      {/* REVIEWS over full-page background grid */}
      <section
        className="relative min-h-[100svh] px-4 py-16 md:py-24"
        aria-label="Homeowner reviews"
      >
        {/* Background image grid (2x2 full-bleed, centered, no gaps) */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
          <div className="grid h-full w-full grid-cols-2 grid-rows-2">
            {/* Top Left */}
            <div className="relative">
              <Image
                src="/difiore-os-before-bl.jpeg"
                alt="Before — project"
                fill
                className="object-cover scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Top Right */}
            <div className="relative">
              <Image
                src="/difiore-os-after-bl.jpeg"
                alt="After — project"
                fill
                className="object-cover scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Bottom Left */}
            <div className="relative">
              <Image
                src="/difiore-os-before-br-front.jpeg"
                alt="Before — exterior front"
                fill
                className="object-cover scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            {/* Bottom Right */}
            <div className="relative">
              <Image
                src="/difiore-services-additions-secondstory2.jpeg"
                alt="After — second story addition"
                fill
                className="object-cover scale-[1.06]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
          {/* Darken & balance for readability (slight) */}
          <div className="absolute inset-0 bg-[rgba(8,16,28,.42)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/35" />
        </div>

        {/* Reviews header */}
        <div className="mx-auto max-w-6xl text-center">
          {/* Removed "Customer Reviews" per request */}
          <h2 className="font-serif text-[clamp(30px,3.2vw,40px)] font-extrabold tracking-tight">
            What homeowners say
          </h2>
        </div>

        {/* Reviews list — split left/right, consistent sizes, rectangle pills */}
        <div className="mx-auto mt-8 max-w-6xl">
          <div className="space-y-4 md:space-y-6">
            {REVIEWS.map((r, idx) => (
              <div
                key={`${r.name}-${idx}`}
                className={`md:flex ${idx % 2 === 0 ? "md:justify-start" : "md:justify-end"}`}
              >
                <article
                  className="w-full md:w-[560px] rounded-xl border border-amber-400/35 bg-[rgba(12,15,20,.88)] px-5 py-4 shadow-[0_0_30px_rgba(245,158,11,.30)] backdrop-blur"
                >
                  <div className="flex items-center justify-between gap-3">
                    <strong className="truncate">{r.name}</strong>
                    <span
                      className="text-amber-300 text-sm shrink-0"
                      aria-label={`${r.rating} out of 5 stars`}
                    >
                      {"★".repeat(r.rating)}
                      {"☆".repeat(5 - r.rating)}
                    </span>
                  </div>
                  <p className="mt-2 text-[15px] leading-relaxed text-zinc-200 break-words">
                    {r.text}
                  </p>
                </article>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA pill (moved here) */}
      <section className="px-4 pb-10">
        <div className="mx-auto max-w-6xl">
          <div className="flex justify-center">
            <Link
              href="/project-calculator"
              className="rounded-full bg-amber-500 px-6 py-3 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <TrustedBadges />
    </>
  );
}
