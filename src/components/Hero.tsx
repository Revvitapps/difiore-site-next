'use client';
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { heroBackground } from "@/lib/theme";

export default function Hero() {
  const heroBg = heroBackground;

  return (
    <section
      className="relative isolate min-h-[72svh] md:min-h-[84svh] w-full overflow-hidden"
      aria-label="Hero"
      style={
        {
          "--hero-bg-mobile": heroBg.positions.mobile,
          "--hero-bg-md": heroBg.positions.tablet,
          "--hero-bg-lg": heroBg.positions.desktop,
        } as CSSProperties
      }
    >
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="relative h-full w-full">
          <div className="h-full w-full max-w-full overflow-hidden">
            <Image
              src={heroBg.imageSrc}
              alt="Exterior renovation by DiFiore Builders"
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
            <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-black leading-[1.04] tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.45)]">
              The DiFiore Difference
            </h1>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 sm:mt-8 sm:gap-4">
              <Link
                href="/project-calculator"
                className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
              >
                Project Calculator
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
              href="tel:+16103585433"
              className="mt-4 inline-flex items-center justify-center gap-2 text-[13px] font-semibold uppercase tracking-[0.18em] text-amber-300/90 hover:text-amber-300 sm:mt-5 sm:text-[14px]"
            >
              Call now (610) 358-5433
            </a>
            <p className="mt-4 mx-auto max-w-[680px] text-[16px] font-semibold leading-relaxed text-white/90 sm:text-[18px]">
              Family-owned, licensed &amp; insured general contractor serving Chadds Ford, PA, Glen Mills, West Chester,
              and Wilmington since 2003.
            </p>
            <p className="mt-2 mx-auto max-w-[680px] text-[16px] font-semibold leading-relaxed text-white/80 sm:text-[18px]">
              See what’s possible on your budget in minutes.
            </p>
            <p className="text-[14px] font-medium text-white/70 sm:text-[16px]">
              * Calculator ranges are estimates; final pricing requires an in-person evaluation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
