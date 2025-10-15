'use client';
import { useReveal } from '@/lib/hooks';

type Dir = 'left' | 'up' | 'right';

export const pillars: Array<{ ico: string; title: string; blurb: string; dir: Dir }> = [
  { ico: '🛡️', title: 'Integrity',  blurb: 'Honest estimates, transparent communication, workmanship we stand behind.', dir: 'left'  },
  { ico: '💡', title: 'Innovation', blurb: 'Modern materials & smart detailing that elevate performance and style.',   dir: 'up'    },
  { ico: '🏠', title: 'Impact',     blurb: 'Spaces that improve daily life and add lasting value to your home.',      dir: 'right' },
];

export default function Pillars() {
  const ref = useReveal<HTMLDivElement>();
  return (
    <section className="relative z-10 px-6 md:px-8 pt-8 pb-12">
      <div ref={ref} className="mx-auto grid max-w-[1200px] grid-cols-1 gap-4 sm:grid-cols-3">
        {pillars.map((p, i) => {
          const motion =
            p.dir === 'left'  ? '[transform:translateX(-24px)]' :
            p.dir === 'right' ? '[transform:translateX(24px)]'  :
                                '[transform:translateY(20px)]';
          return (
            <article
              key={p.title}
              style={{ transitionDelay: `${i * 120}ms` }}
              className={`opacity-0 ${motion} in:opacity-100 in:[transform:none] transition-[transform,opacity] duration-700 ease-out rounded-[14px] border border-white/10 bg-[rgba(10,18,30,.42)] p-3`}
            >
              <div className="flex items-start gap-3">
                <span className="text-xl select-none">{p.ico}</span>
                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold text-white">{p.title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-zinc-300">{p.blurb}</p>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}