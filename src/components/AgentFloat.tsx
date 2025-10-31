'use client';
import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

declare global {
  interface Window {
    Wishpond?: {
      render?: () => void;
    };
  }
}

export default function AgentFloat() {
  const [open, setOpen] = useState(false);
  const scriptLoadedRef = useRef(false);

  useEffect(() => {
    if (!open || typeof window === 'undefined') return;

    let cancelled = false;

    const loadScript = () =>
      new Promise<void>((resolve, reject) => {
        const existing = document.querySelector(
          'script[data-id="wishpond-embed"]'
        ) as HTMLScriptElement | null;

        if (existing) {
          if (scriptLoadedRef.current) {
            resolve();
          } else {
            existing.addEventListener(
              'load',
              () => {
                scriptLoadedRef.current = true;
                resolve();
              },
              { once: true }
            );
          }
          return;
        }

        const script = document.createElement('script');
        script.src = 'https://agents.revvit.io/js/embed_demo_form.js?v=10';
        script.defer = true;
        script.async = true;
        script.dataset.id = 'wishpond-embed';
        script.onload = () => {
          scriptLoadedRef.current = true;
          resolve();
        };
        script.onerror = () => reject(new Error('Wishpond script failed to load'));
        document.body.appendChild(script);
      });

    const ensureRender = async () => {
      try {
        await loadScript();
        if (!cancelled) {
          window.Wishpond?.render?.();
        }
      } catch (error) {
        console.error(error);
      }
    };

    ensureRender();

    const retry = window.setTimeout(() => {
      if (!cancelled) {
        window.Wishpond?.render?.();
      }
    }, 600);

    return () => {
      cancelled = true;
      window.clearTimeout(retry);
    };
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-3 bottom-3 z-50 h-[180px] w-[130px] overflow-hidden rounded-3xl border border-cyan-400/50 bg-[rgba(6,18,32,.85)] p-[4px] shadow-[0_12px_40px_rgba(4,12,24,.55)] backdrop-blur transition hover:bg-[rgba(6,18,32,.95)] sm:right-4 sm:bottom-4 sm:h-[200px] sm:w-[150px] md:h-[280px] md:w-[200px] md:p-[6px]"
        aria-haspopup="dialog" aria-expanded={open ? 'true' : 'false'}
        aria-label="Speak to an Agent"
      >
        <span className="relative block h-full w-full overflow-hidden rounded-[22px] ring-0 ring-cyan-300/40">
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" role="dialog" aria-modal="true" onClick={()=>setOpen(false)}>
          <div className="absolute right-4 bottom-20 w-[min(92vw,480px)] rounded-2xl border border-white/15 bg-[rgba(10,20,36,.92)] p-5 shadow-[0_24px_80px_rgba(3,9,20,.65)] text-white" onClick={(e)=>e.stopPropagation()}>
            <div className="flex justify-end">
              <button
                onClick={()=>setOpen(false)}
                className="rounded-full border border-white/20 px-3 py-1 text-[12px] text-white hover:bg-white/10"
              >
                Close
              </button>
            </div>
            <div
              className="wshpnd-scloser-meeting-form min-h-[420px]"
              data-wishpond-id="8b969b2d-18c0-460a-a81d-956df042c1ec"
              data-wishpond-domain="https://agents.revvit.io"
            />
          </div>
        </div>
      )}
    </>
  );
}
