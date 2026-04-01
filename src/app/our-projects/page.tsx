import type { Metadata } from "next";
import Link from "next/link";
import SeoJsonLd from "@/components/SeoJsonLd";
import { SITE_URL } from "@/lib/seo/constants";
import { breadcrumbSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Our Projects | Remodeling and Exterior Work by DiFiore Builders",
  description:
    "Browse featured DiFiore Builders projects across roofing, kitchens, bathrooms, additions, basements, and general construction.",
  alternates: { canonical: `${SITE_URL}/our-projects` },
};

export default function Page() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Our Projects", path: "/our-projects" },
  ]);

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <main className="mx-auto max-w-6xl px-4 py-14 md:py-20">
        <header className="max-w-3xl">
          <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">Our Projects</h1>
          <p className="mt-4 text-base leading-relaxed text-zinc-300">
            Explore recent DiFiore Builders work by service type, then jump into the before-and-after gallery for
            project visuals and scope examples.
          </p>
        </header>

        <section className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            {
              title: "Roofing & Siding Upgrades",
              challenge: "Aging exterior systems with recurring weather-related issues.",
              scope: "Tear-off, envelope details, siding replacement, and trim coordination.",
              result: "Improved weather protection and cleaner curb appeal with one coordinated crew.",
              href: "/services/roofing-siding",
            },
            {
              title: "Kitchen & Bathroom Remodels",
              challenge: "Outdated layouts and low-function spaces.",
              scope: "Design-forward planning, utility upgrades, finishes, and fixture installation.",
              result: "Daily-use spaces that feel modern, functional, and easier to maintain.",
              href: "/services/kitchens-bathrooms",
            },
            {
              title: "Additions & Basement Build-Outs",
              challenge: "Families needing more usable square footage without relocating.",
              scope: "Structural planning, framing, utility integration, and finished interiors.",
              result: "New livable space that blends with the existing home.",
              href: "/services/additions-basements",
            },
            {
              title: "New Builds & General Construction",
              challenge: "Complex schedules, inspections, and trade coordination.",
              scope: "Project management from envelope and framing through final punch list.",
              result: "Clear communication, predictable sequencing, and quality control through completion.",
              href: "/services/new-builds-gc",
            },
          ].map((project) => (
            <article key={project.title} className="rounded-2xl border border-white/10 bg-zinc-900/45 p-6">
              <h2 className="text-xl font-semibold text-white">{project.title}</h2>
              <p className="mt-3 text-sm text-zinc-300">
                <strong className="text-white">Challenge:</strong> {project.challenge}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                <strong className="text-white">Scope:</strong> {project.scope}
              </p>
              <p className="mt-2 text-sm text-zinc-300">
                <strong className="text-white">Result:</strong> {project.result}
              </p>
              <Link
                href={project.href}
                className="mt-5 inline-flex rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-300"
              >
                Related service page
              </Link>
            </article>
          ))}
        </section>

        <div className="mt-10 flex flex-wrap gap-3">
          <Link
            href="/before-and-after"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Open before-and-after gallery
          </Link>
          <Link
            href="/project-calculator"
            className="rounded-full bg-amber-500 px-5 py-2.5 text-sm font-semibold text-zinc-900 hover:bg-amber-400"
          >
            Get project pricing range
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/40 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
          >
            Contact our team
          </Link>
        </div>
      </main>
    </>
  );
}
