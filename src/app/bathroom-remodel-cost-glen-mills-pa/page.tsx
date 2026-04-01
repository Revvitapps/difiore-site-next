import type { Metadata } from "next";
import CostGuidePage from "@/components/CostGuidePage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Bathroom Remodel Cost in Glen Mills, PA | DiFiore Builders",
  description:
    "See planning-level bathroom remodeling cost ranges in Glen Mills, PA and the major factors that influence total investment.",
  alternates: {
    canonical: `${SITE_URL}/bathroom-remodel-cost-glen-mills-pa`,
  },
};

export default function BathroomRemodelCostPage() {
  return (
    <>
      <SeoJsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Bathroom Remodel Cost in Glen Mills, PA", path: "/bathroom-remodel-cost-glen-mills-pa" },
        ])}
      />
      <SeoJsonLd
        data={serviceSchema({
          name: "Bathroom Remodel Cost Guide",
          description: "Planning-level bathroom remodeling pricing guidance for Glen Mills, PA homeowners.",
          path: "/bathroom-remodel-cost-glen-mills-pa",
          areaServed: ["Glen Mills, PA"],
        })}
      />
      <CostGuidePage
        title="Bathroom Remodel Cost in Glen Mills, PA"
        intro="Whether you are updating a hall bath or a primary suite, pricing shifts with waterproofing detail, fixture quality, and layout complexity."
        rangeLabel="$15,000 to $60,000+"
        whatDrivesCost={[
          "Size and type of bathroom (powder, guest, primary suite)",
          "Tile and waterproofing systems",
          "Plumbing/electrical upgrades and finish quality level",
        ]}
        citySpecificNotes={[
          "Permit requirements for utility and ventilation changes",
          "Access constraints and staging in occupied homes",
          "Moisture-control details based on existing conditions",
        ]}
        relatedServiceUrl="/glen-mills/bathroom-remodeling"
        relatedServiceLabel="Glen Mills bathroom remodeling page"
      />
    </>
  );
}
