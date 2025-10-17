'use client';

type Variant = 'dark' | 'light';

export default function TrustedBadges({ variant = 'dark' }: { variant?: Variant }) {
  const isLight = variant === 'light';

  const wrap = isLight
    ? "px-4 py-12 md:py-16 bg-transparent"
    : "px-4 py-12 md:py-16 bg-transparent";
  const grid = "mx-auto max-w-6xl";
  const title = "flex items-center justify-center gap-6 text-center";
  const titleText = "font-serif text-[clamp(22px,3vw,30px)] font-extrabold tracking-tight";
  const hr = "h-px w-16 md:w-24 bg-white/20";
  const cards = "mt-6 grid gap-6 md:grid-cols-2";

  const cardBase = "flex items-center gap-5 rounded-2xl border overflow-hidden";
  const cardDark  = "bg-[rgba(12,15,20,.75)] border-white/12 shadow-[0_18px_60px_rgba(2,8,18,.45)]";
  const cardLight = "bg-white text-zinc-900 border-zinc-200 shadow-[0_10px_30px_rgba(0,0,0,.08)]";

  const logoBox = isLight ? "shrink-0 px-4 py-4" : "shrink-0 px-4 py-4";
  const textBox = "py-4 pr-5";
  const h3Base = isLight ? "font-semibold text-zinc-900" : "font-semibold text-white";
  const subBase = isLight ? "text-[14px] text-zinc-600" : "text-[14px] text-zinc-300";

  return (
    <section aria-label="Trusted & Verified" className={wrap}>
      <div className={grid}>
        <div className={title}>
          <span className={hr} />
          <h2 className={titleText}>Trusted & Verified</h2>
          <span className={hr} />
        </div>

        <div className={cards}>
          {/* BBB */}
          <a
            href="https://www.bbb.org/us/pa/chadds-ford/profile/general-contractor/difiore-builders-inc-0241-191952896#accreditation"
            target="_blank" rel="noopener noreferrer"
            className={`${cardBase} ${isLight ? cardLight : cardDark}`}
          >
            <div className={logoBox}>
              <img
                src="https://m.bbb.org/terminuscontent/dist/img/business-profile/accreditation/AB-seal-horz.svg?tx=f_svg,w_360"
                alt="BBB Accredited Business"
                className="h-10 md:h-12 w-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className={textBox}>
              <div className={h3Base}>BBB Accredited Business</div>
              <div className={subBase}>A+ Rated • Trusted Since Accreditation</div>
            </div>
          </a>

          {/* Houzz */}
          <a
            href="https://www.houzz.com/professionals/general-contractors/difiore-builders-inc-pfvwus-pf~1479707423"
            target="_blank" rel="noopener noreferrer"
            className={`${cardBase} ${isLight ? cardLight : cardDark}`}
          >
            <div className={logoBox}>
              <img
                src="https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/houzz1.png"
                alt="Houzz"
                className="h-8 md:h-10 w-auto"
                loading="lazy"
                decoding="async"
                style={{ filter: isLight ? 'none' : 'brightness(1.15)' }}
              />
            </div>
            <div className={textBox}>
              <div className={h3Base}>Find us on Houzz</div>
              <div className={subBase}>Project Photos • Reviews • Ideas</div>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
