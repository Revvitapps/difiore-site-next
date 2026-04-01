import type { Metadata } from "next";
import CostGuidePage from "@/components/CostGuidePage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Home Addition Cost in West Chester, PA | DiFiore Builders",
  description:
    "Review realistic home addition cost ranges in West Chester, PA, including structural, permit, and finish-level factors.",
  alternates: {
    canonical: `${SITE_URL}/home-addition-cost-west-chester-pa`,
  },
};

export default function HomeAdditionCostPage() {
  return (
    <>
      <SeoJsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Home Addition Cost in West Chester, PA", path: "/home-addition-cost-west-chester-pa" },
        ])}
      />
      <SeoJsonLd
        data={serviceSchema({
          name: "Home Addition Cost Guide",
          description: "Planning-level home addition pricing guidance for West Chester, PA homeowners.",
          path: "/home-addition-cost-west-chester-pa",
          areaServed: ["West Chester, PA"],
        })}
      />
      <CostGuidePage
        title="Home Addition Cost in West Chester, PA"
        intro="Additions involve structural planning, permitting, and major trade coordination. This guide helps establish a realistic pre-design budget target."
        rangeLabel="$80,000 to $350,000+"
        whatDrivesCost={[
          "Addition footprint, structural tie-ins, and foundation scope",
          "MEP extensions and utility service upgrades",
          "Exterior and interior finish level plus site logistics",
        ]}
        citySpecificNotes={[
          "Municipal permit and review timelines",
          "Existing home conditions discovered during structural work",
          "Material and lead-time dependencies for larger scopes",
        ]}
        relatedServiceUrl="/west-chester/home-additions"
        relatedServiceLabel="West Chester home additions page"
      />
    </>
  );
}
