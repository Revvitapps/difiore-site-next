import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";
import { CITY_PAGES, CITY_SERVICE_COMBINATIONS, COMMERCIAL_INTENT_PAGES } from "@/lib/seo/localPages";

const coreRoutes = [
  "/",
  "/services",
  "/our-projects",
  "/service-areas",
  "/blog",
  "/blog/basement-build-outs-home-additions-chadds-ford",
  "/blog/home-remodeling-diy-vs-pros-chadds-ford",
  "/blog/kitchen-remodeling-chadds-ford-pa",
  "/blog/roofing-tips-roof-replacement-chadds-ford",
  "/before-and-after",
  "/contact",
  "/project-calculator",
  "/our-story",
  "/services/roofing-siding",
  "/services/kitchens-bathrooms",
  "/services/additions-basements",
  "/services/new-builds-gc",
  "/charlotte/concord-kannapolis",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const cityRoutes = Object.keys(CITY_PAGES).map((slug) => `/${slug}`);
  const cityServiceRoutes = CITY_SERVICE_COMBINATIONS.map((entry) => `/${entry.city}/${entry.service}`);
  const commercialRoutes = COMMERCIAL_INTENT_PAGES.map((entry) => `/${entry.slug}`);

  const routes = [...coreRoutes, ...cityRoutes, ...cityServiceRoutes, ...commercialRoutes];

  return routes.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
  }));
}
