import { BUSINESS_NAME, CANONICAL_NAP, SITE_URL } from "@/lib/seo/constants";

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
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: params.name,
    name: `${BUSINESS_NAME} ${params.name}`,
    description: params.description,
    provider: {
      "@type": "GeneralContractor",
      name: BUSINESS_NAME,
      telephone: CANONICAL_NAP.phoneDisplay,
      url: SITE_URL,
    },
    areaServed:
      params.areaServed?.map((area) => ({
        "@type": "City",
        name: area,
      })) ?? undefined,
    url: `${SITE_URL}${params.path}`,
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
      name: BUSINESS_NAME,
    },
    publisher: {
      "@type": "Organization",
      name: BUSINESS_NAME,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/difiore-logo.png`,
      },
    },
    datePublished: params.datePublished,
    dateModified: params.dateModified,
    mainEntityOfPage: `${SITE_URL}${params.path}`,
    image: `${SITE_URL}${params.image}`,
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
