const DEFAULT_GA4_ID = "G-364C0XZKH3";

export const ANALYTICS_CONFIG = {
  metaPixelId: process.env.NEXT_PUBLIC_META_PIXEL_ID || "",
  // Fallback keeps current GA4 tracking until env vars are set per site.
  ga4MeasurementId:
    process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID ||
    process.env.NEXT_PUBLIC_GA_ID ||
    DEFAULT_GA4_ID,
};
