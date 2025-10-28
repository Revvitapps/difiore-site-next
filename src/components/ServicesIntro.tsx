'use client';

import { motion, useReducedMotion } from "framer-motion";

export default function ServicesIntro() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative isolate py-20 text-center text-white">
      <div className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)] pointer-events-none" />
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0, y: 60 }}
        whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
        transition={
          prefersReducedMotion
            ? undefined
            : { duration: 0.9, ease: "easeOut" }
        }
        viewport={{ once: true, amount: 0.3 }}
      >
        <h2 className="font-serif text-[clamp(32px,4vw,60px)] font-extrabold leading-tight tracking-tight">
          Our Services — Built on Experience Since 2003
        </h2>
        <p className="mt-4 text-[17px] max-w-3xl mx-auto opacity-90">
          From roofs to renovations, additions to new builds — we’ve got you covered.
        </p>
      </motion.div>
    </section>
  );
}
