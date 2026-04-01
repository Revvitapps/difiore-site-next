import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import {
  CITY_PAGES,
  CITY_SERVICE_COMBINATIONS,
  CitySlug,
  LOCAL_SERVICES,
  LocalServiceSlug,
} from "@/lib/seo/localPages";
import { breadcrumbSchema, faqSchema, serviceSchema } from "@/lib/seo/schema";

type Props = {
  params: { city: string; service: string };
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CITY_SERVICE_COMBINATIONS.map((entry) => ({
    city: entry.city,
    service: entry.service,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { city, service } = params;
  const cityConfig = CITY_PAGES[city as CitySlug];
  const serviceConfig = LOCAL_SERVICES[service as LocalServiceSlug];

  if (!cityConfig || !serviceConfig) return {};

  const title = `${serviceConfig.name} in ${cityConfig.name}, ${cityConfig.stateLabel} | DiFiore Builders`;
  const description = `${serviceConfig.name} in ${cityConfig.name}, ${cityConfig.stateLabel}. ${serviceConfig.shortDescription} Request a clear scope, realistic timeline, and transparent pricing from DiFiore Builders.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/${cityConfig.slug}/${serviceConfig.slug}`,
    },
  };
}

export default async function CityServicePage({ params }: Props) {
  const { city, service } = params;
  const cityConfig = CITY_PAGES[city as CitySlug];
  const serviceConfig = LOCAL_SERVICES[service as LocalServiceSlug];

  if (!cityConfig || !serviceConfig) {
    notFound();
  }

  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Service Areas", path: "/service-areas" },
    { name: `${cityConfig.name}, ${cityConfig.stateLabel}`, path: `/${cityConfig.slug}` },
    { name: serviceConfig.name, path: `/${cityConfig.slug}/${serviceConfig.slug}` },
  ]);

  const serviceLd = serviceSchema({
    name: `${serviceConfig.name} in ${cityConfig.name}, ${cityConfig.stateLabel}`,
    description: serviceConfig.shortDescription,
    path: `/${cityConfig.slug}/${serviceConfig.slug}`,
    areaServed: [`${cityConfig.name}, ${cityConfig.stateLabel}`],
  });

  const faqLd = faqSchema(serviceConfig.faq);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={serviceLd} />
      <SeoJsonLd data={faqLd} />
      <section className="mx-auto max-w-6xl px-4 py-16 md:py-20">
        <header className="max-w-4xl">
          <p className="text-sm uppercase tracking-[0.28em] text-amber-300">{cityConfig.name} Service Page</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            {serviceConfig.name} in {cityConfig.name}, {cityConfig.stateLabel}
          </h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">{serviceConfig.shortDescription}</p>
          <p className="mt-3 text-base leading-relaxed text-zinc-400">
            {cityConfig.intro} For {serviceConfig.name.toLowerCase()} projects, we start with scope clarity, document
            assumptions, and keep each milestone visible so homeowners can make confident decisions.
          </p>
        </header>

        <section className="mt-10 grid gap-6 md:grid-cols-3">
          {serviceConfig.processHighlights.map((highlight) => (
            <article key={highlight} className="rounded-2xl border border-white/10 bg-zinc-900/45 p-5">
              <h2 className="text-lg font-semibold text-white">{highlight}</h2>
              <p className="mt-2 text-sm leading-relaxed text-zinc-300">
                Our team applies this step on every {cityConfig.name} scope so timelines, quality standards, and
                homeowner expectations stay aligned.
              </p>
            </article>
          ))}
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-white/[0.04] p-6">
          <h2 className="text-2xl font-semibold text-white">Frequently asked by homeowners in {cityConfig.name}</h2>
          <dl className="mt-4 space-y-4">
            {serviceConfig.faq.map((entry) => (
              <div key={entry.question}>
                <dt className="font-semibold text-white">{entry.question}</dt>
                <dd className="mt-1 text-sm leading-relaxed text-zinc-300">{entry.answer}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section className="mt-10 rounded-2xl border border-white/10 bg-zinc-900/45 p-6">
          <h2 className="text-2xl font-semibold text-white">Related pages</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={serviceConfig.relatedCorePage}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Core {serviceConfig.name} page
            </Link>
            <Link
              href={`/${cityConfig.slug}`}
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              {cityConfig.name} hub
            </Link>
            <Link
              href="/before-and-after"
              className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10"
            >
              Before-and-after gallery
            </Link>
            <Link
              href="/project-calculator"
              className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
            >
              Start with estimator
            </Link>
            <Link
              href="/contact"
              className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              Request consultation
            </Link>
          </div>
        </section>
      </section>
    </>
  );
}
