'use client';

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import TrustedBadges from "@/components/TrustedBadges";
import { useReveal } from "@/lib/hooks";
import { heroBackground } from "@/lib/theme";

const expertise = [
  "Full kitchen and bath remodels",
  "Additions, basements, and layout changes",
  "Roofing and exterior upgrades",
  "Design guidance and finish selection support",
];

const services = [
  "Kitchen and bath remodels",
  "Roofing replacement and exterior upgrades",
  "Additions, garages, and new space planning",
  "Finish carpentry and interior improvements",
];

const steps = [
  {
    title: "Estimate your range",
    body: "Use the project calculator to see a realistic cost window.",
  },
  {
    title: "We confirm scope",
    body: "We review goals, timelines, and HOA or permit requirements.",
  },
  {
    title: "On-site walkthrough",
    body: "We verify conditions and lock in a formal quote.",
  },
];

type LandingVariant = "default" | "meta" | "lsa";
const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";
const CHARLOTTE_PHONE_TEL = "tel:9809466791";
const Reviews = dynamic(() => import("@/components/Reviews"), {
  ssr: false,
  loading: () => <div className="mx-auto w-full max-w-6xl min-h-[280px]" aria-hidden />,
});

const VARIANT_COPY: Record<
  LandingVariant,
  {
    eyebrow: string;
    headline: string;
    lead: string;
    support: string;
    primaryCta: string;
    secondaryCta: string;
  }
> = {
  default: {
    eyebrow: "Now Serving Concord & Kannapolis, NC",
    headline: "Concord & Kannapolis General Contractor for Home Remodeling",
    lead: "Licensed in North Carolina and backed by 20+ years of remodeling experience since 2003.",
    support:
      "Our owner is now based in Kannapolis, and we are expanding across Cabarrus County while continuing to serve Pennsylvania clients.",
    primaryCta: "Get a Charlotte Estimate",
    secondaryCta: `Call Now ${CHARLOTTE_PHONE_DISPLAY}`,
  },
  meta: {
    eyebrow: "Charlotte Metro Expansion",
    headline: "Your Concord-Kannapolis remodel, planned fast",
    lead: "Licensed NC general contractor with 20+ years of kitchen, bath, and addition experience.",
    support:
      "Quick cost ranges, clear timelines, and clean job sites from a family-owned team.",
    primaryCta: "Get My Estimate",
    secondaryCta: `Call Now ${CHARLOTTE_PHONE_DISPLAY}`,
  },
  lsa: {
    eyebrow: "Concord & Kannapolis, NC",
    headline: "Licensed NC contractor for remodeling & roofing",
    lead: "Get a local walkthrough and a clear, written quote from a trusted, insured team.",
    support:
      "We are expanding to Charlotte metro while keeping our PA crews fully active.",
    primaryCta: "Start My Estimate",
    secondaryCta: `Call Now ${CHARLOTTE_PHONE_DISPLAY}`,
  },
};

