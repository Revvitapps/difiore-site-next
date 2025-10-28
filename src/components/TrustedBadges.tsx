'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export default function TrustedBadges() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section aria-label="Trusted & Verified" className="relative z-10 px-4 py-12 md:py-16">
      <div className="mx-auto max-w-6xl">
        {/* Header with lines */}
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-white/25" />
          <h3 className="font-serif text-[clamp(18px,2.4vw,24px)] font-extrabold tracking-tight text-white">
            Trusted &amp; Verified
          </h3>
          <span className="h-px w-16 bg-white/25" />
        </div>

        {/* White cards (compact) */}
        <div className="grid gap-4 sm:grid-cols-2">
          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 12 }
            }
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0 }}
          >
            {/* BBB */}
            <a
              href="https://www.bbb.org/us/pa/chadds-ford/profile/general-contractor/difiore-builders-inc-0241-191952896#accreditation"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,.08)] transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,.12)]"
              aria-label="View DiFiore Builders on BBB (Accredited Business)"
            >
              <div className="grid grid-cols-[220px_1fr] items-center gap-4">
                <div className="grid place-items-center">
                  <Image
                    src="https://m.bbb.org/terminuscontent/dist/img/business-profile/accreditation/AB-seal-horz.svg?tx=f_svg,w_640"
                    alt="BBB Accredited Business"
                    width={260}
                    height={96}
                    className="h-24 w-auto"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-bold text-zinc-900">
                    BBB Accredited Business
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-zinc-600">
                    A+ Rated • Trusted Since Accreditation
                  </div>
                </div>
              </div>
            </a>
          </motion.div>

          <motion.div
            initial={
              prefersReducedMotion ? false : { opacity: 0, scale: 0.95, y: 12 }
            }
            whileInView={prefersReducedMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.07 }}
          >
            {/* Houzz */}
            <a
              href="https://www.houzz.com/professionals/general-contractors/difiore-builders-inc-pfvwus-pf~1479707423"
              target="_blank"
              rel="noopener noreferrer"
              className="group block rounded-2xl border border-zinc-200 bg-white p-4 shadow-[0_8px_24px_rgba(0,0,0,.08)] transition-all duration-200 will-change-transform hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(0,0,0,.12)]"
              aria-label="View DiFiore Builders on Houzz"
            >
              <div className="grid grid-cols-[220px_1fr] items-center gap-4">
                <div className="grid place-items-center">
                  <Image
                    src="https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/houzz1.png"
                    alt="Houzz"
                    width={200}
                    height={200}
                    className="h-24 w-auto"
                  />
                </div>
                <div className="min-w-0">
                  <div className="text-[15px] font-bold text-zinc-900">
                    Find us on Houzz
                  </div>
                  <div className="mt-1 text-[14px] font-medium text-zinc-600">
                    Project Photos • Reviews • Ideas
                  </div>
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
