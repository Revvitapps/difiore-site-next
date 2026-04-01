import type { Metadata } from "next";
import Link from "next/link";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { CITY_PAGES } from "@/lib/seo/localPages";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Service Areas | DiFiore Builders in PA and DE",
  description:
    "Explore DiFiore Builders service areas across Chadds Ford, Glen Mills, West Chester, and Wilmington, DE for roofing, remodeling, additions, and basement finishing.",
  alternates: {
    canonical: `${SITE_URL}/service-areas`,
  },
};

export default function ServiceAreasPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Service Areas</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Remodeling and Exterior Services Across Southeastern PA and Wilmington, DE
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            DiFiore Builders serves homeowners in Chadds Ford, Glen Mills, West Chester, and Wilmington with
            roofing and siding, kitchen and bath remodeling, additions, basements, and full construction support.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {Object.values(CITY_PAGES).map((city) => (
            <article
              key={city.slug}
              className="rounded-2xl border border-white/10 bg-zinc-900/40 p-6 shadow-[0_18px_50px_rgba(0,0,0,.35)]"
            >
              <h2 className="text-2xl font-semibold text-white">
                {city.name}, {city.stateLabel}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{city.intro}</p>
              <p className="mt-3 text-sm leading-relaxed text-zinc-400">{city.homeownerNeed}</p>
              <Link
                href={`/${city.slug}`}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
              >
                Explore {city.name} services
              </Link>
            </article>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-xl font-semibold text-white">Ready for project pricing?</h2>
          <p className="mt-2 text-sm leading-relaxed text-zinc-300">
            Use the project calculator for a quick planning range, then connect with our team for a scope review and
            next-step recommendations.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href="/project-calculator"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Open Cost Estimator
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Contact DiFiore Builders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
