import Link from "next/link";

export default function Accreditations() {
  return (
    <section id="df-accreditations" className="px-4 py-12 md:py-16">
      <div className="mx-auto max-w-5xl">
        {/* Heading */}
        <div className="mb-6 flex items-center gap-4 justify-center">
          <span className="hidden sm:block h-px flex-1 bg-[#1a365d]/35" />
          <h2 className="font-serif text-2xl md:text-[1.8rem] text-[#c7d7f2] tracking-[.02em]">
            Trusted &amp; Verified
          </h2>
          <span className="hidden sm:block h-px flex-1 bg-[#1a365d]/35" />
        </div>

        {/* Bubble cards (match Reviews look) */}
        <div className="grid gap-5 sm:grid-cols-2 items-stretch">
          {/* BBB */}
          <Link
            href="https://www.bbb.org/us/pa/chadds-ford/profile/general-contractor/difiore-builders-inc-0241-191952896#accreditation"
            target="_blank"
            rel="noopener"
            aria-label="View DiFiore Builders on BBB (Accredited Business)"
            className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)] block h-full overflow-hidden"
          >
            <div className="rvv-surface p-4 grid grid-cols-[160px_1fr] sm:grid-cols-[180px_1fr] items-center gap-4 h-full">
              <div className="grid place-items-center p-2">
                <img
                  src="https://m.bbb.org/terminuscontent/dist/img/business-profile/accreditation/AB-seal-horz.svg?tx=f_svg,w_240"
                  alt="BBB Accredited Business"
                  className="max-w-[160px] w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-[1.05rem] leading-tight text-white">
                  BBB Accredited Business
                </div>
                <div className="text-zinc-200 font-semibold">
                  A+ Rated • Trusted Since Accreditation
                </div>
              </div>
            </div>
          </Link>

          {/* Houzz */}
          <Link
            href="https://www.houzz.com/professionals/general-contractors/difiore-builders-inc-pfvwus-pf~1479707423"
            target="_blank"
            rel="noopener"
            aria-label="View DiFiore Builders on Houzz"
            className="rvv-bubble rounded-2xl border border-[rgba(255,255,255,.14)] bg-[rgba(12,15,20,.85)] shadow-[0_24px_60px_rgba(2,8,18,.45)] block h-full overflow-hidden"
          >
            <div className="rvv-surface p-4 grid grid-cols-[160px_1fr] sm:grid-cols-[180px_1fr] items-center gap-4 h-full">
              <div className="grid place-items-center p-2">
                <img
                  src="https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/houzz1.png"
                  alt="Houzz"
                  className="max-w-[160px] w-full h-auto"
                  loading="lazy"
                  decoding="async"
                />
              </div>
              <div className="min-w-0">
                <div className="font-extrabold text-[1.05rem] leading-tight text-white">
                  Find us on Houzz
                </div>
                <div className="text-zinc-200 font-semibold">
                  Project Photos • Reviews • Ideas
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
