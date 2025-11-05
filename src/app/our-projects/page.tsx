import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Projects",
  description:
    "Explore a selection of completed additions, renovations, roofing, siding, and new builds from DiFiore Builders.",
  alternates: { canonical: "https://difiorebuilders.com/our-projects" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Our Projects</h1>
      <p className="mt-4">
        A look at recent work across additions, kitchens, exterior upgrades, and
        ground-up builds.
      </p>
    </main>
  );
}
