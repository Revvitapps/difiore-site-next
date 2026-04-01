import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Link from "next/link";
import PillarsSection from "@/components/home/PillarsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesIntro from "@/components/ServicesIntro";
import Services from "@/components/Services";
import HomeContactSection from "@/components/HomeContactSection";
import LazyReviews from "@/components/home/LazyReviews";
import { CANONICAL_NAP, SITE_URL } from "@/lib/seo/constants";

export const metadata: Metadata = {
  title: "Home Remodeling, Roofing and Additions in Chadds Ford, PA | DiFiore Builders",
  description:
    "Family-owned, licensed and insured general contractor serving Chadds Ford, PA, Glen Mills, PA, and the surrounding area since 2003. Roofing, siding, decks, additions, kitchens, bathrooms, and full interior/exterior renovations with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: `${SITE_URL}/`,
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: SITE_URL,
  telephone: CANONICAL_NAP.phoneE164,
  address: {
    "@type": "PostalAddress",
    streetAddress: CANONICAL_NAP.streetAddress,
    addressLocality: CANONICAL_NAP.city,
    addressRegion: CANONICAL_NAP.region,
    postalCode: CANONICAL_NAP.postalCode,
    addressCountry: CANONICAL_NAP.country,
  },
  areaServed: ["Chadds Ford, PA", "Glen Mills, PA", "West Chester, PA", "Wilmington, DE"],
  foundingDate: "2003",
  slogan: "Quality work from the foundation to the roof",
  sameAs: [
    "https://www.yelp.com/biz/difiore-builders-chadds-ford-3",
    "https://nextdoor.com/pages/difiore-builders-inc-claymont-de/"
  ],
};

const localBusinessJson = JSON.stringify(localBusinessJsonLd);

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: localBusinessJson }} />
      <Hero />
      <section className="mt-16 mb-16 md:mt-24 md:mb-24">
        <PillarsSection />
      </section>
      <section className="mt-8 md:mt-12">
        <AboutSection />
      </section>
      <ServicesIntro />
      <Services />
      <section className="mx-auto max-w-6xl px-4 py-16">
        <div className="rounded-2xl border border-white/10 bg-zinc-900/45 p-6 md:p-8">
          <h2 className="text-2xl font-semibold text-white md:text-3xl">Service Areas We Prioritize</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-300">
            We actively serve Chadds Ford, Glen Mills, West Chester, and Wilmington, DE with roofing and siding,
            kitchen and bath remodeling, additions, basement finishing, and general construction.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/service-areas" className="rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300">
              Explore all service areas
            </Link>
            <Link href="/chadds-ford" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Chadds Ford
            </Link>
            <Link href="/glen-mills" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Glen Mills
            </Link>
            <Link href="/west-chester" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              West Chester
            </Link>
            <Link href="/wilmington-de" className="rounded-full border border-white/40 px-4 py-2 text-sm font-semibold text-white hover:bg-white/10">
              Wilmington, DE
            </Link>
          </div>
        </div>
      </section>
      <LazyReviews />
      <HomeContactSection />
    </>
  );
}
