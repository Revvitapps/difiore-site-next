import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Roofing & Siding",
  description: "Weather-tight systems, clean lines, and long-term performance.",
  alternates: { canonical: "/services/roofing-siding" },
};

export default function RoofingSidingPage() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-tight">
          Roofing &amp; Siding
        </h1>
        <p className="mt-3 text-zinc-300">
          Full tear-offs &amp; re-roofs • Premium underlayments &amp; flashing • Color-matched trim &amp; accessories
        </p>
        {/* TODO: drop in rotating hero + pills like home section, tuned for this service */}
      </div>
    </section>
  );
}
