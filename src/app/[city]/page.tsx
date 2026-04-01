import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { CITY_PAGES, CITY_SERVICE_COMBINATIONS, CitySlug, LOCAL_SERVICES } from "@/lib/seo/localPages";
import { breadcrumbSchema, localBusinessSchema } from "@/lib/seo/schema";

type Props = {
  params: { city: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return (Object.keys(CITY_PAGES) as CitySlug[]).map((city) => ({ city }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city } = params;
  const cityConfig = CITY_PAGES[city as CitySlug];
  if (!cityConfig) return {};

  const title = `${cityConfig.name}, ${cityConfig.stateLabel} Home Remodeling and General Contractor`;
  const description = `${cityConfig.name}, ${cityConfig.stateLabel} homeowners trust DiFiore Builders for roofing and siding, kitchen and bath remodeling, additions, and basement finishing with clear scopes and dependable execution.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${cityConfig.slug}`,
    },
  };
}

export default async function CityHubPage({ params }: Props) {
  const { city } = params;
  const cityConfig = CITY_PAGES[city as CitySlug];
  if (!cityConfig) {
    notFound();
  }

  const services = CITY_SERVICE_COMBINATIONS.filter((entry) => entry.city === cityConfig.slug).map(
    (entry) => LOCAL_SERVICES[entry.service],
  );

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: `${cityConfig.name}, ${cityConfig.stateLabel}`, path: `/${cityConfig.slug}` },
  ]);

  const business = localBusinessSchema({
    path: `/${cityConfig.slug}`,
    description: cityConfig.intro,
    areaServed: [`${cityConfig.name}, ${cityConfig.stateLabel}`],
  });

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={business} />
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="max-w-3xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">Local Services</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {cityConfig.name}, {cityConfig.stateLabel} Home Remodeling and Exterior Upgrades
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{cityConfig.intro}</p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">{cityConfig.homeownerNeed}</p>
        </header>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {services.map((service) => (
            <article
              key={service.slug}
              className="rounded-2xl border border-white/10 bg-zinc-900/45 p-6 shadow-[0_16px_45px_rgba(0,0,0,.35)]"
            >
              <h2 className="text-xl font-semibold text-white">
                {service.name} in {cityConfig.name}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.shortDescription}</p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  href={`/${cityConfig.slug}/${service.slug}`}
                  className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
                >
                  View {service.name} page
                </Link>
                <Link
                  href={service.relatedCorePage}
                  className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
                >
                  Core service details
                </Link>
              </div>
            </article>
          ))}
        </div>

        <section className="mt-12 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">
            Where we commonly work in {cityConfig.name}
          </h2>
          <ul className="mt-4 grid gap-2 text-sm text-zinc-300 sm:grid-cols-3">
            {cityConfig.neighborhoods.map((area) => (
              <li key={area} className="rounded-full border border-white/15 bg-white/[0.03] px-4 py-2 text-center">
                {area}
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/project-calculator"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Get pricing range
            </Link>
            <Link
              href="/before-and-after"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              See before-and-after projects
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Talk with our team
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
