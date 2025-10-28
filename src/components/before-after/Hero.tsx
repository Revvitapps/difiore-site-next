'use client';

import type { CSSProperties } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

const chips = ["Kitchens", "Bathrooms", "Additions"];

const leftBlend: CSSProperties = {
  backgroundImage: "url('/difiore-services-showcase-newbuild.jpg')",
  maskImage: "linear-gradient(to right, black 62%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to right, black 62%, transparent 100%)",
};

const rightBlend: CSSProperties = {
  backgroundImage: "url('/difiore-os-newbuild-after-tr.png')",
  maskImage: "linear-gradient(to left, black 62%, transparent 100%)",
  WebkitMaskImage: "linear-gradient(to left, black 62%, transparent 100%)",
};

export default function BeforeAfterHero() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-[70svh] overflow-hidden px-4 py-20 md:py-32"
      aria-label="Before & After"
    >
      <div className="absolute inset-0 -z-10">
        <div
          className="absolute inset-y-0 left-0 w-[60%] md:w-1/2 bg-cover bg-center"
          style={leftBlend}
          aria-hidden
        />
        <div
          className="absolute inset-y-0 right-0 w-[60%] md:w-1/2 bg-cover bg-center"
          style={rightBlend}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 bg-[rgba(8,16,28,.48)]" />
      </div>

      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.4 }}
          className="mx-auto mb-16 max-w-3xl space-y-4 text-center md:mb-24"
        >
          <div className="flex flex-wrap justify-center gap-2">
            {chips.map((chip) => (
              <span
                key={chip}
                className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
              >
                {chip}
              </span>
            ))}
          </div>
          <h1 className="text-[clamp(32px,5vw,56px)] font-serif font-extrabold tracking-tight text-white">
            Before &amp; After
          </h1>
          <p className="text-[15px] text-white/90">
            Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
          </p>
          <p className="text-[15px] leading-relaxed text-white/80">
            Real renovations from kitchens to patios — see what makes DiFiore Builders trusted by families across the region.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-3">
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
  );
}
