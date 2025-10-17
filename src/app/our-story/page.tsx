import type { Metadata } from "next";
import TrustedBadges from "@/components/TrustedBadges";
// If you want Google reviews above the accreditations here too, just uncomment:
// import Reviews from "@/components/Reviews";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "DiFiore Builders is a third-generation, full-service general construction company serving the Tri-State area since 2003.",
  alternates: { canonical: "/our-story" },
};

export default function OurStoryPage() {
  return (
    <>
      {/* Top hero with Matt's photo */}
      <section className="px-4 pt-10 md:pt-14">
        <div className="mx-auto max-w-4xl text-center">
          <figure className="mx-auto max-w-2xl overflow-hidden rounded-2xl border border-white/15 shadow-[0_24px_80px_rgba(3,9,20,.55)]">
            <img
              src="/difiore-ourstory-showcase-matt.jpeg"
              alt="Matt DiFiore — third-generation builder"
              className="w-full h-auto object-cover"
              loading="eager"
              decoding="async"
            />
          </figure>

          <h1 className="mt-8 font-serif text-[clamp(32px,4vw,52px)] font-extrabold leading-tight tracking-tight">
            Our Story
          </h1>
          <p className="mt-2 text-[15px] text-white/85">
            Trusted local builders since 2003 — serving Chadds Ford and the surrounding Tri-State Area.
          </p>
        </div>
      </section>

      {/* src/app/our-story/page.tsx — inside the page after your hero */}
<section className="mx-auto max-w-3xl px-4 py-10 md:py-14 text-center">
  <h2 className="sr-only">Our Story</h2>
  <div className="space-y-6 text-[15px] leading-relaxed text-zinc-200 md:text-[16px]">
    <p className="font-semibold text-zinc-100">
      📖 Our Story:
    </p>

    <p>
      For Matt DiFiore, building isn’t just a career—it’s a family tradition. As a
      third-generation general contractor, Matt grew up surrounded by craftsmanship
      and hard work. In fact, one of his earliest memories is being on a job site
      with his grandfather as a baby, watching the family legacy of building strong
      homes and lasting relationships in action.
    </p>

    <p>
      That tradition lives on today through <strong>DiFiore Builders Inc.</strong>,
      a full-service general construction company proudly serving Chadds Ford, PA,
      and the surrounding Tri-State Area since 2003. What started with family values
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
</section>

      {/* Optional reviews prefooter here */}
      {/* <Reviews /> */}

     
      <TrustedBadges />
</>
  );
}
