'use client';
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative isolate min-h-[92svh] w-full overflow-hidden" aria-label="Hero">
      {/* Fixed background image so the page scrolls over it */}
      <div
        className="fixed inset-0 -z-10 bg-fixed bg-cover bg-center pointer-events-none"
        style={{
          backgroundImage: "url('/difiore-hero-spotlight-house.png')",
          // push composition DOWN a bit so the crest “sits” in the sky
          backgroundPosition: "50% 12%",
        }}
        aria-hidden
      />

      {/* Quote in the sky, white, larger, no pill */}
<div className="absolute top-[8vh] right-[3%] md:right-[2%] lg:right-[5%] z-10">
  <span className="block text-white text-[clamp(18px,2.2vw,28px)] font-semibold drop-shadow-[0_4px_16px_rgba(0,0,0,.45)] whitespace-nowrap">
    “Quality work from the foundation to the Roof”
  </span>
</div>

      {/* === Centered content (headline + buttons + tiny notes) === */}
      <div className="relative z-10 mx-auto max-w-[1200px] px-6 md:px-8">
        <div className="min-h-[92svh] grid place-items-center">
          <div className="w-full text-center translate-y-[7vh]">
            <h1 className="font-serif text-white text-[clamp(40px,6vw,72px)] font-black leading-[1.04] tracking-tight drop-shadow-[0_3px_12px_rgba(0,0,0,.45)]">
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
                className="rounded-md border border-white/55 bg-transparent px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                Our Story
              </Link>
            </div>

            <p className="mt-6 mx-auto max-w-[680px] text-[15px] text-white/90">
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
