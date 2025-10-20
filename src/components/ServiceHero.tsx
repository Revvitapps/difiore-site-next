'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Props = {
  id: string;
  title: string;
  blurb?: string;
  images: string[];              // e.g. ['/foo.webp', '/bar.jpg']
  cta?: { href: string; label: string };
  meta?: string[];               // small “pills” (optional)
};

export default function ServiceHero({
  id,
  title,
  blurb,
  images,
  cta = { href: '/project-calculator', label: 'Plan My Project' },
  meta = [],
}: Props) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const timerRef = useRef<number | null>(null);

  // Rotate images every 6s (pause on hover / focus)
  useEffect(() => {
    if (paused || images.length <= 1) return;
    timerRef.current = window.setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 6000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
    };
  }, [paused, images.length]);

  return (
    <section
      id={id}
      className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-900/60 shadow-2xl backdrop-blur"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Image stack */}
      <div className="relative h-[320px] w-full sm:h-[420px] md:h-[480px]">
        {images.map((src, i) => (
          <Image
            key={src + i}
            src={src}
            alt={`${title} showcase ${i + 1}`}
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            priority={i === 0}
            className={[
              'absolute inset-0 object-cover transition-opacity duration-700',
              i === idx ? 'opacity-100' : 'opacity-0',
            ].join(' ')}
          />
        ))}

        {/* soft tint so text pops */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/50"
        />
      </div>

      {/* Content card */}
      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
        <div className="mx-auto max-w-5xl rounded-xl bg-[rgba(8,18,34,.78)] p-4 shadow-[0_18px_55px_rgba(3,9,20,.55)] ring-1 ring-white/10">
          {meta.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {meta.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-amber-400/40 bg-amber-100/90 px-3 py-1 text-[12px] font-semibold text-amber-900"
                >
                  {m}
                </span>
              ))}
            </div>
          )}

          <h3 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl">
            {title}
          </h3>

          {blurb && (
            <p className="mt-2 text-[15px] leading-relaxed text-zinc-100/90">
              {blurb}
            </p>
          )}

          <div className="mt-4">
            <Link
              href={cta.href}
              className="inline-block rounded-md bg-amber-500 px-4 py-2 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
            >
              {cta.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}