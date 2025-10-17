import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "New Builds & General Construction",
  description: "From plans to punch list — a streamlined, accountable process.",
  alternates: { canonical: "/services/new-builds-gc" },
};

export default function NewBuildsGCPage() {
  return (
    <section className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-serif text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-tight">
          New Builds &amp; General Construction
        </h1>
        <p className="mt-3 text-zinc-300">
          Framing &amp; envelopes • Energy-smart assemblies • Project management &amp; scheduling
        </p>
      </div>
    </section>
  );
}
