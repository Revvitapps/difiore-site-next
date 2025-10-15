'use client';
import { useReveal } from '@/lib/hooks';

const reviews = [
  { name: 'J. Carter', body: 'From estimate to cleanup, the team was professional and on time. Our new roof looks fantastic.' },
  { name: 'L. Nguyen', body: 'Kitchen remodel turned out even better than the renderings. Great communication throughout.' },
  { name: 'R. Patel', body: 'They handled permits, inspections, and kept the site tidy. Would definitely hire again.' },
];

export default function Reviews() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="px-6 md:px-8 py-16">
      <div className="mx-auto max-w-[1200px]">
        <h2 className="text-2xl font-semibold">What Clients Say</h2>
        <div ref={ref} className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-5 opacity-0 [transform:translateY(18px)] in:opacity-100 in:[transform:none] transition-[transform,opacity] duration-700">
          {reviews.map((r, i) => (
            <blockquote key={i} className="rounded-xl border border-white/10 bg-zinc-900/70 p-5 text-sm text-zinc-200" style={{ transitionDelay: `${i * 90}ms` }}>
              <p>“{r.body}”</p>
              <footer className="mt-3 text-zinc-400">— {r.name}</footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
