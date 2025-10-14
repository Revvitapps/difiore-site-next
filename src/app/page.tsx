import type { Metadata } from "next";
import Hero from "@/components/Hero";
import Pillars from "@/components/Pillars";
import ServiceHero from "@/components/ServiceHero";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Quality work from the foundation to the roof. Additions, renovations, roofing, siding, and new builds.",
  alternates: { canonical: "/" },
};

export default function Page() {
  return (
    <>
      <Hero />
      <Pillars />

      <ServiceHero
        id="roofing-siding"
        title="Roofing & Siding"
        bgUrl="https://images.unsplash.com/photo-1560448075-bb4caa6c8a19?q=80&w=1600&auto=format&fit=crop"
        meta={["Asphalt • Metal", "Vinyl • Fiber Cement", "Repairs & Replacements"]}
        bullets={[
          "Full tear-offs & re-roofs",
          "Premium underlayments & flashing",
          "Color-matched trim & accessories",
        ]}
        primary={{ href: "/project-calculator", label: "Get a Quote" }}
        secondary={{ href: "/past-projects#roofing", label: "See Projects" }}
      />

      <ServiceHero
        id="additions"
        title="Additions"
        bgUrl="https://images.unsplash.com/photo-1505691723518-36a5ac3b2d56?q=80&w=1600&auto=format&fit=crop"
        meta={["Design–Build", "Permit Ready", "Seamless Tie-ins"]}
        bullets={[
          "Primary suites & sunrooms",
          "Garage & dormer expansions",
          "Foundations to finishes",
        ]}
        primary={{ href: "/project-calculator", label: "Plan My Addition" }}
        secondary={{ href: "/past-projects#additions", label: "See Projects" }}
      />

      <ServiceHero
        id="kitchens-renovations"
        title="Kitchens & Renovations"
        bgUrl="https://images.unsplash.com/photo-1501183638710-841dd1904471?q=80&w=1600&auto=format&fit=crop"
        meta={["Cabinetry", "Tile & Stone", "Lighting"]}
        bullets={[
          "Custom kitchens & baths",
          "Flooring, trim & built-ins",
          "Mechanical & electrical updates",
        ]}
        primary={{ href: "/project-calculator", label: "Start My Remodel" }}
        secondary={{ href: "/past-projects#renovations", label: "See Projects" }}
      />
    </>
  );
}
