'use client';

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

/* ---------- DATA: your filenames in /public ---------- */
type Band = {
  id: string;
  title: string;
  tagline: string[];
  desc: string;
  features: string[];
  bg: string[];
  ctaPrimary: { href: string; label: string };
  ctaSecondary?: { href: string; label: string };
};

const BANDS: Band[] = [
  {
    id: "roofing-siding",
    title: "Roofing & Siding",
    tagline: ["Asphalt • Metal", "Vinyl • Fiber Cement", "Repairs & Replacements"],
    desc: "Weather-tight systems, clean lines, and long-term performance.",
    features: [
      "Full tear-offs & re-roofs",
      "Premium underlayments & flashing",
      "Color-matched trim & accessories",
    ],
    bg: [
      "/difiore-services-showcase-3style-roof.png",
      "/difiore-services-showcase-roofing-gutter.webp",
    ],
    ctaPrimary: { href: "/project-calculator", label: "Get a Quote" },
    ctaSecondary: { href: "/our-projects", label: "See Projects" },
  },
  {
    id: "additions",
    title: "Additions & Basements",
    tagline: ["Design–Build", "Permit Ready", "Seamless Tie-ins"],
    desc: "New space that looks like it was always part of your home.",
    features: [
      "Primary suites & sunrooms",
      "Garage & dormer expansions",
      "Foundations to finishes",
    ],
    bg: [
      "/difiore-services-showcase-additions-playroom1.JPG",
      "/difiore-services-showcase-additions-familyroom-1.JPG",
      "/difiore-services-showcase-addition-showcase.jpeg",
      "/difiore-services-showcase-decking-pool.jpeg",
    ],
    ctaPrimary: { href: "/project-calculator", label: "Plan My Addition" },
    ctaSecondary: { href: "/our-projects", label: "See Projects" },
  },
  {
    id: "kitchens-renovations",
    title: "Kitchens & Renovations",
    tagline: ["Cabinetry", "Tile & Stone", "Lighting"],
    desc: "Smart layouts, durable materials, and beautiful details.",
    features: [
      "Custom kitchens & baths",
      "Flooring, trim & built-ins",
      "Mechanical & electrical updates",
    ],
    bg: [
      "/difiore-services-showcase-kitchen-whole.webp",
      "/difiore-services-showcase-kitchen-closeup.webp",
    ],
    ctaPrimary: { href: "/project-calculator", label: "Start My Remodel" },
    ctaSecondary: { href: "/our-projects", label: "See Projects" },
  },
  {
    id: "new-builds-gc",
    title: "New Builds & General Construction",
    tagline: ["Ground-Up", "Structural", "Sitework"],
    desc: "From plans to punch list — a streamlined, accountable process.",
    features: [
      "Framing & envelopes",
      "Energy-smart assemblies",
      "Project management & scheduling",
    ],
    bg: [
      "/difiore-services-showcase-roofing-materials-.webp",
      "/difiore-services-showcase-3style-roof.png",
    ],
    ctaPrimary: { href: "/project-calculator", label: "Price My Build" },
    ctaSecondary: { href: "/our-projects", label: "See Projects" },
  },
];

/* ---------- ONE BAND (bottom card; rotating bg; capped height) ---------- */
function ServiceBand({ data }: { data: Band }) {
  const [idx, setIdx] = useState(0);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (data.bg.length < 2) return;
    timer.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % data.bg.length);
    }, 12000);
    return () => {
      if (timer.current) window.clearInterval(timer.current);
    };
  }, [data.bg.length]);

  const nextSrc = useMemo(
    () => (data.bg.length > 1 ? data.bg[(idx + 1) % data.bg.length] : null),
    [data.bg, idx]
  );
  useEffect(() => {
    if (!nextSrc) return;
    const img = new Image();
    img.src = nextSrc;
  }, [nextSrc]);

  const bgSrc = data.bg[idx] ?? data.bg[0] ?? "";

  return (
    <section
      id={data.id}
      className="
        relative isolate overflow-hidden
        flex items-end
        min-h-[52svh] md:min-h-[60svh] lg:min-h-[68svh]
        max-h-[820px]
      "
      aria-label={data.title}
    >
      {/* background */}
      <div
        className="absolute inset-0 -z-10 bg-cover bg-center transition-opacity duration-500"
        style={{ backgroundImage: `url('${bgSrc}')` }}
        aria-hidden
      />
      {/* tint */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.40)]" />

      {/* bottom card */}
      <div className="w-full mx-auto mb-10 md:mb-16 px-4">
        <div
          className="mx-auto w-full max-w-[1800px]
                     rounded-2xl border border-white/15 bg-[rgba(10,20,36,.60)]
                     p-6 md:p-4 shadow-[0_24px_80px_rgba(3,9,20,.55)]"
        >
          {/* tagline chips */}
          <div className="flex flex-wrap justify-center gap-2">
            {data.tagline.map((t) => (
              <span
                key={t}
                className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow"
              >
                {t}
              </span>
            ))}
          </div>

          {/* title */}
          <h3 className="mt-3 text-center font-serif text-[clamp(28px,3.6vw,44px)] font-extrabold leading-tight tracking-tight text-white">
            {data.title}
          </h3>

          {/* subtext */}
          <p className="mt-2 text-center text-[15px] text-white/90">{data.desc}</p>

          {/* feature pills */}
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
            {data.features.map((f) => (
              <div
                key={f}
                className="rounded-full border border-white/30 bg-white/10
                           px-4 py-2 text-center text-[13px] text-zinc-100 backdrop-blur"
              >
                {f}
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link
              href={data.ctaPrimary.href}
              className="rounded-full bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400"
            >
              {data.ctaPrimary.label}
            </Link>
            {data.ctaSecondary && (
              <Link
                href={data.ctaSecondary.href}
                className="rounded-full border border-white/50 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10"
              >
                {data.ctaSecondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- PUBLIC COMPONENT ---------- */
export default function Services() {
  return (
    <section aria-label="Services" className="relative space-y-16 md:space-y-24 pb-24 md:pb-32">
      {BANDS.map((b) => (
        <ServiceBand key={b.id} data={b} />
      ))}
    </section>
  );
}
