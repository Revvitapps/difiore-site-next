'use client';
import { useEffect, useRef, useState } from 'react';

export default function MobileCarousel({ images }: { images: string[] }) {
  const [i, setI] = useState(0);
  const tRef = useRef<number | null>(null);

  useEffect(() => {
    if (images.length <= 1) return;
    tRef.current = window.setInterval(() => setI(v => (v + 1) % images.length), 6000);
    return () => tRef.current && window.clearInterval(tRef.current);
  }, [images.length]);

  return (
    <div className="sm:hidden relative overflow-hidden rounded-xl border border-white/12">
      <img
        src={images[i]}
        alt="Kitchen & Bathroom project"
        className="w-full h-[58vw] max-h-[420px] object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute bottom-2 inset-x-0 flex justify-center gap-1.5">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setI(idx)}
            className={`h-1.5 w-3 rounded-full ${idx === i ? "bg-white" : "bg-white/40"}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
