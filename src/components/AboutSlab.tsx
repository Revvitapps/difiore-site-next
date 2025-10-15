"use client";
import Image from "next/image";
import { useReveal } from "@/lib/hooks";

export default function AboutSlab() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section id="about" className="px-4 py-16 md:py-24">
      <div
        ref={ref}
        className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-[1.2fr_1fr]"
      >
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
              DiFiore Builders Inc. provides quality work from the foundation to
              the roof of your home. We specialize in kitchens, bathrooms, new
              additions, basements, decks, roofing &amp; siding, and more.
            </p>
            <p>
              As a small, local team, you get personal service and attention to
              detail. We’re proud of our reputation as your one-call solution in
              the Tri-State Area. Get in touch for a quote — we’re happy to help.
            </p>
          </div>
        </div>

        {/* photo */}
        <figure className="relative overflow-hidden rounded-2xl border border-white/10">
          <Image
            src="https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/1caf07f0-8ccd-4239-a28b-6fbfef42a7dc.jpg/:/rs=w:1600"
            alt="DiFiore Builders leadership team"
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 520px, 100vw"
            priority={false}
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-zinc-950/55 p-3 text-sm text-zinc-200">
            Our leadership team — committed to personal service and quality craftsmanship.
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
