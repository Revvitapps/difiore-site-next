import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import TrustedBadges from "@/components/TrustedBadges";

export const metadata: Metadata = {
  title: "New Builds & General Construction",
  description:
    "From plans to punch list — framing, envelopes, energy-smart assemblies, and full project management.",
  alternates: { canonical: "/services/new-builds-gc" },
};

// Use filenames you know exist in /public:
const HERO = "/difiore-services-showcase-newbuild.jpg";
const GALLERY = [
  "/difiore-services-showcase-newbuild.jpg",
  "/difiore-os-newbuild-after-tr.png",
  // Add or swap with more that exist in /public as you like:
  // "/difiore-services-showcase-newbuild-interior.webp",
  // "/difiore-services-showcase-newbuild-exterior.webp",
];

export default function NewBuildsGCPage() {
  return (
    <>
      {/* HERO: full-bleed image + overlay */}
      <section
        className="relative isolate min-h-[52svh] overflow-hidden"
        aria-label="New Builds & General Construction"
      >
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url('${HERO}')` }}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)]" />
        <div className="mx-auto max-w-6xl px-4 py-16 md:py-24">
          <div className="max-w-2xl">
            <div className="flex flex-wrap gap-2">
              {["Ground-Up", "Structural", "Sitework"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight">
              New Builds &amp; General Construction
            </h1>
            <p className="mt-3 text-[15px] text-white/90">
              From plans to punch list — a streamlined, accountable process covering structure, envelope,
              energy-smart assemblies, and coordination of licensed trades.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/project-calculator"
                className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
              >
                Price My Build
              </Link>
              <Link
                href="/our-projects"
                className="rounded-md border border-white/50 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                See Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* OVERVIEW */}
      <section className="px-4 py-12 md:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.15fr_.85fr]">
          <div>
            <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
              Build right from the ground up
            </h2>
            <div className="prose prose-invert mt-3 max-w-none text-zinc-200">
              <p>
                We manage estimating, permitting, scheduling, inspections, and all site coordination.
                Expect clean staging, clear timelines, and proactive punch-list control.
              </p>
            </div>

            {/* Feature pills */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Foundations, framing & envelopes",
                "Structural steel & engineered lumber",
                "Windows, doors & air sealing",
                "Roofing, siding & exterior trims",
                "MEP coordination & inspections",
                "Energy-smart assemblies & details",
              ].map((f) => (
                <li
                  key={f}
                  className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[14px] text-zinc-100 backdrop-blur"
                >
                  {f}
                </li>
              ))}
            </ul>
          </div>

          {/* Mini gallery */}
          <figure className="grid grid-cols-2 gap-4 self-start">
            {GALLERY.map((src, i) => (
              <div
                key={src + i}
                className="relative h-48 w-full overflow-hidden rounded-xl border border-white/15"
              >
                <Image
                  src={src}
                  alt="New build progress"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={i === 0}
                />
              </div>
            ))}
          </figure>
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (placeholder copy; swap later) */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
            <div className="rvv-surface p-5 md:p-6">
              <div className="flex items-center justify-between">
                <strong className="text-[15px]">Custom Home Client</strong>
                <span className="ml-3 text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="mt-2 text-[15px] text-zinc-100">
                “DiFiore’s team kept our build on schedule and on budget. The envelope is tight,
                inspections passed first time, and the final walk-through was a breeze.”
              </p>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
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

      <TrustedBadges />
    </>
  );
}
