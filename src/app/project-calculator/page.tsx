import type { Metadata } from "next";
import ProjectCalculatorClient from "@/components/ProjectCalculatorClient";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema, serviceSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Project Cost Estimator: Roofing & Remodeling | DiFiore Builders",
  description:
    "Get an instant rough cost range for roofing, siding, decks, kitchens, baths and additions from a local Chadds Ford builder since 2003, not a lead aggregator.",
  alternates: {
    canonical: `${SITE_URL}/project-calculator`,
  },
};

export default function ProjectCalculatorPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Project Cost Estimator", path: "/project-calculator" },
  ]);

  const service = serviceSchema({
    name: "Project Cost Estimator",
    description: "Planning calculator for roofing, remodeling, additions, and basement projects.",
    path: "/project-calculator",
    areaServed: ["Chadds Ford, PA", "Glen Mills, PA", "West Chester, PA", "Wilmington, DE"],
  });

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={service} />
      <ProjectCalculatorClient />
    </>
  );
}
