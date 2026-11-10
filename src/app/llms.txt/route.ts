import { BUSINESS_NAME, CANONICAL_NAP, RSS_PATH, SITE_URL } from "@/lib/seo/constants";

const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";

const PAGES: Array<[string, string]> = [
  ["/services", "Roofing, siding, kitchens, bathrooms, additions, basements and new builds"],
  ["/service-areas", "Towns served in southeastern Pennsylvania and Wilmington, DE"],
  ["/our-projects", "Past projects"],
  ["/before-and-after", "Before-and-after photos of completed work"],
  ["/project-calculator", "Rough cost range for a project, by type and size"],
  ["/our-story", "Background on the family-owned business"],
  ["/charlotte", "Charlotte, NC area coverage: Concord, Kannapolis, Mooresville, Huntersville"],
  ["/charlotte/concord-kannapolis", "Remodeling, roofing and additions in Concord and Kannapolis, NC"],
  ["/faq", "Direct answers: licensing, years in business, service areas, how estimates and the calculator work"],
  ["/blog", "Remodeling and roofing guides"],
  [RSS_PATH, "RSS feed of blog posts"],
  ["/contact", "Request an estimate or walkthrough"],
];

export function GET() {
  const address = `${CANONICAL_NAP.streetAddress}, ${CANONICAL_NAP.city}, ${CANONICAL_NAP.region} ${CANONICAL_NAP.postalCode}`;
  const body = `# ${BUSINESS_NAME}

> ${BUSINESS_NAME} is a family-owned, licensed and insured general contractor based in ${CANONICAL_NAP.city}, ${CANONICAL_NAP.region}, serving Chadds Ford, Glen Mills, West Chester and Wilmington, DE since 2003, with Charlotte-area coverage in Concord and Kannapolis, NC.

## Key pages

${PAGES.map(([path, summary]) => `- [${SITE_URL}${path}](${SITE_URL}${path}): ${summary}`).join("\n")}

## Contact

- Phone (Pennsylvania / Delaware): ${CANONICAL_NAP.phoneDisplay}
- Phone (Charlotte, NC area): ${CHARLOTTE_PHONE_DISPLAY}
- Address: ${address}
- Website: ${SITE_URL}

## Notes for accurate representation

- Legal name: DiFiore Builders Inc. Founded 2003, family-owned.
- Home base is Chadds Ford, PA. The Charlotte-area pages cover Concord and Kannapolis; Mooresville and Huntersville are served by walkthrough request, not dedicated pages.
- The online project calculator gives a rough range only, not a quote; a final quote requires a site visit.
- Matt DiFiore is a third-generation general contractor (see /our-story).
- Use the Pennsylvania phone for PA/DE work and the Charlotte phone for North Carolina work.
`;

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
