'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function AgentFloat() {
  const [open, setOpen] = useState(false);

  const PHONE_DISPLAY = "(610) 358-5433";
  const PHONE_LINK = "tel:+16103585433";
  const EMAIL_ADDRESS = "hello@difiorebuilders.com";
  const EMAIL_LINK = `mailto:${EMAIL_ADDRESS}`;

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-3 bottom-3 z-50 flex items-center gap-2 rounded-full bg-amber-400 px-4 py-2 text-sm font-semibold text-zinc-900 shadow-[0_12px_32px_rgba(4,12,24,.45)] transition hover:bg-amber-300 sm:right-4 sm:bottom-4 sm:block sm:h-[200px] sm:w-[150px] sm:rounded-3xl sm:border sm:border-cyan-400/50 sm:bg-[rgba(6,18,32,.85)] sm:p-[4px] sm:text-inherit sm:text-white sm:shadow-[0_12px_40px_rgba(4,12,24,.55)] sm:hover:bg-[rgba(6,18,32,.95)] md:h-[280px] md:w-[200px] md:p-[6px]"
        aria-haspopup="dialog" aria-expanded={open ? 'true' : 'false'}
        aria-label="Speak to an Agent"
      >
        <span className="sm:hidden">Speak to an Agent</span>
        <span className="relative hidden h-full w-full overflow-hidden rounded-[22px] ring-0 ring-cyan-300/40 sm:block">
          <Image
            src="/difiore-agent-floating.png"
            alt=""
            fill
            className="object-cover"
            sizes="(min-width:1024px) 200px, (min-width:640px) 150px, 130px"
            priority={false}
          />
        </span>
        <span className="sr-only">Speak to an Agent</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={() => setOpen(false)}>
          <div
            className="absolute right-4 bottom-20 w-[min(92vw,480px)] rounded-2xl border border-white/15 bg-[rgba(10,20,36,.92)] p-5 shadow-[0_24px_80px_rgba(3,9,20,.65)] text-white"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-end">
              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div className="space-y-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.3em] text-amber-300">
                  Need help now?
                </p>
                <p className="mt-2 text-base text-white/80">
                  Reach out via email or phone and our project specialist will respond right away.
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={PHONE_LINK}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                  >
                    Call {PHONE_DISPLAY}
                  </a>
                  <a
                    href={EMAIL_LINK}
                    className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-3 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white transition hover:bg-white/10"
                  >
                    Email {EMAIL_ADDRESS}
                  </a>
                </div>
                <p className="mt-3 text-[11px] text-white/60">
                  Available weekdays; same estimator team monitors these channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
