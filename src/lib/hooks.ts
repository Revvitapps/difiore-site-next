'use client';
import { useEffect, useRef } from 'react';

/** Adds `.in` once the element enters the viewport. */
export function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach(e => {
        if (e.isIntersecting) {
          (e.target as HTMLElement).classList.add('in');
          io.unobserve(e.target);
        }
      }),
      opts ?? { threshold: 0.15, rootMargin: '0px 0px -12% 0px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return ref;
}

/** Writes a CSS var `--bg-par` with a tiny parallax offset (in px). */
export function useParallaxVar<T extends HTMLElement>(factor: number = -0.06) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onScroll = () => {
      const y = Math.round(window.scrollY * factor);
      el.style.setProperty('--bg-par', `${y}px`);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [factor]);
  return ref;
}