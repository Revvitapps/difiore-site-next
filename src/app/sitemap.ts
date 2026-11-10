import type { MetadataRoute } from "next";
import { SITE_URL, absoluteAssetUrl } from "@/lib/seo/constants";
import { BLOG_POSTS } from "@/lib/blogPosts";
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
  "/faq",
  "/project-calculator",
  "/our-story",
  "/services/roofing-siding",
  "/services/kitchens-bathrooms",
  "/services/additions-basements",
  "/services/new-builds-gc",
  "/charlotte",
  "/charlotte/concord-kannapolis",
  "/charlotte/roofing",
  "/charlotte/kitchen-remodeling",
  "/philadelphia",
  "/philadelphia/roofing",
  "/philadelphia/kitchen-remodeling",
  "/blog/bathroom-remodeling-chadds-ford-pa",
  "/blog/siding-replacement-chadds-ford-pa",
];

const HERO = "/difiore-hero-spotlight-house.webp";

// Image sitemap: only photos that actually render on each page (heroes, galleries, service showcases).
// Pages without project photos are listed without images.
const PAGE_IMAGES: Record<string, string[]> = {
  "/": [
    HERO,
    "/difiore-leadership-team.jpg",
    "/difiore-services-showcase-3style-roof.webp",
    "/difiore-services-showcase-roofing-gutter.webp",
    "/difiore-services-showcase-roofing-materials-.webp",
    "/difiore-services-showcase-kitchen-whole.webp",
    "/difiore-services-showcase-kitchen-closeup.webp",
    "/difiore-services-showcase-additions-playroom1.webp",
    "/difiore-services-showcase-additions-familyroom-1.webp",
    "/difiore-services-showcase-addition-showcase.jpeg",
    "/difiore-os-after-bl.jpeg",
  ],
  "/services": [
    "/difiore-services-showcase-3style-roof.webp",
    "/difiore-services-showcase-kitchen-whole.webp",
    "/difiore-services-showcase-additions-playroom1.webp",
    "/difiore-services-showcase-newbuild.jpg",
  ],
  "/services/roofing-siding": [
    "/difiore-services-showcase-3style-roof.webp",
    "/difiore-services-showcase-roofing-gutter.webp",
  ],
  "/services/kitchens-bathrooms": [
    "/difiore-services-showcase-kitchen-whole.webp",
    "/difiore-services-kitchen-darkwood-stainless-appoliances.JPG",
  ],
  "/services/additions-basements": [
    "/difiore-services-showcase-additions-playroom1.webp",
    "/difiore-services-showcase-addition-showcase.jpeg",
    "/difiore-services-addition-familyroom.JPG",
    "/difiore-services-additions-secondstory2.jpeg",
  ],
  "/services/new-builds-gc": ["/difiore-services-showcase-newbuild.jpg", "/difiore-os-newbuild-after-tr.png"],
  "/before-and-after": [
    "/difiore-services-showcase-newbuild.jpg",
    "/difiore-os-newbuild-after-tr.png",
    "/difiore-os-before-bl.jpeg",
    "/difiore-os-after-bl.jpeg",
    "/difiore-os-before-br-front.jpeg",
    "/difiore-services-additions-secondstory2.jpeg",
    "/difiore-services-kitchen-darkwood-stainless-appoliances.JPG",
    "/difiore-services-showcase-additions-familyroom-1.webp",
    "/difiore-services-showcase-additions-playroom1.webp",
  ],
  "/our-story": [
    "/difiore-hero-alternate.png",
    "/difiore-os-before-tl.JPG",
    "/difiore-os-after-tl.JPG",
    "/difiore-os-before-bl.jpeg",
    "/difiore-os-after-bl.jpeg",
    "/difiore-os-before-br-front.jpeg",
    "/difiore-services-additions-secondstory2.jpeg",
    "/difiore-services-showcase-newbuild.jpg",
    "/difiore-os-newbuild-after-tr.png",
  ],
  "/blog": BLOG_POSTS.map((post) => post.image),
  "/blog/bathroom-remodeling-chadds-ford-pa": [
    "/difiore-services-showcase-bathroom-shower-walkin-fulltile.JPG",
    "/difiore-services-showcase-bathroom-shower-walkin-fulltile2.JPG",
  ],
  "/blog/siding-replacement-chadds-ford-pa": [
    "/difiore-os-before-br-front.jpeg",
    "/difiore-services-showcase-roofing-gutter.webp",
  ],
  "/charlotte": [HERO],
  "/charlotte/concord-kannapolis": [HERO],
};

// Each blog post's hero photo (posts with extra photos are listed above).
for (const post of BLOG_POSTS) {
  PAGE_IMAGES[`/blog/${post.slug}`] ??= [post.image];
}

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  const cityRoutes = Object.keys(CITY_PAGES).map((slug) => `/${slug}`);
  const cityServiceRoutes = CITY_SERVICE_COMBINATIONS.map((entry) => `/${entry.city}/${entry.service}`);
  const commercialRoutes = COMMERCIAL_INTENT_PAGES.map((entry) => `/${entry.slug}`);

  const routes = [...coreRoutes, ...cityRoutes, ...cityServiceRoutes, ...commercialRoutes];

  return routes.map((route) => {
    const images = PAGE_IMAGES[route]?.map(absoluteAssetUrl);
    return {
      url: `${SITE_URL}${route}`,
      lastModified,
      ...(images?.length ? { images } : {}),
    };
  });
}
