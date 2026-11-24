import type { Metadata } from "next";
import { BUSINESS_NAME, SITE_URL } from "@/lib/seo/constants";

export const DEFAULT_OG_IMAGE = {
  url: `${SITE_URL}/difiore-hero-spotlight-house.webp`,
  width: 1920,
  height: 1080,
  alt: "DiFiore Builders custom home exterior",
};

function titleText(title: Metadata["title"]): string | undefined {
  if (!title) return undefined;
  if (typeof title === "string") return title;
  if ("absolute" in title && title.absolute) return title.absolute;
  if ("default" in title && title.default) return title.default;
  return undefined;
}

function canonicalUrl(canonical: NonNullable<Metadata["alternates"]>["canonical"]): string | undefined {
  if (!canonical) return undefined;
  if (typeof canonical === "string") return canonical;
  if (canonical instanceof URL) return canonical.toString();
  return canonical.url?.toString();
}

/**
 * Next.js does not derive og:title / og:url from a page's own title and canonical, so without this every
 * page inherits the root layout's Open Graph block. Wrap a page's metadata to give it matching
 * og:title, og:description, og:url and Twitter card tags (with the default share image).
 */
export function withSocialMeta(meta: Metadata): Metadata {
  const title = titleText(meta.title);
  const url = canonicalUrl(meta.alternates?.canonical);
  const description = meta.description ?? undefined;

  return {
    ...meta,
    openGraph: {
      siteName: BUSINESS_NAME,
      locale: "en_US",
      type: "website",
      title,
      description,
      url,
      images: [DEFAULT_OG_IMAGE],
      ...meta.openGraph,
    } as Metadata["openGraph"],
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [DEFAULT_OG_IMAGE.url],
      ...meta.twitter,
    } as Metadata["twitter"],
  };
}
