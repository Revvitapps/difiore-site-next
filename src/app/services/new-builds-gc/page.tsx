import type { Metadata } from "next";
import Link from "next/link";
import TrustedBadges from "@/components/TrustedBadges";
import HeroSection from "@/components/services/HeroSection";
import AnimatedImageGrid from "@/components/services/AnimatedImageGrid";

export const metadata: Metadata = {
  title: "New Builds & General Construction",
  description:
    "From plans to punch list — framing, envelopes, energy-smart assemblies, and full project management.",
  alternates: { canonical: "https://difiorebuilders.com/services/new-builds-gc" },
};

// Use filenames you know exist in /public:
const HERO = "/difiore-services-showcase-newbuild.jpg";
const GALLERY = [
  {
    src: "/difiore-services-showcase-newbuild.jpg",
    alt: "Framing in progress on a new build",
    priority: true,
  },
  {
    src: "/difiore-os-newbuild-after-tr.png",
    alt: "Completed home exterior with finished landscaping",
  },
  {
    src: "/difiore-services -addition-newconstruction1.JPG",
    alt: "Addition framing detail on an active build",
  },
  {
    src: "/difiore-services -basement-newbuild-showcase-studdedwalls.2.JPG",
    alt: "Basement stud walls ready for infrastructure",
  },
];

export default function NewBuildsGCPage() {
  return (
    <>
      <HeroSection
        title="New Builds & General Construction"
        subtitle="From plans to punch list — a streamlined, accountable process covering structure, envelope, energy-smart assemblies, and coordination of licensed trades."
        imageSrc={HERO}
        chips={["Ground-Up", "Structural", "Sitework"]}
      >
        <div className="mt-10 flex flex-wrap justify-center gap-3">
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
      </HeroSection>

      {/* OVERVIEW */}
      <section className="px-4 py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:gap-14 md:grid-cols-[1.15fr_.85fr]">
          <div className="flex flex-col gap-8 md:gap-9">
            <div className="space-y-4 md:space-y-5">
              <h2 className="font-serif text-[clamp(24px,3vw,36px)] font-extrabold tracking-tight">
                Build right from the ground up
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-200">
                <p>
                  We manage estimating, permitting, scheduling, inspections, and all site coordination.
                  Expect clean staging, clear timelines, and proactive punch-list control.
                </p>
              </div>
            </div>

            {/* Feature pills */}
            <ul className="grid gap-3 sm:grid-cols-2">
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

          <AnimatedImageGrid items={GALLERY} />
        </div>
      </section>

      {/* REVIEW HIGHLIGHT (placeholder copy; swap later) */}
      <section className="px-4 pb-16 md:pb-20 mt-16 md:mt-24">
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

          <div className="mt-10 md:mt-12 flex flex-wrap justify-center gap-3">
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
