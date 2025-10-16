'use client';

export default function AboutSlab() {
  return (
<section id="about" className="relative z-0 px-4 py-16 md:py-24 mb-24 mb-24 mb-24">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]">
        {/* glass panel copy */}
        <div className="rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-2xl backdrop-blur">
          <span className="inline-block rounded-full border border-amber-400/40 bg-amber-500/10 px-3 py-1 text-sm text-amber-300">
            🏅 In Business Since 2003
          </span>
          <h2 className="mt-4 text-3xl font-extrabold tracking-tight md:text-4xl">
            Full-Service General Construction — From Foundation to Roof
          </h2>
          <div className="prose prose-invert mt-4 max-w-none text-zinc-200">
            <p>
              DiFiore Builders Inc. provides quality work from the foundation to the
              roof of your home. We specialize in kitchens, bathrooms, new additions,
              basements, decks, roofing &amp; siding, and more.
            </p>
            <p>
              As a small, local team, you get personal service and attention to detail.
              We’re proud of our reputation as your one-call solution in the Tri-State Area.
              Get in touch for a quote — we’re happy to help.
            </p>
          </div>
        </div>

        {/* photo */}
        <figure className="relative overflow-hidden rounded-2xl border border-white/10">
          <img
            src="/difiore-leadership-team.jpg"
            alt="DiFiore Builders leadership team"
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-zinc-950/55 p-3 text-sm text-zinc-200">
            Our leadership team — committed to personal service and quality craftsmanship.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
