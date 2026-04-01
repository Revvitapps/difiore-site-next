import type { Metadata } from "next";
import CostGuidePage from "@/components/CostGuidePage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Kitchen Remodel Cost in Chadds Ford, PA | DiFiore Builders",
  description:
    "Explore kitchen remodeling cost ranges in Chadds Ford, PA including cabinetry, layout, and finish-level factors that shape your final budget.",
  alternates: {
    canonical: `${SITE_URL}/kitchen-remodel-cost-chadds-ford-pa`,
  },
};

export default function KitchenRemodelCostPage() {
  return (
    <>
      <SeoJsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Kitchen Remodel Cost in Chadds Ford, PA", path: "/kitchen-remodel-cost-chadds-ford-pa" },
        ])}
      />
      <SeoJsonLd
        data={serviceSchema({
          name: "Kitchen Remodel Cost Guide",
          description: "Planning-level kitchen remodeling pricing guidance for Chadds Ford, PA homeowners.",
          path: "/kitchen-remodel-cost-chadds-ford-pa",
          areaServed: ["Chadds Ford, PA"],
        })}
      />
      <CostGuidePage
        title="Kitchen Remodel Cost in Chadds Ford, PA"
        intro="Kitchen remodel costs depend heavily on layout changes, cabinetry level, appliance package, and finish selections. Use this guide to set a practical planning range."
        rangeLabel="$25,000 to $95,000+"
        whatDrivesCost={[
          "Cabinet type, countertop material, and appliance tier",
          "Structural and utility moves for layout reconfiguration",
          "Tile, lighting, trim, and custom carpentry scope",
        ]}
        citySpecificNotes={[
          "Permit scope and inspection sequence for mechanical updates",
          "Lead times for cabinetry and specialty finish materials",
          "Jobsite protection and phasing in occupied homes",
        ]}
        relatedServiceUrl="/chadds-ford/kitchen-remodeling"
        relatedServiceLabel="Chadds Ford kitchen remodeling page"
      />
    </>
  );
}
