'use client';
import { useReveal } from "@/lib/hooks";

const items = [
  { ico: "🛡️", title: "Integrity", blurb: "Honest estimates, transparent communication, workmanship we stand behind." },
  { ico: "💡", title: "Innovation", blurb: "Modern materials & smart detailing that elevate performance and style." },
  { ico: "🏠", title: "Impact", blurb: "Spaces that improve daily life and add lasting value to your home." },
];

export default function Pillars() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="px-4 py-10">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-4 opacity-0 transition-all duration-700 ease-out [transform:translateY(12px)] in:opacity-100 in:[transform:none] md:grid-cols-3"
      >
        {items.map((p) => (
          <article key={p.title} className="rounded-2xl border border-white/10 bg-zinc-900/60 p-5 backdrop-blur">
            <div className="text-2xl">{p.ico}</div>
            <h3 className="mt-2 text-lg font-semibold">{p.title}</h3>
            <p className="mt-1 text-sm text-zinc-300">{p.blurb}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
