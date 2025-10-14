import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Before & After",
  description:
    "See transformations from start to finish — before and after photos of DiFiore Builders projects.",
  alternates: { canonical: "/before-and-after" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Before &amp; After</h1>
      <p className="mt-4">
        A gallery of transformations that highlight practical upgrades and clean
        detailing — inside and out.
      </p>
    </main>
  );
}
