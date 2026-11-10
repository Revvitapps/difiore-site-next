// Single list of blog posts: drives the /blog index, /blog/rss.xml and the sitemap images.
// Dates mirror each post's BlogPosting schema (datePublished / dateModified).
export type BlogPost = {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  image: string;
  datePublished: string;
  dateModified: string;
};

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "basement-build-outs-home-additions-chadds-ford",
    title: "Basement build-outs & home additions in Chadds Ford, PA",
    summary:
      "What you can tackle yourself, what needs a pro, and how to plan a basement or addition that feels built-in from day one.",
    tag: "Basements & additions",
    image: "/difiore-services-showcase-additions-playroom1.webp",
    datePublished: "2025-12-20",
    dateModified: "2026-03-11",
  },
  {
    slug: "kitchen-remodeling-chadds-ford-pa",
    title: "Kitchen remodeling trends & tips for 2026",
    summary:
      "Design ideas, layout advice, and smart planning tips from DiFiore Builders for Chadds Ford, PA kitchens that live well.",
    tag: "Kitchen remodeling",
    image: "/difiore-services-showcase-kitchen-whole.webp",
    datePublished: "2026-01-04",
    dateModified: "2026-03-11",
  },
  {
    slug: "roofing-tips-roof-replacement-chadds-ford",
    title: "Roofing maintenance and when to replace",
    summary:
      "Seasonal checklists, warning signs, and honest guidance on whether your roof needs a repair or full replacement.",
    tag: "Roofing",
    image: "/difiore-services-showcase-3style-roof.webp",
    datePublished: "2025-12-28",
    dateModified: "2026-03-11",
  },
  {
    slug: "bathroom-remodeling-chadds-ford-pa",
    title: "Bathroom remodeling in Chadds Ford, PA: what to upgrade first",
    summary:
      "Smart guidance on what to prioritize first, what you can handle yourself, and which bathroom upgrades matter most long-term.",
    tag: "Kitchens & bathrooms",
    image: "/difiore-services-showcase-bathroom-shower-walkin-fulltile.JPG",
    datePublished: "2026-04-01",
    dateModified: "2026-04-01",
  },
  {
    slug: "siding-replacement-chadds-ford-pa",
    title: "Siding replacement in Chadds Ford, PA: signs it is time and what to expect",
    summary:
      "Learn when repair is enough, when replacement makes more sense, and what to expect during a siding project in southeastern Pennsylvania.",
    tag: "Roofing & siding",
    image: "/difiore-os-before-br-front.jpeg",
    datePublished: "2026-04-01",
    dateModified: "2026-04-01",
  },
  {
    slug: "home-remodeling-diy-vs-pros-chadds-ford",
    title: "Home remodeling: DIY vs. when to call the pros",
    summary:
      "A clear look at what you can handle yourself and when it is time to bring in a licensed local contractor.",
    tag: "Remodeling",
    image: "/difiore-services -addition-newconstruction1.JPG",
    datePublished: "2026-01-02",
    dateModified: "2026-03-11",
  },
];
