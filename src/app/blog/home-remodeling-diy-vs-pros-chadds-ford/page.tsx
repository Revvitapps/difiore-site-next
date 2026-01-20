import Link from "next/link";
import type { Metadata } from "next";
import HeroSection from "@/components/services/HeroSection";

export const metadata: Metadata = {
  title: "Home remodeling in Chadds Ford, PA: DIY vs. when to call the pros",
  description:
    "Planning a remodel? Discover which home projects you can tackle yourself and when it is time to bring in the experts at DiFiore Builders in Chadds Ford, PA.",
  alternates: {
    canonical: "https://difiorebuilders.com/blog/home-remodeling-diy-vs-pros-chadds-ford",
  },
};

export default function RemodelingPost() {
  return (
    <>
      <HeroSection
        title="Home remodeling: DIY vs. when to call the pros"
        subtitle="Understand the line between quick upgrades and structural work."
        blurb="Know what you can handle yourself and when to bring in a licensed builder to avoid delays, inspections, and rework."
        imageSrc="/difiore-services -addition-newconstruction1.JPG"
        chips={["Whole Home", "Layout Changes", "Permit Ready"]}
      />

      <article className="py-16">
        <div className="mx-auto max-w-5xl px-4">

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Before you DIY, ask yourself</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Do I need a permit for this work?</li>
            <li>Will I touch electrical, plumbing, or structural components?</li>
            <li>Can I finish safely and within a reasonable timeline?</li>
            <li>Will mistakes cost me more later?</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">DIY-friendly upgrades</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Painting walls or cabinets.</li>
            <li>Replacing cabinet hardware or door handles.</li>
            <li>Installing peel-and-stick backsplash.</li>
            <li>Swapping faucets or showerheads.</li>
            <li>Adding shelves, art, or mirrors.</li>
            <li>Installing LVP flooring in small rooms.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Projects that need a pro</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Electrical rewiring or panel upgrades.</li>
            <li>Plumbing reroutes or pipe replacement.</li>
            <li>Structural changes and load-bearing walls.</li>
            <li>Bathroom tile and waterproofing systems.</li>
            <li>HVAC, insulation, or ventilation upgrades.</li>
            <li>Exterior door or window replacements.</li>
          </ul>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
          <h2 className="text-xl font-semibold text-white">What DiFiore Builders brings</h2>
          <ul className="mt-4 space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Full kitchen and bath remodels.</li>
            <li>Basement finishing and additions.</li>
            <li>Lighting design and energy upgrades.</li>
            <li>Permit handling and inspection coordination.</li>
            <li>Clear communication and project management.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Five questions to ask before starting any remodel</h2>
          <ol className="space-y-2 pl-5 text-sm text-zinc-300 list-decimal">
            <li>What is the real goal: function, resale, or lifestyle upgrade?</li>
            <li>What is the budget and contingency plan?</li>
            <li>Do permits or approvals apply?</li>
            <li>Can I finish safely and to code?</li>
            <li>Is my time better spent letting a pro handle it?</li>
          </ol>
        </section>

        <section className="mt-12 space-y-4 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">FAQs</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-white">How much does a remodel cost?</dt>
              <dd className="mt-1 text-zinc-300">Small updates can start under $10k. Full remodels range $30k-$100k+.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">How long does remodeling take?</dt>
              <dd className="mt-1 text-zinc-300">Minor projects are 1-2 weeks. Major renovations are 6-12 weeks.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Will DiFiore help with design ideas?</dt>
              <dd className="mt-1 text-zinc-300">Yes. The team can collaborate with you or your designer.</dd>
            </div>
          </dl>
        </section>

        <section className="mt-12 text-center text-[15px] leading-relaxed text-zinc-200">
          <p>
            DIY wins are great for small upgrades, but when structure, safety, or long-term value are on the line,
            trusted pros are worth it.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/services"
              className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View remodeling services
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
            >
              Schedule a consult
            </Link>
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
