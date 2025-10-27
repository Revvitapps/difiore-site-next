'use client';
import { useEffect, useState } from "react";
import Image from "next/image";

type Props = { images: string[] };

export default function MobileCarousel({ images }: Props) {
  const [i, setI] = useState(0);

  useEffect(() => {
    if (images.length <= 1) {
      return; // no timer; valid cleanup type (void)
    }
    const id = window.setInterval(() => {
      setI((v) => (v + 1) % images.length);
    }, 6000);

    return () => {
      window.clearInterval(id); // proper cleanup
    };
  }, [images.length]);

  return (
    <div className="sm:hidden relative overflow-hidden rounded-xl border border-white/12">
      <div className="relative h-[58vw] max-h-[420px] w-full">
        <Image
          src={images[i]}
          alt="Project photo"
          fill
          className="object-cover"
          sizes="100vw"
        />
      </div>
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
