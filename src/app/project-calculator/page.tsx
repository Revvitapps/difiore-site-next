import type { Metadata } from "next";
import ProjectCalculatorClient from "@/components/ProjectCalculatorClient";

export const metadata: Metadata = {
  title: "Project Cost Estimator | Roofing, Additions & Remodels | DiFiore Builders",
  description:
    "Family-owned, licensed and insured general contractor serving the Tri-State Area since 2003. Get an instant rough cost range for roofing, siding, decks, kitchens, bathrooms, and home additions directly from a local builder — not a lead aggregator.",
  alternates: {
    canonical: "https://difiorebuilders.com/project-calculator",
  },
};

export default function ProjectCalculatorPage() {
  return <ProjectCalculatorClient />;
}
