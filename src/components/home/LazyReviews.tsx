'use client';

import dynamic from "next/dynamic";

const Reviews = dynamic(() => import("@/components/Reviews"), {
  ssr: false,
  loading: () => <section id="reviews" aria-label="Reviews" className="relative py-16 md:py-24" />,
});

export default function LazyReviews() {
  return <Reviews />;
}
