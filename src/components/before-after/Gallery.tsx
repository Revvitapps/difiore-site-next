'use client';

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

type GalleryPair = {
  before: { src: string; alt: string };
  after: { src: string; alt: string };
};

const PAIRS: GalleryPair[] = [
  {
    before: {
      src: "/difiore-os-before-bl.jpeg",
      alt: "Kitchen before renovation with dated finishes",
    },
    after: {
      src: "/difiore-os-after-bl.jpeg",
      alt: "Kitchen after renovation with updated cabinetry and lighting",
    },
  },
  {
    before: {
      src: "/difiore-os-before-br-front.jpeg",
      alt: "Home exterior before addition",
    },
    after: {
      src: "/difiore-services-additions-secondstory2.jpeg",
      alt: "Home exterior after second-story addition",
    },
  },
  {
    before: {
      src: "/difiore-services -bathroom-shower1.JPG",
      alt: "Bathroom before remodel",
    },
    after: {
      src: "/difiore-services-kitchen-darkwood-stainless-appoliances.JPG",
      alt: "Bathroom remodel with tile and glass shower",
    },
  },
  {
    before: {
      src: "/difiore-services-showcase-additions-playroom1.JPG",
      alt: "Basement before finishing",
    },
    after: {
      src: "/difiore-services-showcase-additions-familyroom-1.JPG",
      alt: "Finished basement with seating area",
    },
  },
];

export default function BeforeAfterGallery() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="px-4 py-20 md:py-32">
      <div className="mx-auto max-w-6xl space-y-24 md:space-y-32">
        {PAIRS.map((pair, index) => {
          const isEven = index % 2 === 0;
          const beforeInitial = prefersReducedMotion
            ? false
            : { opacity: 0, x: isEven ? -60 : 60 };
          const afterInitial = prefersReducedMotion
            ? false
            : { opacity: 0, x: isEven ? 60 : -60 };

          return (
            <div
              key={`${pair.before.src}-${pair.after.src}`}
              className="grid gap-8 md:grid-cols-2 md:gap-12"
            >
              <motion.div
                initial={beforeInitial}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.8, ease: "easeOut", delay: 0.1 }
                }
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={pair.before.src}
                  alt={pair.before.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl border border-white/15 object-cover shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                />
              </motion.div>

              <motion.div
                initial={afterInitial}
                whileInView={prefersReducedMotion ? {} : { opacity: 1, x: 0 }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 0.8, ease: "easeOut", delay: 0.25 }
                }
                viewport={{ once: true, amount: 0.3 }}
              >
                <Image
                  src={pair.after.src}
                  alt={pair.after.alt}
                  width={1200}
                  height={800}
                  className="h-auto w-full rounded-2xl border border-white/15 object-cover shadow-[0_24px_60px_rgba(2,8,18,.45)]"
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
