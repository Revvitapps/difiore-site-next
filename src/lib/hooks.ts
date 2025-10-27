'use client';
import { useEffect, useRef } from "react";

/** Adds the 'in' class when element enters the viewport */
export function useReveal<T extends HTMLElement>(opts?: IntersectionObserverInit) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.15, rootMargin: "0px 0px -10% 0px", ...(opts || {}) }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [opts]);
  return ref;
}

/** Sets CSS var (--bg-par) for parallax */
export function useParallaxVar<T extends HTMLElement>(mult = -0.06) {
  const ref = useRef<T | null>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let ticking = false;
    const update = () => {
      if (!el) return;
      const r = el.getBoundingClientRect();
      const mid = r.top + r.height / 2;
      const delta = mid - window.innerHeight / 2;
      el.style.setProperty("--bg-par", (delta * mult).toFixed(1));
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
    };
  }, [mult]);
  return ref;
}
