import {
  BUSINESS_NAME,
  CANONICAL_NAP,
  ORGANIZATION_ID,
  OWNER_ID,
  SITE_URL,
  absoluteAssetUrl,
} from "@/lib/seo/constants";

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export function breadcrumbSchema(items: BreadcrumbItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${SITE_URL}${item.path}`,
    })),
  };
}

export function serviceSchema(params: {
  name: string;
  description: string;
  path: string;
  areaServed?: string[];
  /** Override for out-of-area lines (e.g. the Charlotte number). Defaults to the PA office. */
  telephone?: string;
  /** Site-relative path of the page's main photo. */
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: `${BUSINESS_NAME} ${params.name}`,
    description: params.description,
    provider: {
      "@type": "GeneralContractor",
      "@id": ORGANIZATION_ID,
      name: BUSINESS_NAME,
      telephone: params.telephone ?? CANONICAL_NAP.phoneE164,
      url: SITE_URL,
    },
    areaServed:
      params.areaServed?.map((area) => ({
        "@type": "City",
        name: area,
      })) ?? undefined,
    url: `${SITE_URL}${params.path}`,
    ...(params.image ? { image: absoluteAssetUrl(params.image) } : {}),
  };
}

export function localBusinessSchema(params: {
  path: string;
  description: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "GeneralContractor",
    name: BUSINESS_NAME,
    url: `${SITE_URL}${params.path}`,
    telephone: CANONICAL_NAP.phoneE164,
    description: params.description,
    address: {
      "@type": "PostalAddress",
      streetAddress: CANONICAL_NAP.streetAddress,
      addressLocality: CANONICAL_NAP.city,
      addressRegion: CANONICAL_NAP.region,
      postalCode: CANONICAL_NAP.postalCode,
      addressCountry: CANONICAL_NAP.country,
    },
    areaServed: params.areaServed,
  };
}

export function articleSchema(params: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  image: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: params.headline,
    description: params.description,
    author: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: BUSINESS_NAME,
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      "@id": ORGANIZATION_ID,
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/difiore-logo.png`,
      },
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    url: `${SITE_URL}${params.path}`,
    mainEntityOfPage: `${SITE_URL}${params.path}`,
    image: absoluteAssetUrl(params.image),
    isPartOf: { "@type": "Blog", "@id": `${SITE_URL}/blog#blog` },
  };
}

export function faqSchema(
  entries: Array<{
    question: string;
    answer: string;
  }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entries.map((entry) => ({
      "@type": "Question",
      name: entry.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: entry.answer,
      },
    })),
  };
}

/**
 * The owner, as named on /our-story ("Matt DiFiore", third-generation general contractor).
 * Only facts stated on the site; no founder/jobTitle claims beyond that.
 */
export function ownerPersonSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": OWNER_ID,
    name: "Matt DiFiore",
    description: "Third-generation general contractor at DiFiore Builders Inc.",
    url: `${SITE_URL}/our-story`,
    worksFor: { "@type": "GeneralContractor", "@id": ORGANIZATION_ID, name: BUSINESS_NAME },
  };
}
