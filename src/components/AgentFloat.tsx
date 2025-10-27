'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function AgentFloat() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-4 bottom-4 z-50 flex items-center gap-3 rounded-full border border-white/20 bg-[rgba(10,20,36,.88)] px-4 py-2 shadow-[0_16px_40px_rgba(3,9,20,.45)] backdrop-blur hover:bg-[rgba(10,20,36,.95)] transition"
        aria-haspopup="dialog" aria-expanded={open?'true':'false'}
      >
        <span className="relative h-9 w-9 overflow-hidden rounded-full ring-2 ring-white/20">
          <Image
            src="/difiore-agent-floating.png"
            alt=""
            fill
            className="object-cover"
            sizes="36px"
            priority={false}
          />
        </span>
        <span className="text-sm font-semibold text-white">Speak to an Agent</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={()=>setOpen(false)}>
          <div className="absolute right-4 bottom-20 w-[min(92vw,420px)] rounded-2xl border border-white/15 bg-[rgba(10,20,36,.92)] p-5 shadow-[0_24px_80px_rgba(3,9,20,.65)] text-white" onClick={(e)=>e.stopPropagation()}>
            <div className="flex items-center gap-3">
              <span className="relative h-10 w-10 overflow-hidden rounded-full ring-2 ring-white/20">
                <Image
                  src="/difiore-agent-floating.png"
                  alt=""
                  fill
                  className="object-cover"
                  sizes="40px"
                />
              </span>
              <div>
                <h3 className="text-base font-semibold">Speak to an Agent</h3>
                <p className="text-xs text-white/70">We’ll respond quickly during business hours.</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2 text-sm">
              <Link href="tel:+15551234567" className="rounded-md bg-amber-500 px-3 py-2 font-semibold text-zinc-900 hover:bg-amber-400 text-center">Call Now</Link>
              <Link href="/project-calculator" className="rounded-md border border-white/30 px-3 py-2 hover:bg-white/10 text-center">Get a Quick Estimate</Link>
              <Link href="/contact" className="rounded-md border border-white/30 px-3 py-2 hover:bg-white/10 text-center">Send a Message</Link>
            </div>

            <button onClick={()=>setOpen(false)} className="mt-3 w-full text-center text-xs text-white/60 hover:text-white">Close</button>
          </div>
        </div>
      )}
    </>
  );
}
