// src/components/SideBeforeAfterPairs.tsx
import React from "react";

type Pair = {
  before: string;
  after: string;
  altBefore?: string;
  altAfter?: string;
};

type Props = {
  tl?: Pair;
  bl?: Pair;
  tr?: Pair;
  br?: Pair;
  /** How far the AFTER card is pulled away from the BEFORE (x,y pixels) */
  sepX?: number;
  sepY?: number;
  /** How far the whole left/right columns sit away from the text block */
  insetX?: number;
  insetY?: number;
  /** Card size */
  cardW?: number;
  cardH?: number;
  /** Extra vertical spacing between the top/bottom stacks in each column */
  columnGap?: number;
};

function Card({
  src,
  alt,
  w,
  h,
  rotate = 0,
}: {
  src: string;
  alt: string;
  w: number;
  h: number;
  rotate?: number;
}) {
  return (
    <figure
      className="overflow-hidden rounded-xl border border-white/15 shadow-[0_12px_40px_rgba(3,9,20,.45)]"
      style={{ width: w, height: h, transform: `rotate(${rotate}deg)` }}
    >
      <img
        src={src}
        alt={alt}
        className="h-full w-full object-cover"
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}

function Stack({
  pair,
  dx,
  dy,
  w,
  h,
  rotateBefore = -2,
  rotateAfter = 2,
}: {
  pair?: Pair;
  dx: number;
  dy: number;
  w: number;
  h: number;
  rotateBefore?: number;
  rotateAfter?: number;
}) {
  if (!pair) return null;

  const wrapW = w + Math.max(0, dx);
  const wrapH = h + Math.max(0, dy);

  return (
    <div
      className="relative"
      style={{ width: wrapW, height: wrapH }}
      aria-label="Before and after"
    >
      {/* BEFORE */}
      <div className="absolute top-0 left-0">
        <Card
          src={pair.before}
          alt={pair.altBefore ?? "Before"}
          w={w}
          h={h}
          rotate={rotateBefore}
        />
      </div>
      {/* AFTER (offset by dx, dy) */}
      <div className="absolute" style={{ left: dx, top: dy }}>
        <Card
          src={pair.after}
          alt={pair.altAfter ?? "After"}
          w={w}
          h={h}
          rotate={rotateAfter}
        />
      </div>
    </div>
  );
}

export default function SideBeforeAfterPairs({
  tl,
  bl,
  tr,
  br,
  sepX = 140,
  sepY = 110,
  insetX = 260,
  insetY = 180,
  cardW = 280,
  cardH = 220,
  columnGap = 56, // space between top and bottom stacks in a column
}: Props) {
  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
      {/* LEFT column */}
      <div className="absolute left-0" style={{ top: insetY }}>
        <div className="relative" style={{ left: -insetX }}>
          <div className="mb-4">
            <Stack pair={tl} dx={sepX} dy={sepY} w={cardW} h={cardH} />
          </div>
          <div style={{ marginTop: columnGap }}>
            <Stack pair={bl} dx={sepX} dy={sepY} w={cardW} h={cardH} />
          </div>
        </div>
      </div>

      {/* RIGHT column */}
      <div className="absolute right-0" style={{ top: insetY }}>
        <div className="relative" style={{ right: -insetX }}>
          <div className="mb-4">
            <Stack pair={tr} dx={sepX} dy={sepY} w={cardW} h={cardH} />
          </div>
          <div style={{ marginTop: columnGap }}>
            <Stack pair={br} dx={sepX} dy={sepY} w={cardW} h={cardH} />
          </div>
        </div>
      </div>
    </div>
  );
}