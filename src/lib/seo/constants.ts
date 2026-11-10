export const SITE_URL = "https://www.difiorebuilders.com";
export const BUSINESS_NAME = "DiFiore Builders";

export const CANONICAL_NAP = {
  phoneDisplay: "(610) 358-5433",
  phoneE164: "+16103585433",
  streetAddress: "20 Whitetail Dr",
  city: "Chadds Ford",
  region: "PA",
  postalCode: "19317",
  country: "US",
};

// JSON-LD node ids. The full GeneralContractor node lives on the homepage; other pages reference it by @id.
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const OWNER_ID = `${SITE_URL}/our-story#matt-difiore`;

// Blog RSS feed. Next.js merges `alternates` shallowly, so any page that sets `canonical`
// drops the root layout's `types`; spread RSS_ALTERNATE into those pages' alternates.
export const RSS_PATH = "/blog/rss.xml";
export const RSS_ALTERNATE = {
  types: {
    "application/rss+xml": [{ url: RSS_PATH, title: "DiFiore Builders Blog" }],
  },
};

/** Absolute URL for a /public asset, with spaces and other unsafe characters encoded. */
export function absoluteAssetUrl(path: string) {
  return `${SITE_URL}${encodeURI(path)}`;
}
