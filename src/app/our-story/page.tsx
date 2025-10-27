import type { Metadata } from "next";
import TrustedBadges from "@/components/TrustedBadges";
import OurStoryHeroClient from "@/components/OurStoryHeroClient";

export const metadata: Metadata = {
  title: "Our Story | Family-Owned General Contractor Since 2003",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. We specialize in roofing, siding, additions, kitchens, bathrooms, decks, and full interior/exterior renovations with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/our-story",
  },
};

export default function OurStoryPage() {
  return (
    <>
      {/* HERO: background only + bottom pills */}
      <section className="relative isolate min-h-[50svh] overflow-hidden">
        <div
          className="absolute inset-0 -z-4 bg-no-repeat"
          style={{
            backgroundImage: "url('/difiore-hero-alternate.png')",
            backgroundSize: "100%",
            backgroundPosition: "50% 75%",
          }}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)]" />

        <div className="absolute inset-x-0 bottom-4 px-4">
          <div className="mx-auto flex max-w-5xl flex-wrap justify-center gap-88">
            {["Third-generation builder", "Locally owned", "Since 2003"].map((t) => (
              <span
                key={t}
                className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* STORY CONTENT with side before/after stacks */}
      <section className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <OurStoryHeroClient />

        {/* Add horizontal padding on lg+ to make room for the stacks */}
        <div className="mx-auto max-w-3xl text-center lg:max-w-none lg:pl-[320px] lg:pr-[320px] xl:pl-[360px] xl:pr-[360px]">
          <h1 className="font-serif text-[clamp(32px,4vw,52px)] font-extrabold leading-tight tracking-tight">
            Our Story
          </h1>
          <p className="mt-2 text-[15px] text-white/85">
            Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
          </p>

          <h2 className="sr-only">Company background</h2>
          <div className="mt-6 space-y-6 text-[15px] leading-relaxed text-zinc-200 md:text-[16px]">
            <p>
              For Matt DiFiore, building isn’t just a career—it’s a family tradition. As a
              third-generation general contractor, Matt grew up surrounded by craftsmanship
              and hard work. In fact, one of his earliest memories is being on a job site
              with his grandfather as a baby, watching the family legacy of building strong
              homes and lasting relationships in action.
            </p>

            <p>
              That tradition lives on today through <strong>DiFiore Builders Inc.</strong>,
              a full-service general construction company proudly serving Chadds Ford, Glen Mills,
              Garnet Valley, Kennett Township, Concord, West Chester, East &amp; West Marlborough,
              Pocopson, West Goshen, and London Grove since 2003. What started with family values
              and a commitment to quality has grown into a trusted local business built on
              repeat customers and referrals—proof that relationships matter just as much as
              results.
            </p>

            <p>
              At <strong>DiFiore Builders</strong>, we specialize in every aspect of
              construction and remodeling—whether it’s a Custom Home addition, a modernized
              kitchen, updated bathroom, finished basement, or exterior improvements like
              decks, roofing, and siding.
            </p>

            <p className="font-semibold italic">
              From the foundation to the roof we provide quality work
              <span className="not-italic"> </span>delivered by skilled craftsmanship with a personal touch.
            </p>

            <p>
              As a community-rooted company, we treat every project like it’s our own home.
              That means attention to detail, open communication, and a level of care you
              won’t find with larger contractors. Our mission is simple: to be your
              one-call solution for all your building needs while upholding the same values
              Matt’s grandfather instilled decades ago—honesty, quality, and trust.
            </p>

            <p>
              At <strong>DiFiore Builders</strong>, we don’t just build homes—we build
              relationships that last for generations.
            </p>
          </div>
        </div>
      </section>

      <TrustedBadges />
    </>
  );
}
