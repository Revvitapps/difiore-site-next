import type { Metadata } from "next";
import ConcordKannapolisLanding from "@/components/charlotte/ConcordKannapolisLanding";
import HomeContactSection from "@/components/HomeContactSection";

const CHARLOTTE_PHONE_DISPLAY = "(980) 946-6791";
const CHARLOTTE_PHONE_LINK = "tel:+19809466791";
const CHARLOTTE_SERVICE_AREA = "Concord, Kannapolis, and the greater Charlotte metro area.";

export const metadata: Metadata = {
  title: "Concord & Kannapolis NC Remodeling | DiFiore Builders",
  description:
    "DiFiore Builders is expanding to the Concord-Kannapolis area with licensed, insured remodeling, roofing, and additions while continuing our PA service.",
  alternates: {
    canonical: "https://difiorebuilders.com/charlotte/concord-kannapolis",
  },
};

export default function ConcordKannapolisLandingPage() {
  return (
    <>
      <ConcordKannapolisLanding />
      <HomeContactSection
        phoneDisplay={CHARLOTTE_PHONE_DISPLAY}
        phoneLink={CHARLOTTE_PHONE_LINK}
        serviceArea={CHARLOTTE_SERVICE_AREA}
      />
    </>
  );
}
