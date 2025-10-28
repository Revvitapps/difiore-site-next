'use client';

import { motion, useReducedMotion } from "framer-motion";

type Pillar = {
  ico: string;
  title: string;
  blurb: string;
};

const pillars: Pillar[] = [
  {
    ico: "🛡️",
    title: "Integrity",
    blurb: "Honest estimates, transparent communication, workmanship we stand behind.",
  },
  {
    ico: "💡",
    title: "Innovation",
    blurb: "Modern materials & smart detailing that elevate performance and style.",
  },
  {
    ico: "🏠",
    title: "Impact",
    blurb: "Spaces that improve daily life and add lasting value to your home.",
  },
];

const configs = [
  { initial: { opacity: 0, x: -120, y: 60 }, delay: 0 },
  { initial: { opacity: 0, y: 80 }, delay: 0.12 },
  { initial: { opacity: 0, x: 120, y: 60 }, delay: 0.24 },
];

export default function PillarsSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-6 pt-8 pb-12 md:px-8">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-3">
        {pillars.map((pillar, index) => {
          const config = configs[index] ?? configs[0];

          return (
            <motion.article
              key={pillar.title}
              initial={prefersReducedMotion ? false : config.initial}
              whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={
                prefersReducedMotion
                  ? undefined
                  : { duration: 1, ease: "easeOut", delay: config.delay }
              }
              className="rounded-xl border border-white/12 bg-[linear-gradient(180deg,rgba(14,22,34,.86),rgba(10,18,30,.78))] p-4 shadow-[0_10px_28px_rgba(0,0,0,.25)] backdrop-blur-sm transition-[transform,opacity] duration-700 ease-out sm:p-5"
            >
              <div className="flex items-start gap-3.5">
                <span className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-[20px]">
                  <span className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_30%_30%,#ffe6a6_0%,#ffc843_55%,#f39b00_78%,#965b00_100%)] shadow-[inset_0_2px_6px_rgba(255,255,255,.35),0_10px_22px_rgba(0,0,0,.35)]" />
                  <span className="relative select-none leading-none">{pillar.ico}</span>
                </span>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">
                    {pillar.title}
                  </h3>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-200/90">
                    {pillar.blurb}
                  </p>
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}
