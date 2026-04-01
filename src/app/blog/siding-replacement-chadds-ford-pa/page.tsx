import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import HeroSection from "@/components/services/HeroSection";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { articleSchema, breadcrumbSchema, faqSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Siding replacement in Chadds Ford, PA | DiFiore Builders",
  description:
    "Learn when siding repair is enough, when full replacement makes sense, and what Chadds Ford, PA homeowners should expect from a siding project.",
  alternates: {
    canonical: `${SITE_URL}/blog/siding-replacement-chadds-ford-pa`,
  },
};

export default function SidingReplacementPost() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: "Siding replacement in Chadds Ford, PA", path: "/blog/siding-replacement-chadds-ford-pa" },
  ]);

  const article = articleSchema({
    headline: "Siding replacement in Chadds Ford, PA: signs it is time and what to expect",
    description:
      "Honest guidance on repair vs. replacement, exterior protection, and curb appeal from your local contractor.",
    path: "/blog/siding-replacement-chadds-ford-pa",
    datePublished: "2026-04-01",
    dateModified: "2026-04-01",
    image: "/difiore-os-before-br-front.jpeg",
  });

  const faq = faqSchema([
    {
      question: "How long does siding replacement take?",
      answer:
        "Many siding projects take several days to a couple of weeks depending on the size of the home, the material selected, weather conditions, and whether hidden repairs are uncovered during removal.",
    },
    {
      question: "Can siding be replaced in sections?",
      answer:
        "Sometimes, yes. Sectional replacement can make sense when damage is isolated and matching material is still available, but it becomes harder when the existing siding is faded, brittle, or discontinued.",
    },
    {
      question: "What is the lowest-maintenance siding option?",
      answer:
        "Vinyl is often the lowest-maintenance option for many homeowners, while fiber cement is also durable but usually requires a different installation process and long-term maintenance expectations.",
    },
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={article} />
      <SeoJsonLd data={faq} />
      <HeroSection
        title="Siding replacement in Chadds Ford, PA: signs it is time and what to expect"
        subtitle="Honest guidance on repair vs. replacement, exterior protection, and curb appeal from your local contractor."
        blurb="Siding protects the structure from moisture and weather, but it also affects maintenance, insulation, and appearance. Many homeowners wait too long because the damage starts subtly."
        imageSrc="/difiore-os-before-br-front.jpeg"
        chips={["Vinyl", "Fiber Cement", "Trim", "Moisture Protection"]}
      />

      <article className="py-16">
        <div className="mx-auto max-w-5xl px-4">
          <section className="space-y-5 text-[15px] leading-relaxed text-zinc-200">
            <p>
              In southeastern Pennsylvania, siding does more than improve curb appeal. It helps protect the wall
              assembly from rain, wind, and moisture while giving the home a cleaner, more durable exterior surface.
            </p>
            <p>
              Homeowners in Chadds Ford, Glen Mills, and nearby areas often postpone replacement because the early signs
              are easy to miss. Fading, loose panels, or soft trim details can look cosmetic at first even when the
              larger issue is weather protection.
            </p>
          </section>

          <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
            <h2 className="text-2xl font-semibold text-white">Why siding matters in southeastern Pennsylvania</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Protects against moisture intrusion and weather exposure.</li>
              <li>Helps with efficiency and indoor comfort when the assembly is performing correctly.</li>
              <li>Reduces exterior maintenance compared with older or failing finishes.</li>
              <li>Improves curb appeal and the first impression of the home.</li>
              <li>Supports long-term structure health by protecting sheathing, trim, and wall assemblies.</li>
            </ul>
          </section>

          <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
            <h2 className="text-2xl font-semibold text-white">Signs it may be time to replace your siding</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Cracks, warping, or loose panels that keep coming back.</li>
              <li>Faded or brittle sections that no longer hold up well.</li>
              <li>Repeated repainting needs around trim and exposed areas.</li>
              <li>Soft spots or signs of moisture behind the walls.</li>
              <li>Mold, mildew, or rot near seams, corners, or lower elevations.</li>
              <li>Higher heating and cooling bills tied to a leaky exterior envelope.</li>
              <li>Visible storm damage after wind or hail events.</li>
            </ul>
          </section>

          <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/45">
            <div className="relative h-[260px] w-full md:h-[360px]">
              <Image
                src="/difiore-services-showcase-roofing-gutter.webp"
                alt="Exterior roofing and siding detail by DiFiore Builders"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
            <div className="p-5 text-sm leading-relaxed text-zinc-300">
              Exterior issues often show up first around seams, trim transitions, flashing, and lower wall sections.
            </div>
          </section>

          <section className="mt-12 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200">
            <h2 className="text-xl font-semibold text-white">Repair vs. replace guidance</h2>
            <div className="mt-4 grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Repair makes sense when</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                  <li>Damage is isolated to a small area.</li>
                  <li>Panels are still available to match reasonably well.</li>
                  <li>No moisture issues are present behind the cladding.</li>
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <h3 className="text-lg font-semibold text-white">Replacement makes sense when</h3>
                <ul className="mt-3 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                  <li>Damage is widespread across multiple elevations.</li>
                  <li>Water intrusion is present or strongly suspected.</li>
                  <li>The material is aged, brittle, or hard to match.</li>
                  <li>Multiple sections have already failed over time.</li>
                  <li>Exterior trim and flashing need system-level correction.</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
            <h2 className="text-2xl font-semibold text-white">Popular siding options for local homes</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Vinyl siding for a practical, low-maintenance exterior update.</li>
              <li>Fiber cement for a more rigid, durable cladding option with a different install profile.</li>
              <li>Engineered wood accents for contrast and detail in selected areas.</li>
              <li>Matching soffit, fascia, and trim packages to clean up the full exterior system.</li>
            </ul>
          </section>

          <section className="mt-12 grid gap-6 rounded-3xl border border-white/10 bg-zinc-900/50 p-6 text-[15px] text-zinc-200 md:grid-cols-2">
            <div>
              <h2 className="text-xl font-semibold text-white">What you can handle yourself</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                <li>Visual inspections from the ground after storms.</li>
                <li>Washing light debris off surfaces where safe.</li>
                <li>Checking caulk gaps around trim and penetrations.</li>
                <li>Tracking new damage so you can compare changes over time.</li>
              </ul>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-white">What needs a licensed pro</h2>
              <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-zinc-300">
                <li>Panel replacement at height or near roof lines.</li>
                <li>House wrap and moisture barrier work.</li>
                <li>Flashing corrections around trim, windows, and roof intersections.</li>
                <li>Rot repair in wall assemblies or hidden substrate damage.</li>
                <li>Full exterior replacement and coordinated trim updates.</li>
                <li>Coordination with roofing, gutters, soffit, and fascia.</li>
              </ul>
            </div>
          </section>

          <section className="mt-12 space-y-6 text-[15px] leading-relaxed text-zinc-200">
            <h2 className="text-2xl font-semibold text-white">What to expect during a siding project</h2>
            <ul className="list-disc space-y-2 pl-5 text-sm text-zinc-300">
              <li>Initial site walkthrough and estimate.</li>
              <li>Material and color selection.</li>
              <li>Scheduling and delivery coordination.</li>
              <li>Removal of existing siding and substrate inspection.</li>
              <li>Repairs to sheathing, wrap, trim, or flashing as needed.</li>
              <li>Installation, detail work, cleanup, and final walkthrough.</li>
            </ul>
          </section>

          <section className="mt-10 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/45">
            <div className="relative h-[240px] w-full md:h-[320px]">
              <Image
                src="/difiore-os-before-br-front.jpeg"
                alt="Front exterior project elevation by DiFiore Builders"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 960px"
              />
            </div>
          </section>

          <section className="mt-12 space-y-4 text-[15px] leading-relaxed text-zinc-200">
            <h2 className="text-2xl font-semibold text-white">FAQs</h2>
            <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-white">How long does siding replacement take?</dt>
                <dd className="mt-1 text-zinc-300">
                  It depends on house size, material, weather, and whether hidden repairs are found once the old siding
                  is removed. Simpler homes move faster than complex multi-elevation projects.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">Can siding be replaced in sections?</dt>
                <dd className="mt-1 text-zinc-300">
                  Sometimes. Sectional replacement can work when damage is limited and matching material is still
                  available, but it is less effective when fading, brittleness, or moisture problems are widespread.
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-white">What is the lowest-maintenance siding option?</dt>
                <dd className="mt-1 text-zinc-300">
                  Many homeowners choose vinyl for its low maintenance, while fiber cement is also durable but comes
                  with a different install profile and maintenance tradeoffs.
                </dd>
              </div>
            </dl>
          </section>

          <section className="mt-12 text-center text-[15px] leading-relaxed text-zinc-200">
            <p>
              If your siding is showing wear, DiFiore Builders can help you decide whether a repair or full replacement
              makes the most sense for your home, budget, and timeline.
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Link
                href="/services/roofing-siding"
                className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Explore roofing & siding services
              </Link>
              <Link
                href="/blog/roofing-tips-roof-replacement-chadds-ford"
                className="inline-flex rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                Read the roofing post
              </Link>
              <Link
                href="/contact"
                className="inline-flex rounded-full bg-amber-500 px-6 py-3 text-sm font-semibold text-zinc-900 transition hover:bg-amber-400"
              >
                Schedule a consultation
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
