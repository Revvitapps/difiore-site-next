import type { Metadata } from "next";
import Hero from "@/components/Hero";
import PillarsSection from "@/components/home/PillarsSection";
import AboutSection from "@/components/home/AboutSection";
import ServicesIntro from "@/components/ServicesIntro";
import Services from "@/components/Services";
import HomeContactSection from "@/components/HomeContactSection";
import LazyReviews from "@/components/home/LazyReviews";

export const metadata: Metadata = {
  title: "Home Remodeling, Roofing & Additions | DiFiore Builders | Chadds Ford, PA",
  description:
    "Family-owned, licensed and insured general contractor serving Chadds Ford, PA, Glen Mills, PA, and the surrounding area since 2003. Roofing, siding, decks, additions, kitchens, bathrooms, and full interior/exterior renovations with high-quality craftsmanship at an agreed-upon price.",
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
  areaServed: ["Chadds Ford, PA", "Glen Mills, PA", "Surrounding areas"],
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
      <LazyReviews />
      <HomeContactSection />
    </>
  );
}
