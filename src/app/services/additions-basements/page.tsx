import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Additions & Basements",
  description: "New space that looks like it was always part of your home.",
  alternates: { canonical: "/services/additions-basements" },
};

export default function AdditionsBasementsPage() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-tight">
          Additions &amp; Basements
        </h1>
        <p className="mt-3 text-zinc-300">
          Primary suites &amp; sunrooms • Garage &amp; dormer expansions • Foundations to finishes
        </p>
      </div>
    </section>
  );
}
