import type { Metadata } from "next";
import TrustedBadges from "@/components/TrustedBadges";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export const metadata: Metadata = {
  title: "Kitchens & Bathrooms",
  description:
    "Custom kitchens & bathrooms in the Tri-State area — cabinetry, tile & stone, lighting, plumbing, and full renovations.",
  alternates: { canonical: "/services/kitchens-bathrooms" },
};

/** Gallery images (replace the last two with your bathroom photos) */
const GALLERY = [
  "/difiore-services-showcase-kitchen-whole.webp",
  "/difiore-services-showcase-kitchen-closeup.webp",
  // TODO: replace with two bathroom images when ready:
  "/difiore-services-showcase-kitchen-whole.webp",
  "/difiore-services-showcase-kitchen-closeup.webp",
];

/** Long reviews (swap with the exact text you want later) */
const REVIEWS = [
  {
    name: "Amanda R.",
    rating: 5,
    text:
      "DiFiore Builders completely transformed our kitchen and primary bath. From demo to final walk-through they were organized, on schedule, and incredibly respectful of our home. The new layout makes cooking so much easier, the tile work is flawless, and the crew cleaned up every day. Communication was clear and pricing matched the proposal—no games. We’d hire them again without hesitation.",
  },
  {
    name: "Chris & Taylor M.",
    rating: 5,
    text:
      "We interviewed multiple contractors and chose DiFiore because Matt was honest and detailed from the very first meeting. The team protected floors, kept the site tidy, and coordinated subs like clockwork. Our kitchen cabinetry, stone counters, and lighting came out exactly as designed. Inspections passed the first time and the punch list was small and handled fast. Truly professional experience.",
  },
  {
    name: "J. Donnelly",
    rating: 5,
    text:
      "Our bathroom was taken down to the studs and rebuilt with heated floors, custom shower glass, and stone niches—the workmanship is excellent. We appreciated the daily updates and the fact that every question was answered quickly. The project finished on time, on budget, and the result feels like a boutique hotel. Highly recommend DiFiore Builders.",
  },
];

function Stars({ n }: { n: number }) {
  const s = Math.max(0, Math.min(5, Math.round(n)));
  return <span aria-label={`${s} out of 5 stars`}>{"★".repeat(s)}{"☆".repeat(5 - s)}</span>;
}

/** Lightweight mobile carousel (no libs) */
function MobileCarousel({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    tRef.current = window.setInterval(() => setI(v => (v + 1) % images.length), 6000);
    return () => tRef.current && window.clearInterval(tRef.current);
  }, [images.length]);

  return (
    <div className="sm:hidden relative overflow-hidden rounded-xl border border-white/12">
      <img
        src={images[i]}
        alt="Kitchen & Bathroom project"
        className="w-full h-[58vw] max-h-[420px] object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 w-3 rounded-full ${idx === i ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

export default function KitchensBathroomsPage() {
  const hero = GALLERY[0] ?? "/difiore-services-showcase-kitchen-closeup.webp";

  return (
    <>
      {/* Hero with slim glass card near bottom */}
      <section className="relative isolate min-h-[50svh] overflow-hidden">
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{ backgroundImage: `url('${hero}')` }}
          aria-hidden
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[rgba(8,16,28,.45)]" />
        <div className="mx-auto flex min-h-[50svh] max-w-5xl items-end px-4 pb-10 text-center">
          <div className="w-full rounded-2xl border border-white/15 bg-[rgba(10,20,36,.60)] p-6 shadow-[0_24px_80px_rgba(3,9,20,.55)]">
            <div className="flex flex-wrap justify-center gap-2">
              {["Cabinetry", "Tile & Stone", "Lighting", "Plumbing"].map((t) => (
                <span key={t} className="rounded-full bg-amber-500/95 px-3 py-1 text-[12px] font-semibold text-zinc-900 shadow">
                  {t}
                </span>
              ))}
            </div>
            <h1 className="mt-3 font-serif text-[clamp(30px,4vw,48px)] font-extrabold leading-tight tracking-tight">
              Kitchens &amp; Bathrooms
            </h1>
            <p className="mx-auto mt-2 max-w-3xl text-[15px] text-white/90">
              Smart layouts, durable materials, beautiful details. From full gut-renos to targeted upgrades,
              we handle design coordination, permits, trades, and finishes—start to finish.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <Link href="/project-calculator" className="rounded-full bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 hover:bg-amber-400">
                Get a Quote
              </Link>
              <Link href="/our-projects" className="rounded-full border border-white/50 px-5 py-2.5 text-[15px] font-semibold text-white hover:bg-white/10">
                See Projects
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SEO/geo blurb + mini feature pills */}
      <section className="mx-auto max-w-3xl px-4 py-10 md:py-14 text-center">
        <div className="space-y-6 text-[15px] leading-relaxed text-zinc-200 md:text-[16px]">
          <p>
            Serving Chadds Ford and the surrounding Tri-State Area since 2003, our team delivers
            chef-worthy kitchens and spa-caliber bathrooms with clean job sites and clear communication.
          </p>
          <p className="font-semibold italic">
            From cabinetry and stone to lighting, plumbing, flooring, and ventilation—we manage every phase for you.
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-3">
            {[
              "Custom cabinetry & islands",
              "Quartz & stone surfaces",
              "Tile showers & niches",
              "Flooring & trim",
              "Lighting & ventilation",
              "Plumbing & electrical",
            ].map((f) => (
              <div key={f} className="rounded-full border border-white/30 bg-white/10 px-4 py-2 text-center text-[13px] text-zinc-100 backdrop-blur">
                {f}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery — mobile: carousel; desktop: 4-up */}
      <section className="mx-auto max-w-6xl px-4 pb-12 md:pb-16">
        <MobileCarousel images={GALLERY} />
        <div className="hidden sm:grid gap-4 sm:grid-cols-2 md:grid-cols-4">
          {GALLERY.map((src, i) => (
            <figure key={src + i} className="overflow-hidden rounded-xl border border-white/12">
              <img src={src} alt="Kitchen & Bathroom project" className="h-full w-full object-cover" loading="lazy" decoding="async" />
            </figure>
          ))}
        </div>
      </section>

      {/* Stacked long reviews (bubble style) */}
      <section className="mx-auto max-w-5xl px-4 pb-14 md:pb-16">
        <div className="mb-6 flex items-center justify-center gap-4">
          <span className="h-px w-16 bg-white/25" />
          <h2 className="font-serif text-[clamp(20px,2.6vw,28px)] font-extrabold tracking-tight">Recent Kitchen & Bath Reviews</h2>
          <span className="h-px w-16 bg-white/25" />
        </div>

        <div className="grid gap-4">
          {REVIEWS.slice(0, 3).map((r, i) => (
            <article key={i} className="rvv-bubble border border-[rgba(255,255,255,.14)] rounded-2xl bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)]">
              <div className="rvv-surface p-5">
                <div className="flex items-center justify-between">
                  <strong className="truncate">{r.name}</strong>
                  <span className="ml-3 text-amber-300"><Stars n={r.rating} /></span>
                </div>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-200">{r.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Prefooter badges */}
      <TrustedBadges />
    </>
  );
}
