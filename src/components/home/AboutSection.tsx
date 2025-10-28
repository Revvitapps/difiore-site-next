'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section id="about" className="relative z-0 mb-24 px-4 py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
        <motion.div
          initial={
            prefersReducedMotion ? false : { opacity: 0, x: -40, y: 40 }
          }
          whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.9, ease: "easeOut", delay: 0 }
          }
          className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur"
        >
          <span className="inline-block rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
            🏅 In Business Since 2003
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Full-Service General Construction — From Foundation to Roof
          </h2>
          <div className="prose prose-invert mt-4 max-w-none text-zinc-200">
            <p>
              DiFiore Builders Inc. provides quality work from the foundation to the
              roof of your home. We specialize in kitchens, bathrooms, new additions,
              basements, decks, roofing &amp; siding, and more.
            </p>
            <p>
              As a small, local team, you get personal service and attention to detail.
              We’re proud of our reputation as your one-call solution in the Tri-State Area.
              Get in touch for a quote — we’re happy to help.
            </p>
          </div>
        </motion.div>

        <motion.figure
          initial={
            prefersReducedMotion ? false : { opacity: 0, x: 40, y: 40, scale: 0.96 }
          }
          whileInView={
            prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0, scale: 1 }
          }
          viewport={{ once: true, amount: 0.3 }}
          transition={
            prefersReducedMotion
              ? undefined
              : { duration: 0.9, ease: "easeOut", delay: 0.08 }
          }
          className="relative min-h-[240px] overflow-hidden rounded-2xl border border-white/10 sm:min-h-[280px] md:min-h-[320px]"
        >
          <Image
            src="/difiore-leadership-team.jpg"
            alt="DiFiore Builders leadership team"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
            priority={false}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-zinc-950/55 p-3 text-sm text-zinc-200">
            Our leadership team — committed to personal service and quality craftsmanship.
          </figcaption>
        </motion.figure>
      </div>
    </section>
  );
}