export default function ConcordKannapolisLanding({
  variant = "default",
  reviewUrl,
}: {
  variant?: LandingVariant;
  reviewUrl?: string;
}) {
  const copy = VARIANT_COPY[variant];
  const expertiseRef = useReveal<HTMLDivElement>({ threshold: 0.18, rootMargin: "0px 0px -12% 0px" });
  const servicesRef = useReveal<HTMLDivElement>({ threshold: 0.18, rootMargin: "0px 0px -12% 0px" });
  const paRef = useReveal<HTMLDivElement>({ threshold: 0.18, rootMargin: "0px 0px -12% 0px" });
  const stepsRef = useReveal<HTMLDivElement>({ threshold: 0.18, rootMargin: "0px 0px -12% 0px" });
  const ctaRef = useReveal<HTMLDivElement>({ threshold: 0.18, rootMargin: "0px 0px -12% 0px" });

  return (
    <main className="relative isolate min-h-screen text-white">
      <section
        className="relative isolate min-h-[72svh] md:min-h-[84svh] w-full overflow-hidden"
        aria-label="Concord and Kannapolis Hero"
        style={
          {
            "--hero-bg-mobile": heroBackground.positions.mobile,
            "--hero-bg-md": heroBackground.positions.tablet,
            "--hero-bg-lg": heroBackground.positions.desktop,
          } as CSSProperties
        }
      >
        <div className="pointer-events-none fixed inset-0 -z-20">
          <div className="relative h-full w-full">
            <div className="h-full w-full max-w-full overflow-hidden">
              <Image
                src={heroBackground.imageSrc}
                alt="Home remodeling and roofing work by DiFiore Builders in Concord and Kannapolis, NC"
                priority
                width={1200}
                height={800}
                className="hero-background-image h-full w-full object-cover transition-[object-position] duration-500"
              />
            </div>
            <div aria-hidden className="absolute inset-0 bg-[rgba(4,8,16,0.12)]" />
          </div>
        </div>

        <div className="absolute top-[5vh] right-[4%] md:right-[3%] lg:right-[5%] z-10 text-right">
          <span className="block max-w-[260px] text-[clamp(16px,3.2vw,28px)] font-semibold leading-snug text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.45)] md:max-w-none md:whitespace-nowrap">
            “Quality work from the{" "}
            <span className="block whitespace-nowrap sm:inline">foundation to the roof”</span>
          </span>
        </div>

        <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
          <div className="grid min-h-[72svh] md:min-h-[84svh] place-items-center">
            <div className="w-full translate-y-[3vh] text-center sm:translate-y-[5vh] md:translate-y-[7vh]">
              <p className="mb-4 text-[12px] font-semibold uppercase tracking-[0.28em] text-amber-300 sm:text-[13px]">
                {copy.eyebrow}
              </p>
              <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-black leading-[1.04] tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.45)]">
                {copy.headline}
              </h1>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:mt-12 sm:gap-5">
                <Link
                  href="/project-calculator"
                  className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
                >
                  {copy.primaryCta}
                </Link>
                <Link
                  href="/contact"
                  className="rounded-md border border-white/55 bg-black/20 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
                >
                  Get a Quote
                </Link>
                <Link
                  href="/before-and-after"
                  className="rounded-md border border-white/55 bg-black/20 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
                >
                  See Projects
                </Link>
              </div>

              <a
                href={CHARLOTTE_PHONE_TEL}
                className="mt-8 inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-300/90 hover:text-amber-300 sm:mt-9 sm:text-[14px]"
              >
                Call now {CHARLOTTE_PHONE_DISPLAY}
              </a>
              <p className="mt-5 mx-auto max-w-[680px] text-[17px] font-bold leading-relaxed text-white/90 sm:text-[20px]">
                {copy.lead}
              </p>
              <div className="mt-3 mx-auto max-w-[820px] text-sm leading-relaxed text-white/75 sm:text-base">
                {copy.support}
              </div>
              <TrustedBadges compact className="pt-12" />
            </div>
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-6 -mt-16 md:-mt-24">
        <div className="mx-auto w-full max-w-6xl">
          <Reviews reviewUrl={reviewUrl} />
        </div>
      </section>

      <section className="relative z-10 px-4 py-12">
        <div ref={expertiseRef} className="group mx-auto w-full max-w-5xl text-center opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out in:opacity-100 in:[transform:none]">
          <h2 className="text-2xl font-semibold">What we are bringing to Concord and Kannapolis</h2>
          <p className="mt-2 mx-auto max-w-2xl text-sm text-white/60">
            Expanded expertise and full-service remodeling support for the Charlotte metro.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {expertise.map((item, index) => (
              <div
                key={item}
                style={{ transitionDelay: `${index * 90}ms` }}
                className="rounded-xl border border-white/12
                  bg-[linear-gradient(180deg,rgba(14,22,34,.9),rgba(10,18,30,.84))]
                  px-4 py-3 text-zinc-100 shadow-[0_10px_28px_rgba(0,0,0,.28)] backdrop-blur-sm
                  opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out
                  group-[.in]:opacity-100 group-[.in]:[transform:none]"
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12">
        <div ref={servicesRef} className="group mx-auto w-full max-w-5xl text-center opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out in:opacity-100 in:[transform:none]">
          <h2 className="text-2xl font-semibold">Popular projects we handle</h2>
          <p className="mt-2 mx-auto max-w-2xl text-sm text-white/60">
            Full-service remodeling support for homeowners throughout the Concord-Kannapolis area.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={service}
                style={{ transitionDelay: `${index * 90}ms` }}
                className="rounded-xl border border-white/12
                  bg-[linear-gradient(180deg,rgba(14,22,34,.9),rgba(10,18,30,.84))]
                  px-4 py-3 text-zinc-100 shadow-[0_10px_28px_rgba(0,0,0,.28)] backdrop-blur-sm
                  opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out
                  group-[.in]:opacity-100 group-[.in]:[transform:none]"
              >
                {service}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-12">
        <div
          ref={paRef}
          className="mx-auto w-full max-w-5xl rounded-2xl border border-white/12
            bg-[linear-gradient(180deg,rgba(14,22,34,.9),rgba(10,18,30,.84))]
            p-6 text-center shadow-[0_10px_28px_rgba(0,0,0,.28)] backdrop-blur-sm
            opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out
            in:opacity-100 in:[transform:none]"
        >
          <h2 className="text-xl font-semibold">Still serving Pennsylvania</h2>
          <p className="mt-2 mx-auto max-w-3xl text-sm text-white/70">
            Our original PA team remains active with the same crews and service standards. This is
            a Charlotte-area expansion, not a relocation, so both markets continue to be supported.
          </p>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-16">
        <div ref={stepsRef} className="group mx-auto w-full max-w-5xl text-center opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out in:opacity-100 in:[transform:none]">
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-5 grid gap-4 text-sm text-white/70 sm:grid-cols-3">
            {steps.map((step, index) => (
              <div
                key={step.title}
                style={{ transitionDelay: `${index * 110}ms` }}
                className="rounded-2xl border border-white/12
                  bg-[linear-gradient(180deg,rgba(14,22,34,.9),rgba(10,18,30,.84))]
                  p-5 shadow-[0_10px_28px_rgba(0,0,0,.28)] backdrop-blur-sm
                  opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out
                  group-[.in]:opacity-100 group-[.in]:[transform:none]"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-semibold text-white">{step.title}</p>
                <p className="mt-2">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative z-10 px-4 pb-20">
        <div
          ref={ctaRef}
          className="mx-auto w-full max-w-5xl rounded-2xl border border-amber-400/20 bg-amber-500/10 p-6 text-center
            opacity-0 [transform:translateY(18px)] transition-[transform,opacity] duration-700 ease-out
            in:opacity-100 in:[transform:none]"
        >
          <h2 className="text-2xl font-semibold text-white">Ready to plan your remodel?</h2>
          <p className="mt-2 text-sm text-white/70">
            Start with a quick estimate or call us to talk through your Concord or Kannapolis
            project.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              href="/project-calculator"
              className="inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow hover:bg-amber-400 sm:w-auto"
            >
              Start My Estimate
            </Link>
            <a
              href={CHARLOTTE_PHONE_TEL}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              Call Now
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
