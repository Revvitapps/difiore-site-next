import type { Metadata } from "next";
import CostGuidePage from "@/components/CostGuidePage";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Basement Finishing Cost in Wilmington, DE | DiFiore Builders",
  description:
    "Plan basement finishing in Wilmington, DE with realistic cost ranges, moisture-control considerations, and scope planning guidance.",
  alternates: {
    canonical: `${SITE_URL}/basement-finishing-cost-wilmington-de`,
  },
};

export default function BasementFinishingCostPage() {
  return (
    <>
      <SeoJsonLd
        data={breadcrumbSchema([
          { name: "Home", path: "/" },
          { name: "Basement Finishing Cost in Wilmington, DE", path: "/basement-finishing-cost-wilmington-de" },
        ])}
      />
      <SeoJsonLd
        data={serviceSchema({
          name: "Basement Finishing Cost Guide",
          description: "Planning-level basement finishing pricing guidance for Wilmington, DE homeowners.",
          path: "/basement-finishing-cost-wilmington-de",
          areaServed: ["Wilmington, DE"],
        })}
      />
      <CostGuidePage
        title="Basement Finishing Cost in Wilmington, DE"
        intro="Finished basement pricing is shaped by moisture management, layout intent, and mechanical coordination. This page gives planning-level cost guidance before formal scope review."
        rangeLabel="$35,000 to $120,000+"
        whatDrivesCost={[
          "Moisture mitigation and insulation approach",
          "Layout complexity, egress strategy, and utility access",
          "Finish quality, built-ins, and custom feature scope",
        ]}
        citySpecificNotes={[
          "Inspection and code requirements for finished lower levels",
          "Moisture history and substrate condition in existing homes",
          "Phasing work around active household use",
        ]}
        relatedServiceUrl="/wilmington-de/basement-finishing"
        relatedServiceLabel="Wilmington basement finishing page"
      />
    </>
  );
}
