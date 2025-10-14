'use client';
import Link from "next/link";
import { useParallaxVar } from "@/lib/hooks";

export default function Hero() {
  const parRef = useParallaxVar<HTMLDivElement>(-0.06);

  return (
    <section
      ref={parRef}
      className="relative overflow-hidden"
      style={{ height: "64vh" }}
      aria-label="Hero"
    >
      <div
        className="pointer-events-none absolute inset-0 will-change-transform"
        style={{
          transform: "translateY(var(--bg-par, 0px))",
          backgroundImage:
            "url(https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/1caf07f0-8ccd-4239-a28b-6fbfef42a7dc.jpg/:/rs=w:2000)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "saturate(0.9)",
        }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/60 to-zinc-950/70" aria-hidden="true" />

      <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col items-start justify-center px-4">
        <aside className="mb-2 rounded-full bg-amber-500/90 px-3 py-1 text-xs font-medium text-zinc-900">
          “Quality work from the foundation to the Roof”
        </aside>
        <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
          The DiFiore Difference
        </h1>

        <div className="mt-6 flex gap-3">
          <Link
            href="/project-calculator"
            className="rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Project Calculator
          </Link>
          <Link
            href="/our-story"
            className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/5"
          >
            Our Story
          </Link>
        </div>

        <p className="mt-4 text-sm text-zinc-300">
          See what’s possible on your budget in minutes.
        </p>
        <p className="text-xs text-zinc-400">
          * Calculator ranges are estimates; final pricing requires an in-person evaluation.
        </p>
      </div>
    </section>
  );
}
