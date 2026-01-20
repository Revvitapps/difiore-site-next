import Link from "next/link";
import type { Metadata } from "next";
import HeroSection from "@/components/services/HeroSection";

export const metadata: Metadata = {
  title: "Roofing tips for Chadds Ford, PA homeowners: maintenance & when to replace",
  description:
    "Not sure if your roof needs repair or replacement? Discover expert roofing tips, signs of damage, and seasonal maintenance advice from DiFiore Builders.",
  alternates: {
    canonical: "https://difiorebuilders.com/blog/roofing-tips-roof-replacement-chadds-ford",
  },
};

export default function RoofingPost() {
  return (
    <>
      <HeroSection
        title="Roofing maintenance and when to replace"
        subtitle="Protect your home with proactive inspections and honest guidance."
        blurb="Learn the signs of wear, how to handle seasonal maintenance, and when a repair is no longer enough."
        imageSrc="/difiore-services-showcase-3style-roof.png"
        chips={["Asphalt & Metal", "Repairs & Replacements", "Seasonal Checks"]}
      />

      <article className="py-16">
        <div className="mx-auto max-w-5xl px-4">

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">
            Why maintenance matters in Chadds Ford, PA, Glen Mills, West Chester, and Wilmington
          </h2>
          <p>
            Chadds Ford, PA weather brings hot summers, icy winters, and wind-driven storms. Proactive maintenance can
            save thousands by catching small issues before they become structural damage.
          </p>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Prevent water damage in walls and ceilings.</li>
            <li>Avoid mold growth and insulation problems.</li>
            <li>Protect against costly structural repairs.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Seasonal roofing checklist</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Clear gutters and downspouts.</li>
            <li>Look for missing, cracked, or curling shingles.</li>
            <li>Trim overhanging branches to avoid debris.</li>
            <li>Check attic for leaks after storms.</li>
            <li>Inspect flashing around skylights, vents, and chimneys.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">Signs you may need a replacement</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Roof is 20-25 years old or older.</li>
            <li>Shingles are missing, loose, or shedding granules.</li>
            <li>Interior water damage or ceiling stains.</li>
            <li>Moss, algae, or dark streaks across the roof.</li>
            <li>Daylight visible through roof boards in the attic.</li>
          </ul>
        </section>

        <section className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
          <h2 className="text-xl font-semibold text-white">Repair vs. replace guidance</h2>
          <div className="mt-4 grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">Repair makes sense when</h3>
              <ul className="mt-3 space-y-2 pl-5 text-sm text-zinc-300 list-disc">
                <li>Damage is isolated after a storm.</li>
                <li>You have a few missing shingles.</li>
                <li>Leaks are limited to one area.</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <h3 className="text-lg font-semibold text-white">Replacement makes sense when</h3>
              <ul className="mt-3 space-y-2 pl-5 text-sm text-zinc-300 list-disc">
                <li>Roof is older than 15-20 years with visible wear.</li>
                <li>Widespread curling, cracking, or sagging exists.</li>
                <li>Multiple leaks or ventilation failures appear.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">DIY tasks you can do safely</h2>
          <ul className="space-y-2 pl-5 text-sm text-zinc-300 list-disc">
            <li>Clear debris with a leaf blower from the ground.</li>
            <li>Inspect gutters for clogs or granules.</li>
            <li>Check attic for leaks after heavy rain.</li>
            <li>Use binoculars for a visual roof inspection.</li>
          </ul>
        </section>

        <section className="mt-12 space-y-4 text-[15px] leading-relaxed text-zinc-200">
          <h2 className="text-2xl font-semibold text-white">FAQs</h2>
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-white">How long does a new asphalt roof last?</dt>
              <dd className="mt-1 text-zinc-300">Typically 20-25 years depending on material quality and climate.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">How long does a replacement take?</dt>
              <dd className="mt-1 text-zinc-300">Most replacements take 1-3 days depending on roof size and weather.</dd>
            </div>
            <div>
              <dt className="font-semibold text-white">Can DiFiore help with storm damage claims?</dt>
              <dd className="mt-1 text-zinc-300">Yes, the team can document damage and support insurance claims.</dd>
            </div>
          </dl>
        </section>

        <section className="mt-12 text-center text-[15px] leading-relaxed text-zinc-200">
          <p>
            If you are seeing warning signs or want a professional inspection, DiFiore Builders is ready to help with
            honest recommendations and quality workmanship.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href="/services/roofing-siding"
              className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
            >
              View roofing services
            </Link>
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
            >
              Request an inspection
            </Link>
          </div>
        </section>
        </div>
      </article>
    </>
  );
}
