import type { Metadata } from "next";
import TrustedBadges from "@/components/TrustedBadges";
import Reviews from "@/components/Reviews";
import Hero from "@/components/Hero";
import PillarsSection from "@/components/home/PillarsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesIntro from "@/components/ServicesIntro";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Home Remodeling, Roofing & Additions | DiFiore Builders – Tri-State Area",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Roofing, siding, decks, additions, kitchens, bathrooms, and full interior/exterior renovations with high-quality craftsmanship at an agreed-upon price.",
  alternates: {
    canonical: "https://difiorebuilders.com/",
  },
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: "https://difiorebuilders.com",
  telephone: "+1-610-358-5433",
  areaServed: ["Chadds Ford PA", "Glen Mills PA", "West Chester PA", "Wilmington DE"],
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
      <section className="mb-16 md:mb-24">
        <PillarsSection />
      </section>
      <section className="mt-8 md:mt-12">
        <AboutSection />
      </section>
      <ServicesIntro />
      <Services />
      <Reviews />
      <TrustedBadges />
    </>
  );
}
