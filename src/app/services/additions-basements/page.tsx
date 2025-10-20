import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";

export const metadata: Metadata = {
  title: "Additions & Basements",
  description:
    "Primary suites, sunrooms, dormers, garages, basements — new space that feels original to your home.",
  alternates: { canonical: "/services/additions-basements" },
};

const HERO = "/difiore-services-showcase-additions-playroom1.JPG";

export default function AdditionsBasementsPage() {
  return (
    <>
      {/* HERO: full-bleed image + overlay */}
      <section
        className="relative isolate min-h-[52svh] overflow-hidden"
        aria-label="Additions & Basements"
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
              {["Design–Build", "Permit Ready", "Seamless Tie-ins"].map((chip) => (
                <span
                  key={chip}
                  className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
                >
                  {chip}
                </span>
              ))}
            </div>
            <h1 className="mt-4 font-serif text-[clamp(32px,4.2vw,56px)] font-extrabold leading-tight tracking-tight">
              Additions &amp; Basements
            </h1>
            <p className="mt-3 text-[15px] text-white/90">
              New space that looks like it was always part of your home — from suites and sunrooms
              to dormers, garages, and fully finished basements.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/project-calculator"
                className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
              >
                Plan My Addition
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
              Seamless expansions, inside and out
            </h2>
            <div className="prose prose-invert mt-3 max-w-none text-zinc-200">
              <p>
                We handle design coordination, permitting, structural work, utilities, and finishes —
                with clean job sites and clear communication at every step.
              </p>
            </div>

            {/* Feature pills */}
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Primary suites & sunrooms",
                "Garage & dormer expansions",
                "Basement build-outs",
                "Foundations, framing & envelopes",
                "Insulation & energy-smart assemblies",
                "Trim, paint & finish carpentry",
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
            <img
              src="/difiore-services-showcase-additions-playroom1.JPG"
              alt="Family room addition"
              className="h-48 w-full rounded-xl object-cover border border-white/15"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/difiore-services-showcase-additions-familyroom-1.JPG"
              alt="Open living expansion"
              className="h-48 w-full rounded-xl object-cover border border-white/15"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/difiore-services-showcase-addition-showcase.jpeg"
              alt="Exterior addition tie-in"
              className="h-48 w-full rounded-xl object-cover border border-white/15"
              loading="lazy"
              decoding="async"
            />
            <img
              src="/difiore-services-showcase-decking-pool.jpeg"
              alt="Decking and outdoor space"
              className="h-48 w-full rounded-xl object-cover border border-white/15"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (swap text later if you want) */}
      <section className="px-4 pb-12 md:pb-16">
        <div className="mx-auto max-w-6xl">
          <div className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
            <div className="rvv-surface p-5 md:p-6">
              <div className="flex items-center justify-between">
                <strong className="text-[15px]">Homeowner in Chadds Ford</strong>
                <span className="ml-3 text-amber-300" aria-label="5 out of 5 stars">★★★★★</span>
              </div>
              <p className="mt-2 text-[15px] text-zinc-100">
                “Our addition looks like it was always part of the house. DiFiore handled permits,
                structural work, and finishes professionally — on schedule and with great communication.”
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
