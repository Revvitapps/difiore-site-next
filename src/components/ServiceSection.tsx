'use client';
import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
  blurb?: string;
  images: string[];
  intervalMs?: number;
  ctaHref?: string;
  ctaLabel?: string;
  flip?: boolean;
};

export default function ServiceSection({
  title,
  blurb,
  images,
  intervalMs = 5200,
  ctaHref,
  ctaLabel = "Learn more",
  flip = false,
}: Props) {
  const safeImages = useMemo(() => images.filter(Boolean), [images]);
  const [idx, setIdx] = useState(0);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (safeImages.length < 2) return;
    timerRef.current && window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % safeImages.length);
    }, intervalMs);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [safeImages, intervalMs]);

  return (
    <section className="py-12 md:py-16">
      <div className={`mx-auto grid max-w-6xl items-center gap-8 px-4 sm:px-6 md:grid-cols-2 ${flip ? "md:[direction:rtl]" : ""}`}>
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/10">
          {safeImages.map((src, i) => (
            <div key={src} className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === idx ? "opacity-100" : "opacity-0"}`}>
              <Image src={src} alt={`${title} image ${i + 1}`} fill className="object-cover" priority={i === 0} />
            </div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
        </div>

        <div className={`rounded-2xl border border-white/10 bg-[rgba(10,18,30,.6)] p-6 backdrop-blur md:p-7 ${flip ? "md:[direction:ltr]" : ""}`}>
          <h3 className="text-2xl font-bold tracking-tight md:text-3xl">{title}</h3>
          {blurb && <p className="mt-3 text-sm text-zinc-200 md:text-[15px]">{blurb}</p>}
          {ctaHref && (
            <div className="mt-5">
              <Link href={ctaHref} className="inline-flex items-center rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-zinc-900 hover:bg-amber-400">
                {ctaLabel}
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
