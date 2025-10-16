import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import AboutSlab from "@/components/AboutSlab";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "Home",
  description: "Quality work from the foundation to the roof.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Hero />
      <Pillars />
      <AboutSlab />
      <Services />
    </>
  );
}