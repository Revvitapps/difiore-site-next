export type CitySlug = "chadds-ford" | "glen-mills" | "west-chester" | "wilmington-de";

export type CityConfig = {
  slug: CitySlug;
  name: string;
  stateLabel: string;
  intro: string;
  homeownerNeed: string;
  neighborhoods: string[];
};

export type LocalServiceSlug =
  | "roofing-siding"
  | "kitchen-remodeling"
  | "bathroom-remodeling"
  | "home-additions"
  | "basement-finishing";

export type LocalServiceConfig = {
  slug: LocalServiceSlug;
  name: string;
  shortDescription: string;
  relatedCorePage: string;
  processHighlights: string[];
  faq: { question: string; answer: string }[];
};

export const CITY_PAGES: Record<CitySlug, CityConfig> = {
  "chadds-ford": {
    slug: "chadds-ford",
    name: "Chadds Ford",
    stateLabel: "PA",
    intro:
      "Chadds Ford homeowners call DiFiore Builders for careful planning, clean job sites, and quality craftsmanship across interior and exterior projects.",
    homeownerNeed:
      "Many homes in Chadds Ford need envelope upgrades, smarter kitchens, and practical additions that preserve curb appeal and resale value.",
    neighborhoods: ["Creek Road corridor", "Route 1 corridor", "Brandywine area"],
  },
  "glen-mills": {
    slug: "glen-mills",
    name: "Glen Mills",
    stateLabel: "PA",
    intro:
      "From family-room expansions to roofing and siding replacements, our Glen Mills clients rely on one accountable GC team from scope through final walkthrough.",
    homeownerNeed:
      "In Glen Mills, common priorities are kitchen modernization, bathroom updates, and weatherproofing upgrades built for long-term ownership.",
    neighborhoods: ["Baltimore Pike corridor", "Concord Township area", "Valleybrook vicinity"],
  },
  "west-chester": {
    slug: "west-chester",
    name: "West Chester",
    stateLabel: "PA",
    intro:
      "DiFiore Builders supports West Chester homeowners with code-ready remodeling and clear communication so projects move forward without surprises.",
    homeownerNeed:
      "West Chester projects often combine layout improvements with structural and exterior updates to improve function, comfort, and property value.",
    neighborhoods: ["Borough-adjacent neighborhoods", "West Goshen area", "Route 3 corridor"],
  },
  "wilmington-de": {
    slug: "wilmington-de",
    name: "Wilmington",
    stateLabel: "DE",
    intro:
      "Wilmington-area homeowners choose DiFiore for practical remodeling plans, reliable schedules, and detail-oriented execution from demo through finish.",
    homeownerNeed:
      "In Wilmington, we frequently help with moisture-prone basements, aging roofs/siding, and kitchen and bath updates with durable finish selections.",
    neighborhoods: ["North Wilmington", "Pike Creek area", "Brandywine Hundred"],
  },
};

