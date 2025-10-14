"use client";
import { useReveal } from "@/lib/hooks";

type Props = {
  id: string;
  title: string;
  bgUrl: string;
  meta: string[];
  bullets: string[];
  primary: { href: string; label: string };
  secondary?: { href: string; label: string };
};

export default function ServiceHero({
  id, title, bgUrl, meta, bullets, primary, secondary
}: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <section id={id} ref={ref} className="relative overflow-hidden">
      {/* background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-cover bg-center opacity-60 transition-opacity duration-700 in:opacity-80"
        style={{ backgroundImage: `url(${bgUrl})` }}
      />
      {/* tint */}
      <div aria-hidden="true" className="absolute inset-0 bg-zinc-900/50" />

      {/* content */}
      <div className="relative mx-auto max-w-6xl px-4 py-16 md:py-24">
        <h3 className="text-center text-3xl font-extrabold tracking-tight drop-shadow md:text-4xl">
          {title}
        </h3>

        {/* meta pills */}
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {meta.map((m) => (
            <span
              key={m}
              className="rounded-full border border-white/20 bg-zinc-900/60 px-3 py-1 text-sm text-zinc-100 backdrop-blur"
            >
              {m}
            </span>
          ))}
        </div>

        <p className="mx-auto mt-6 max-w-3xl text-center text-zinc-200">
          Weather-tight systems, clean lines, and long-term performance.
        </p>

        {/* bullets */}
        <ul className="mx-auto mt-6 flex max-w-4xl flex-wrap justify-center gap-3 text-sm text-zinc-100">
          {bullets.map((b) => (
            <li
              key={b}
              className="rounded-full border border-white/15 bg-zinc-900/60 px-3 py-1 backdrop-blur"
            >
              {b}
            </li>
          ))}
        </ul>

        {/* CTAs */}
        <div className="mt-8 flex justify-center gap-4">
          <a
            href={primary.href}
            className="rounded-md bg-amber-500 px-4 py-2 text-zinc-900 font-medium hover:bg-amber-400"
          >
            {primary.label}
          </a>
          {secondary && (
            <a
              href={secondary.href}
              className="rounded-md border border-white/20 bg-zinc-900/60 px-4 py-2 text-zinc-100 hover:bg-zinc-900/70"
            >
              {secondary.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
