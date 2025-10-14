import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "Building since 2003 with integrity, craftsmanship, and personal service. Meet the team behind DiFiore Builders.",
  alternates: { canonical: "/our-story" },
};

export default function Page() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-12">
      <h1 className="text-3xl font-semibold">Our Story</h1>
      <p className="mt-4">
        Since 2003, we’ve focused on honest estimates, clear communication, and
        workmanship we stand behind — project after project.
      </p>
    </main>
  );
}
