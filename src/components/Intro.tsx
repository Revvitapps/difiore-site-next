import Image from "next/image";

export default function Intro() {
  return (
    <section className="relative z-10 px-4 md:px-6 pb-16">
      {/* items-stretch makes both columns equal height */}
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 lg:grid-cols-12 items-stretch gap-6">
        {/* Left card — make it h-full and flex so content fits nicely */}
        <div className="lg:col-span-6">
          <div className="h-full rounded-3xl border border-white/10 bg-zinc-900/22 p-6 md:p-8 shadow-[0_8px_40px_rgba(0,0,0,.35)] flex flex-col">
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-4 py-1 text-[13px] font-semibold text-amber-900 shadow-sm">
              <span>🏅</span> In Business Since 2003
            </span>

            <h2 className="mt-4 font-serif text-white text-[clamp(26px,3.2vw,44px)] font-extrabold leading-tight drop-shadow-[0_3px_12px_rgba(0,0,0,.35)]">
              Full-Service General
              <br /> Construction — From
              <br /> Foundation to Roof
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
              A full-service general construction company established in 2003, DiFiore Builders Inc.
              provides quality work from the foundation to the roof of your home. With years of
              experience to rely on, we specialize in all aspects of building and remodeling — kitchens,
              bathrooms, new additions, basements, decks, roofing and siding, and more.
            </p>

            <p className="mt-3 text-[15px] leading-relaxed text-zinc-200">
              Being a small, local team, you can expect nothing less than personalized care and
              attention to detail. We’re proud of our longstanding reputation as your one-call solution
              here in the Tri-State Area. Get in touch anytime for a quote — we’re always happy to help.
            </p>

            {/* add a tiny spacer so the card feels balanced if copy is short */}
            <div className="mt-auto" />
          </div>
        </div>

        {/* Right image — fill the full height of the row */}
        <div className="lg:col-span-6">
          <div className="relative h-full overflow-hidden rounded-3xl shadow-[0_12px_50px_rgba(0,0,0,.45)]">
            <Image
              src="/difiore-leadership-team.jpg"                             /* change file if you want a different one */
              alt="Our leadership team — committed to personal service and quality craftsmanship."
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 600px, 100vw"
              priority={false}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-zinc-900/65 text-zinc-50 text-sm md:text-[15px] px-4 py-2">
              <strong>Our leadership team</strong> — committed to personal service and quality craftsmanship.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
