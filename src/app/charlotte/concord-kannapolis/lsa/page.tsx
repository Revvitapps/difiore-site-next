import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";

export const metadata: Metadata = {
  title: "Concord-Kannapolis General Contractor | DiFiore Builders",
  description:
    "Licensed NC contractor for remodeling, roofing, and additions in Concord and Kannapolis.",
  alternates: {
    canonical: "https://difiorebuilders.com/charlotte/concord-kannapolis/lsa",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConcordKannapolisLsaPage() {
  return <ConcordKannapolisLanding variant="lsa" />;
}
