'use client';
import Image from "next/image";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden" aria-label="Hero">
      <div className="pointer-events-none fixed inset-0 -z-20">
        <div className="relative h-full w-full">
          <Image
            src="/difiore-hero-spotlight-house.png"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_30%] md:object-[50%_18%] lg:object-[50%_12%]"
          />
          <div aria-hidden className="absolute inset-0 bg-[rgba(6,12,20,0.32)]" />
        </div>
      </div>

      <div className="absolute top-[7vh] right-[4%] md:right-[3%] lg:right-[5%] z-10 text-right">
        <span className="block max-w-[260px] text-[clamp(16px,3.2vw,28px)] font-semibold leading-snug text-white drop-shadow-[0_4px_16px_rgba(0,0,0,.45)] md:max-w-none md:whitespace-nowrap">
          “Quality work from the foundation to the Roof”
        </span>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="grid min-h-[92svh] place-items-center">
          <div className="w-full translate-y-[7vh] text-center">
            <h1 className="font-serif text-[clamp(40px,6vw,72px)] font-black leading-[1.04] tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,.45)]">
              The DiFiore Difference
            </h1>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/project-calculator"
                className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
              >
                Project Calculator
              </Link>
              <Link
                href="/our-story"
                className="rounded-md border border-white/55 bg-black/20 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>

            <p className="mt-6 mx-auto max-w-[680px] text-[15px] text-white/90">
              Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003.
            </p>
            <p className="mt-2 mx-auto max-w-[680px] text-[15px] text-white/80">
              See what’s possible on your budget in minutes.
            </p>
            <p className="text-[13px] text-white/70">
              * Calculator ranges are estimates; final pricing requires an in-person evaluation.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
