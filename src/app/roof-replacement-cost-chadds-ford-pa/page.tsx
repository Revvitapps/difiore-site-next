import type { Metadata } from "next";
import CostGuidePage from "@/components/CostGuidePage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Roof Replacement Cost in Chadds Ford, PA | DiFiore Builders",
  description:
    "Planning roof replacement in Chadds Ford, PA? Review realistic pricing ranges, key cost drivers, and next steps from DiFiore Builders.",
  alternates: {
    canonical: `${SITE_URL}/roof-replacement-cost-chadds-ford-pa`,
  },
};

export default function RoofReplacementCostPage() {
  return (
    <>
      <SeoJsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Roof Replacement Cost in Chadds Ford, PA", path: "/roof-replacement-cost-chadds-ford-pa" },
        ])}
      />
      <SeoJsonLd
        data={serviceSchema({
          name: "Roof Replacement Cost Guide",
          description: "Planning-level roof replacement cost guidance for Chadds Ford, PA homeowners.",
          path: "/roof-replacement-cost-chadds-ford-pa",
          areaServed: ["Chadds Ford, PA"],
        })}
      />
      <CostGuidePage
        title="Roof Replacement Cost in Chadds Ford, PA"
        intro="If your roof is near end-of-life or showing leak-related failures, this guide helps you set a realistic budget before final scope review."
        rangeLabel="$12,000 to $35,000+"
        whatDrivesCost={[
          "Roof size, slope complexity, and tear-off requirements",
          "Flashing, decking replacement, and ventilation upgrades",
          "Material tier, warranty package, and accessory details",
        ]}
        citySpecificNotes={[
          "Permit and inspection requirements in local township jurisdictions",
          "Weather exposure and storm-driven maintenance history",
          "Scheduling and access constraints around occupied homes",
        ]}
        relatedServiceUrl="/chadds-ford/roofing-siding"
        relatedServiceLabel="Chadds Ford roofing and siding service page"
      />
    </>
  );
}
