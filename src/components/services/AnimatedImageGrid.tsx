'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

export type AnimatedImage = {
  src: string;
  alt: string;
  priority?: boolean;
};

type AnimatedImageGridProps = {
  items: AnimatedImage[];
};

export default function AnimatedImageGrid({ items }: AnimatedImageGridProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="grid grid-cols-2 gap-5 md:gap-8 self-start">
      {items.map((item, index) => {
        const direction = index % 2 === 0 ? -40 : 40;
        return (
          <motion.div
            key={`${item.src}-${index}`}
            initial={
              prefersReducedMotion ? false : { opacity: 0, y: 24, x: direction }
            }
            whileInView={prefersReducedMotion ? {} : { opacity: 1, y: 0, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={
              prefersReducedMotion
                ? undefined
                : { duration: 0.8, ease: "easeOut", delay: index * 0.08 }
            }
            className="relative h-56 md:h-64 lg:h-72 w-full overflow-hidden rounded-2xl border border-white/15 shadow-[0_20px_50px_rgba(2,8,18,.45)]"
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={item.priority}
            />
          </motion.div>
        );
      })}
    </div>
  );
}
