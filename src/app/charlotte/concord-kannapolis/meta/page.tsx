import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";

export const metadata: Metadata = {
  title: "Concord-Kannapolis Remodel Estimate | DiFiore Builders",
  description:
    "Get a quick remodeling estimate from a licensed NC general contractor serving Concord and Kannapolis.",
  alternates: {
    canonical: "https://difiorebuilders.com/charlotte/concord-kannapolis/meta",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default function ConcordKannapolisMetaPage() {
  return <ConcordKannapolisLanding variant="meta" />;
}
