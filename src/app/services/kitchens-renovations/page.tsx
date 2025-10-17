import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kitchens & Renovations",
  description: "Smart layouts, durable materials, and beautiful details.",
  alternates: { canonical: "/services/kitchens-renovations" },
};

export default function KitchensRenovationsPage() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-tight">
          Kitchens &amp; Renovations
        </h1>
        <p className="mt-3 text-zinc-300">
          Custom kitchens &amp; baths • Flooring, trim &amp; built-ins • Mechanical &amp; electrical updates
        </p>
      </div>
    </section>
  );
}
