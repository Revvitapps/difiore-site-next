import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";
import HomeContactSection from "@/components/HomeContactSection";

const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";
const CHARLOTTE_PHONE_LINK = "tel:+19809466791";
const CHARLOTTE_SERVICE_AREA = "Concord, Kannapolis, and the greater Charlotte metro area.";

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
  return (
    <>
      <ConcordKannapolisLanding variant="meta" />
      <HomeContactSection
        phoneDisplay={CHARLOTTE_PHONE_DISPLAY}
        phoneLink={CHARLOTTE_PHONE_LINK}
        serviceArea={CHARLOTTE_SERVICE_AREA}
      />
    </>
  );
}
