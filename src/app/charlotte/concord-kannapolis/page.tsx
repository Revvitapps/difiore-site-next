import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";

export const metadata: Metadata = {
  title: "Concord & Kannapolis NC Remodeling | DiFiore Builders",
  description:
    "DiFiore Builders is expanding to the Concord-Kannapolis area with licensed, insured remodeling, roofing, and additions while continuing our PA service.",
  alternates: {
    canonical: "https://difiorebuilders.com/charlotte/concord-kannapolis",
  },
};

export default function ConcordKannapolisLandingPage() {
  return <ConcordKannapolisLanding />;
}
