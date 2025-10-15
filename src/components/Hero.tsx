'use client';
import Image from 'next/image';
import Link from 'next/link';
import { useParallaxVar, useReveal } from '@/lib/hooks';
import { pillars } from './Pillars';

export default function Hero() {
  const parRef     = useParallaxVar<HTMLElement>(-0.04);
  const pillarsRef = useReveal<HTMLDivElement>({ threshold: 0.25, rootMargin: '-10% 0px' });
  const cardRef    = useReveal<HTMLDivElement>({ threshold: 0.2,  rootMargin: '-5% 0px' });

  return (
    <section ref={parRef} className="relative isolate overflow-hidden text-white" aria-label="Hero">
      {/* FULL-BLEED BACKGROUND (separate element) */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 will-change-transform bg-cover bg-center"
        style={{
          transform: 'translateY(var(--bg-par, 0px))',
          backgroundImage: "url('/difiore-hero-spotlight-house.png')",
        }}
        aria-hidden
      />

      {/* CREST IMAGE (own absolutely-positioned wrapper) */}
      <div
        className="absolute left-1/2 top-12 -z-5 w-[420px] max-w-[85vw] -translate-x-1/2 drop-shadow-[0_28px_60px_rgba(5,12,26,.65)] sm:top-16 sm:w-[510px]"
        style={{ transform: 'translate(-50%, calc(0px + var(--bg-par, 0px) * 0.3))' }}
        aria-hidden
      >
        <Image
          src="/light-crest.png"
          alt=""
          width={520}
          height={520}
          priority
          className="h-auto w-full select-none"
        />
      </div>

      <div className="relative mx-auto flex max-w-[1180px] flex-col gap-10 px-5 pb-24 pt-24 sm:px-8 lg:gap-14">
        {/* Quote (right/top) */}
        <p className="self-end text-right text-[clamp(16px,2vw,22px)] font-semibold leading-tight text-white/90 drop-shadow-[0_6px_24px_rgba(3,9,20,.65)] sm:pr-4">
          “Quality work from the foundation to the Roof”
        </p>

        {/* Pillars row */}
        <div ref={pillarsRef} className="grid gap-4 sm:grid-cols-3">
          {pillars.map((p, i) => {
            const motion =
              p.dir === 'left'  ? 'translate-x-[-26px]' :
              p.dir === 'right' ? 'translate-x-[26px]'  :
                                  'translate-y-[22px]';
            return (
              <article
                key={p.title}
                style={{ transitionDelay: `${i * 110}ms` }}
                className={`flex items-start gap-3 rounded-[20px] border border-white/18 bg-[rgba(10,22,40,.68)] p-4 shadow-[0_16px_40px_rgba(3,9,20,.45)] backdrop-blur transition-[transform,opacity] duration-700 ease-out opacity-0 ${motion} in:opacity-100 in:translate-x-0 in:translate-y-0`}
              >
                <span className="select-none text-2xl leading-none">{p.ico}</span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold tracking-tight text-white">{p.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-200/90">{p.blurb}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Main content card + photo */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div
            ref={cardRef}
            className="rounded-[30px] border border-white/18 bg-[rgba(8,18,34,.78)] p-6 shadow-[0_24px_70px_rgba(3,9,20,.6)] backdrop-blur md:p-8"
          >
            <span className="inline-flex items-center gap-2 rounded-full bg-amber-100/90 px-4 py-1 text-[13px] font-semibold text-amber-900 shadow-sm">
              <span aria-hidden>🏅</span> In Business Since 2003
            </span>

            <h1 className="mt-4 font-serif text-[clamp(32px,4vw,58px)] font-extrabold leading-tight tracking-[-0.018em] text-white drop-shadow-[0_10px_32px_rgba(3,9,20,.6)]">
              Full-Service General Construction — From Foundation to Roof
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-zinc-100/90">
              We handle additions, kitchens, baths, basements, decks, roofing, siding, and more. Expect clean job sites,
              transparent communication, and craftsmanship that feels at home from day one.
            </p>
            <p className="mt-3 text-[15px] leading-relaxed text-zinc-100/85">
              Our local team manages every phase—estimating, permitting, scheduling, and punch list—so your project stays
              on track and worry-free.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <Link href="/project-calculator" className="rounded-md bg-amber-500 px-5 py-2.5 text-[15px] font-semibold text-zinc-900 shadow hover:bg-amber-400">
                Project Calculator
              </Link>
              <Link href="/our-story" className="rounded-md border border-white/45 px-5 py-2.5 text-[15px] font-semibold text-white/95 hover:bg-white/10">
                Our Story
              </Link>
            </div>

            <p className="mt-6 text-[15px] text-white/85">See what’s possible on your budget in minutes.</p>
            <p className="text-[12px] text-white/65">* Calculator ranges are estimates; final pricing requires an in-person evaluation.</p>
          </div>

          <figure className="relative overflow-hidden rounded-[30px] border border-white/18 shadow-[0_28px_75px_rgba(3,9,20,.65)]">
            <Image
              src="/difiore-leadership-team.jpg"
              alt="DiFiore Builders leadership — personal service and quality workmanship."
              width={930}
              height={700}
              className="h-full w-full object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(7,16,31,.55)]" aria-hidden />
            <figcaption className="absolute inset-x-0 bottom-0 bg-[rgba(7,16,31,.72)] px-4 py-3 text-sm text-zinc-100 backdrop-blur">
              Timeless details, clean job sites, and friendly faces from start to finish.
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}