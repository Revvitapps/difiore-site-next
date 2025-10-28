'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ReactNode } from "react";

export type ServicesHeroSectionProps = {
  title: string;
  subtitle?: string;
  blurb?: string;
  imageSrc: string;
  chips?: string[];
  children?: ReactNode;
};

export default function HeroSection({
  title,
  subtitle,
  blurb,
  imageSrc,
  chips = [],
  children,
}: ServicesHeroSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      className="relative isolate min-h-[52svh] overflow-hidden"
      aria-label={title}
    >
      <div className="absolute inset-0 -z-10">
        <Image
          src={imageSrc}
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority={false}
        />
        <div aria-hidden className="absolute inset-0 bg-[rgba(8,16,28,.45)]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: 32 }}
          whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0 }}
          transition={
            prefersReducedMotion ? undefined : { duration: 0.7, ease: "easeOut" }
          }
          viewport={{ once: true, amount: 0.4 }}
          className="max-w-2xl"
        >
          {chips.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {chips.map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
          )}
          <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-3 text-[15px] text-white/90">{subtitle}</p>
          )}
          {blurb && (
            <p className="mt-2 text-[15px] text-white/80">{blurb}</p>
          )}
          {children}
        </motion.div>
      </div>
    </section>
  );
}
