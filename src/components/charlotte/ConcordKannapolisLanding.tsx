'use client';

import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { heroBackground } from "@/lib/theme";
import Reviews from "@/components/Reviews";
import TrustedBadges from "@/components/TrustedBadges";

const highlights = [
  "20+ years of remodeling experience (since 2003)",
  "Licensed & insured general contractor in North Carolina",
  "Permit-ready planning and clear project timelines",
  "Clean job sites, tight schedules, and proactive updates",
];

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
const CHARLOTTE_PHONE_TEL = "tel:+19809466791";

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
    headline: "Concord-Kannapolis remodeling starts here",
    lead: "Licensed in North Carolina and backed by 20+ years of remodeling experience since 2003.",
    support:
      "We are expanding into the Charlotte metro while continuing to serve our Pennsylvania clients.",
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
}: {
  variant?: LandingVariant;
}) {
  const prefersReducedMotion = useReducedMotion();
  const baseInitial = prefersReducedMotion ? false : { opacity: 0, y: 28 };
  const baseAnimate = prefersReducedMotion ? {} : { opacity: 1, y: 0 };
  const baseTransition = (delay = 0) =>
    prefersReducedMotion
      ? undefined
      : { duration: 0.75, delay };
  const copy = VARIANT_COPY[variant];

  return (
    <main
      className="relative isolate min-h-screen text-white"
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
          <Image
            src={heroBackground.imageSrc}
            alt="DiFiore Builders exterior renovation"
            priority
            fill
            sizes="100vw"
            className="hero-background-image h-full w-full object-cover"
          />
          <div aria-hidden className="absolute inset-0 bg-[rgba(6,10,20,0.12)]" />
          <div
            aria-hidden
            className="absolute inset-0 bg-gradient-to-b from-[#12223a]/30 via-transparent to-[#0c0f14]/35"
          />
        </div>
      </div>

      <section className="relative flex min-h-[100svh] items-center overflow-hidden px-4 pt-16 pb-12 md:pt-20">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0)}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto w-full max-w-5xl text-center"
        >
          <p className="text-xs uppercase tracking-[0.35em] text-amber-300">{copy.eyebrow}</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            {copy.headline}
          </h1>
          <p className="mt-4 mx-auto max-w-3xl text-base text-white/75 sm:text-lg">{copy.lead}</p>
          <p className="mt-3 mx-auto max-w-3xl text-sm text-white/60">{copy.support}</p>

          <div className="mt-7 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/project-calculator"
              className="inline-flex w-full items-center justify-center rounded-md bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 shadow hover:bg-amber-400 sm:w-auto"
            >
              {copy.primaryCta}
            </Link>
            <a
              href={CHARLOTTE_PHONE_TEL}
              className="inline-flex w-full items-center justify-center rounded-md border border-white/40 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
            >
              {copy.secondaryCta}
            </a>
          </div>

          <div className="mt-10 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {highlights.map((item, index) => (
              <motion.div
                key={item}
                initial={baseInitial}
                whileInView={baseAnimate}
                transition={baseTransition(0.15 + index * 0.08)}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-xl border border-white/10 bg-black/55 px-4 py-3"
              >
                {item}
              </motion.div>
            ))}
          </div>

          <div className="mt-16 md:mt-20">
            <TrustedBadges compact className="pt-6 pb-2 md:pt-8 md:pb-3" />
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-6 -mt-16 md:-mt-24">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0.2)}
          viewport={{ once: true, amount: 0.25 }}
          className="mx-auto w-full max-w-6xl"
        >
          <Reviews />
        </motion.div>
      </section>

      <section className="px-4 py-12">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0.1)}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-5xl text-center"
        >
          <h2 className="text-2xl font-semibold">What we are bringing to Concord and Kannapolis</h2>
          <p className="mt-2 mx-auto max-w-2xl text-sm text-white/60">
            Expanded expertise and full-service remodeling support for the Charlotte metro.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {expertise.map((item, index) => (
              <motion.div
                key={item}
                initial={baseInitial}
                whileInView={baseAnimate}
                transition={baseTransition(0.2 + index * 0.08)}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {item}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-12">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0.15)}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-5xl text-center"
        >
          <h2 className="text-2xl font-semibold">Popular projects we handle</h2>
          <p className="mt-2 mx-auto max-w-2xl text-sm text-white/60">
            Full-service remodeling support for homeowners throughout the Concord-Kannapolis area.
          </p>
          <div className="mt-5 grid gap-3 text-sm text-white/70 sm:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service}
                initial={baseInitial}
                whileInView={baseAnimate}
                transition={baseTransition(0.25 + index * 0.08)}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                {service}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-12">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0.2)}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-5xl rounded-2xl border border-white/10 bg-white/5 p-6 text-center"
        >
          <h2 className="text-xl font-semibold">Still serving Pennsylvania</h2>
          <p className="mt-2 mx-auto max-w-3xl text-sm text-white/70">
            Our original PA team remains active with the same crews and service standards. This is
            a Charlotte-area expansion, not a relocation, so both markets continue to be supported.
          </p>
        </motion.div>
      </section>

      <section className="px-4 pb-16">
        <motion.div
          initial={baseInitial}
          whileInView={baseAnimate}
          transition={baseTransition(0.25)}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-5xl text-center"
        >
          <h2 className="text-2xl font-semibold">How it works</h2>
          <div className="mt-5 grid gap-4 text-sm text-white/70 sm:grid-cols-3">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={baseInitial}
                whileInView={baseAnimate}
                transition={baseTransition(0.3 + index * 0.08)}
                viewport={{ once: true, amount: 0.3 }}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <p className="text-xs uppercase tracking-[0.3em] text-amber-300">
                  Step {index + 1}
                </p>
                <p className="mt-2 font-semibold text-white">{step.title}</p>
                <p className="mt-2">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="px-4 pb-20">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 22, scale: 0.98 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
          transition={baseTransition(0.2)}
          viewport={{ once: true, amount: 0.3 }}
          className="mx-auto w-full max-w-5xl rounded-2xl border border-amber-400/20 bg-amber-500/10 p-6 text-center"
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
        </motion.div>
      </section>
    </main>
  );
}