export const LOCAL_SERVICES: Record<LocalServiceSlug, LocalServiceConfig> = {
  "roofing-siding": {
    slug: "roofing-siding",
    name: "Roofing and Siding",
    shortDescription:
      "Full tear-offs, flashing and trim details, siding replacement, and weather-tight exterior systems.",
    relatedCorePage: "/services/roofing-siding",
    processHighlights: [
      "Detailed exterior inspection and scope confirmation",
      "Material options matched to budget and long-term durability goals",
      "Clean teardown, install, and final walkthrough with photo documentation",
    ],
    faq: [
      {
        question: "Do you handle both roof and siding in one project?",
        answer:
          "Yes. We can coordinate roofing, siding, trim, and gutter scopes so scheduling and warranties stay aligned.",
      },
      {
        question: "How do you determine repair versus replacement?",
        answer:
          "We inspect decking, flashing, age, and failure patterns, then provide a transparent recommendation with options.",
      },
    ],
  },
  "kitchen-remodeling": {
    slug: "kitchen-remodeling",
    name: "Kitchen Remodeling",
    shortDescription:
      "Layout updates, cabinetry, countertops, tile, lighting, and full kitchen renovation management.",
    relatedCorePage: "/services/kitchens-bathrooms",
    processHighlights: [
      "Workflow-first design planning and finish selection support",
      "Permit and trade coordination for plumbing, electrical, and inspections",
      "Protection plans to keep dust and disruption controlled during construction",
    ],
    faq: [
      {
        question: "Can you help with layout changes and structural updates?",
        answer:
          "Yes. We evaluate structural constraints early and coordinate engineering or permit requirements where needed.",
      },
      {
        question: "Do you provide realistic kitchen cost ranges before site visit?",
        answer:
          "Yes. We provide planning ranges and then refine scope after measurements and material decisions.",
      },
    ],
  },
  "bathroom-remodeling": {
    slug: "bathroom-remodeling",
    name: "Bathroom Remodeling",
    shortDescription:
      "Guest and primary bath remodels with waterproofing, tile, fixture, ventilation, and finish carpentry.",
    relatedCorePage: "/services/kitchens-bathrooms",
    processHighlights: [
      "Moisture-management and waterproofing-first approach",
      "Fixture and finish planning for budget and maintenance goals",
      "Sequenced scheduling to keep jobsite uptime predictable",
    ],
    faq: [
      {
        question: "Do you handle tile shower waterproofing and substrate prep?",
        answer:
          "Yes. We build waterproof systems before tile installation to protect long-term performance.",
      },
      {
        question: "Can you update an outdated bathroom without moving every fixture?",
        answer:
          "Absolutely. We can scope cosmetic updates or full reconfiguration depending on budget and goals.",
      },
    ],
  },
  "home-additions": {
    slug: "home-additions",
    name: "Home Additions",
    shortDescription:
      "First-floor and second-story additions, structural tie-ins, and full design-build expansion planning.",
    relatedCorePage: "/services/additions-basements",
    processHighlights: [
      "Feasibility review for lot, structure, and zoning constraints",
      "Design-build coordination from framing through finished interiors",
      "Schedule and budget checkpoints at every major phase",
    ],
    faq: [
      {
        question: "Can you match the addition exterior to the existing home?",
        answer:
          "Yes. We plan siding, roofing, trim, and proportions so the finished addition blends cleanly.",
      },
      {
        question: "Do additions usually require permits and inspections?",
        answer:
          "Yes. We coordinate the required permit and inspection workflow before and during construction.",
      },
    ],
  },
  "basement-finishing": {
    slug: "basement-finishing",
    name: "Basement Finishing",
    shortDescription:
      "Code-compliant basement build-outs with framing, insulation, egress, lighting, and livable finish work.",
    relatedCorePage: "/services/additions-basements",
    processHighlights: [
      "Moisture and insulation strategy before framing starts",
      "Layout design for living, storage, and utility access",
      "Code-focused egress, electrical, and final finish sequencing",
    ],
    faq: [
      {
        question: "Can you include home office or guest suite features in a finished basement?",
        answer:
          "Yes. We can design finished basements for flexible family use, office space, or guest accommodations.",
      },
      {
        question: "How do you handle basements with prior moisture concerns?",
        answer:
          "We evaluate moisture sources up front and build the scope around mitigation and durable material selections.",
      },
    ],
  },
};

export const CITY_SERVICE_COMBINATIONS: Array<{ city: CitySlug; service: LocalServiceSlug }> = (
  Object.keys(CITY_PAGES) as CitySlug[]
).flatMap((city) =>
  (Object.keys(LOCAL_SERVICES) as LocalServiceSlug[]).map((service) => ({ city, service })),
);

export const COMMERCIAL_INTENT_PAGES = [
  {
    slug: "roof-replacement-cost-chadds-ford-pa",
    title: "Roof Replacement Cost in Chadds Ford, PA",
    city: "Chadds Ford",
    serviceLabel: "Roof replacement",
    range: "$12,000 to $35,000+",
    relatedPage: "/chadds-ford/roofing-siding",
  },
  {
    slug: "kitchen-remodel-cost-chadds-ford-pa",
    title: "Kitchen Remodel Cost in Chadds Ford, PA",
    city: "Chadds Ford",
    serviceLabel: "Kitchen remodeling",
    range: "$25,000 to $95,000+",
    relatedPage: "/chadds-ford/kitchen-remodeling",
  },
  {
    slug: "bathroom-remodel-cost-glen-mills-pa",
    title: "Bathroom Remodel Cost in Glen Mills, PA",
    city: "Glen Mills",
    serviceLabel: "Bathroom remodeling",
    range: "$15,000 to $60,000+",
    relatedPage: "/glen-mills/bathroom-remodeling",
  },
  {
    slug: "home-addition-cost-west-chester-pa",
    title: "Home Addition Cost in West Chester, PA",
    city: "West Chester",
    serviceLabel: "Home additions",
    range: "$80,000 to $350,000+",
    relatedPage: "/west-chester/home-additions",
  },
  {
    slug: "basement-finishing-cost-wilmington-de",
    title: "Basement Finishing Cost in Wilmington, DE",
    city: "Wilmington",
    serviceLabel: "Basement finishing",
    range: "$35,000 to $120,000+",
    relatedPage: "/wilmington-de/basement-finishing",
  },
] as const;
