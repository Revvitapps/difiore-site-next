import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";
import HomeContactSection from "@/components/HomeContactSection";

const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";
const CHARLOTTE_PHONE_LINK = "tel:9809466791";
const CHARLOTTE_SERVICE_AREA = "Concord, Kannapolis, and the greater Charlotte metro area.";
const PAGE_URL = "https://www.difiorebuilders.com/charlotte/concord-kannapolis";
const PAGE_TITLE = "Concord & Kannapolis General Contractor and Home Remodeling | DiFiore Builders";
const PAGE_DESCRIPTION =
  "DiFiore Builders brings proven home remodeling, roofing, additions, and custom home building to Concord and Kannapolis with a local NC team based in Cabarrus County.";
const OG_IMAGE_URL = "https://www.difiorebuilders.com/difiore-services-showcase-newbuild.jpg";

const localFaqs = [
  {
    q: "Do you pull permits for Concord and Kannapolis remodeling projects?",
    a: "Yes. We coordinate permit requirements and inspections for roofing, structural changes, additions, and interior remodels.",
  },
  {
    q: "How quickly can you start kitchen remodeling in Concord, NC?",
    a: "Most projects begin after scope, selections, and permit timing are confirmed. We provide a realistic schedule before work starts.",
  },
  {
    q: "Do you handle roof replacement and roof repairs in Kannapolis?",
    a: "Yes. We handle leak diagnostics, storm-related roof repairs, and full roof replacement with clear scope and cleanup expectations.",
  },
  {
    q: "Can you build home additions in Cabarrus County and nearby towns?",
    a: "Absolutely. We build additions in Concord, Kannapolis, Harrisburg, Landis, China Grove, Midland, and Mount Pleasant.",
  },
  {
    q: "Are you licensed and insured in North Carolina?",
    a: "Yes. DiFiore Builders operates as a licensed and insured general contractor and has been serving homeowners since 2003.",
  },
  {
    q: "Do you offer workmanship and roofing warranty guidance?",
    a: "Yes. We review product warranty options and workmanship expectations during your planning process so you know what is covered.",
  },
];

export function generateMetadata(): Metadata {
  return {
    title: {
      absolute: PAGE_TITLE,
    },
    description: PAGE_DESCRIPTION,
    alternates: {
      canonical: PAGE_URL,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
    openGraph: {
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      url: PAGE_URL,
      siteName: "DiFiore Builders",
      locale: "en_US",
      type: "website",
      images: [
        {
          url: OG_IMAGE_URL,
          width: 1200,
          height: 630,
          alt: "General contractor and home remodeling in Concord and Kannapolis, NC",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: PAGE_TITLE,
      description: PAGE_DESCRIPTION,
      images: [OG_IMAGE_URL],
    },
    icons: {
      icon: "/favicon.ico",
    },
  };
}

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "GeneralContractor",
  name: "DiFiore Builders Inc.",
  url: PAGE_URL,
  telephone: "+1-980-946-6791",
  image: [OG_IMAGE_URL, "https://www.difiorebuilders.com/difiore-hero-spotlight-house.webp"],
  logo: "https://www.difiorebuilders.com/difiore-logo.png",
  foundingDate: "2003",
  description: PAGE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kannapolis",
    addressRegion: "NC",
    addressCountry: "US",
  },
  areaServed: [
    "Kannapolis, NC",
    "Concord, NC",
    "Charlotte Metro, NC",
    "Cabarrus County, NC",
    "Harrisburg, NC",
    "Landis, NC",
    "China Grove, NC",
    "Midland, NC",
    "Mount Pleasant, NC",
  ],
  serviceArea: [
    { "@type": "City", name: "Kannapolis, NC" },
    { "@type": "City", name: "Concord, NC" },
    { "@type": "AdministrativeArea", name: "Cabarrus County, NC" },
    { "@type": "AdministrativeArea", name: "Charlotte Metro, NC" },
  ],
  sameAs: [
    "https://www.facebook.com/Qualityworkfromthefoundationtotheroof/",
    "https://www.instagram.com/difiorebuilders/",
    "https://x.com/DiFioreBuilders",
    "https://www.yelp.com/biz/difiore-builders-chadds-ford-3",
    "https://www.bbb.org/us/pa/chadds-ford/profile/general-contractor/difiore-builders-inc-0241-191952896#accreditation",
    "https://www.houzz.com/professionals/general-contractors/difiore-builders-inc-pfvwus-pf~1479707423",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Concord and Kannapolis Home Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Roof repairs and roof replacement" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Kitchen remodeling" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Whole-house remodeling and renovations" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Custom home building" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Home additions" },
      },
      {
        "@type": "Offer",
        itemOffered: { "@type": "Service", name: "Basement build-outs and basement finishing" },
      },
    ],
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: localFaqs.map((faq) => ({
    "@type": "Question",
    name: faq.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.a,
    },
  })),
};

export default function ConcordKannapolisLandingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <ConcordKannapolisLanding reviewUrl="https://g.page/r/CabSGkj6zxcpEAI/review" />

      <HomeContactSection
        phoneDisplay={CHARLOTTE_PHONE_DISPLAY}
        phoneLink={CHARLOTTE_PHONE_LINK}
        serviceArea={CHARLOTTE_SERVICE_AREA}
        serviceAreasHref="/charlotte"
        serviceAreasLabel="Charlotte service areas"
      />
    </>
  );
}
