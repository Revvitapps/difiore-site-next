'use client';
import { useReveal } from "@/lib/hooks";

const items = [
  { ico: "🛡️", title: "Integrity",  blurb: "Honest estimates, transparent communication, workmanship we stand behind." },
  { ico: "💡", title: "Innovation", blurb: "Modern materials & smart detailing that elevate performance and style." },
  { ico: "🏠", title: "Impact",     blurb: "Spaces that improve daily life and add lasting value to your home." },
];

export default function Pillars() {
  const ref = useReveal<HTMLDivElement>({ threshold: 0.2, rootMargin: "0px 0px -12% 0px" });

  return (
    <section className="px-6 md:px-8 pt-8 pb-12">
      <div
        ref={ref}
        className="group mx-auto grid max-w-[1200px] grid-cols-1 gap-4 md:grid-cols-3"
      >
        {items.map((p, i) => (
          <article
            key={p.title}
            style={{ transitionDelay: `${i * 110}ms` }}
            className={`opacity-0 [transform:translateY(18px)]
                        group-[.in]:opacity-100 group-[.in]:[transform:none]
                        transition-[transform,opacity] duration-700 ease-out
                        rounded-xl border border-white/12
                        bg-[linear-gradient(180deg,rgba(14,22,34,.86),rgba(10,18,30,.78))]
                        backdrop-blur-sm p-4 sm:p-5 shadow-[0_10px_28px_rgba(0,0,0,.25)]`}
          >
            <div className="flex items-start gap-3.5">
              {/* gold badge */}
              <span className="relative flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-[20px]">
                <span className="absolute inset-0 rounded-full
                  bg-[radial-gradient(circle_at_30%_30%,#ffe6a6_0%,#ffc843_55%,#f39b00_78%,#965b00_100%)]
                  shadow-[inset_0_2px_6px_rgba(255,255,255,.35),0_10px_22px_rgba(0,0,0,.35)]" />
                <span className="relative select-none leading-none">{p.ico}</span>
              </span>

              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{p.title}</h3>
                <p className="mt-1 text-[13px] leading-snug text-zinc-200/90">{p.blurb}</p>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}