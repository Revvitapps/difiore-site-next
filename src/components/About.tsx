import Image from 'next/image';

export default function About() {
  return (
    <section className="px-6 md:px-8 py-16">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-8 md:grid-cols-2">
        <div className="rounded-xl border border-white/10 bg-zinc-900/60 p-6">
          <span className="inline-block text-xs tracking-wide text-amber-400">In Business Since 2003</span>
          <h2 className="mt-2 text-2xl font-semibold">Full-Service General Construction</h2>
          <p className="mt-3 text-zinc-300">
            From foundation to roof: additions, kitchens, baths, basements, decks, roofing, siding, and more.
          </p>
        </div>
        <figure className="relative overflow-hidden rounded-xl border border-white/10">
          <Image
            src="/difiore-builders-spotlight-home-hero-2.jpg"
            alt="DiFiore Builders team at work on a home addition."
            fill
            className="object-cover"
            sizes="(min-width: 768px) 520px, 100vw"
            priority={false}
          />
        </figure>
      </div>
    </section>
  );
}
