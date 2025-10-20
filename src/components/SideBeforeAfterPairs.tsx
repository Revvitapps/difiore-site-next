"use client";

type Pair = { before: string; after: string; altBefore?: string; altAfter?: string };

export default function SideBeforeAfterPairs({
  tl,
  bl,
  tr,
  br,
  sepX = 160,
  sepY = 70,
  cardW = 380,
  cardH = 260,
  insetX = 40,
  insetY = 24,
}: {
  tl?: Pair; bl?: Pair; tr?: Pair; br?: Pair;   // <- make optional to avoid crashes
  sepX?: number; sepY?: number;
  cardW?: number; cardH?: number;
  insetX?: number; insetY?: number;
}) {
  const Card = ({ src, alt, rotate = 0 }: { src: string; alt: string; rotate?: number }) => (
    <figure
      className="overflow-hidden rounded-2xl border border-white/12 shadow-[0_18px_60px_rgba(3,9,20,.55)] bg-zinc-900/10 backdrop-blur-[1px]"
      style={{ width: cardW, height: cardH, transform: `rotate(${rotate}deg)` }}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" loading="lazy" decoding="async" />
    </figure>
  );

  const Stack = ({
    pair, rotateBefore = -5.5, rotateAfter = 3.5, dx = sepX, dy = sepY,
  }: {
    pair?: Pair; rotateBefore?: number; rotateAfter?: number; dx?: number; dy?: number;
  }) => {
    if (!pair || !pair.before || !pair.after) return null; // <- guard
    return (
      <div className="relative" style={{ width: cardW + dx, height: cardH + Math.abs(dy) }}>
        <div className="absolute top-0 left-0">
          <Card src={pair.before} alt={pair.altBefore || "Before"} rotate={rotateBefore} />
        </div>
        <div className="absolute" style={{ left: dx, top: dy }}>
          <Card src={pair.after} alt={pair.altAfter || "After"} rotate={rotateAfter} />
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Left column */}
      <div
        className="pointer-events-none absolute inset-y-0 hidden lg:flex flex-col justify-between"
        style={{ left: insetX, top: insetY, bottom: insetY }}
        aria-hidden
      >
        <Stack pair={tl} />
        <Stack pair={bl} dx={sepX} dy={-sepY} rotateBefore={-5.5} rotateAfter={3.5} />
      </div>

      {/* Right column */}
      <div
        className="pointer-events-none absolute inset-y-0 hidden lg:flex flex-col justify-between items-end"
        style={{ right: insetX, top: insetY, bottom: insetY }}
        aria-hidden
      >
        <div className="relative">
          <Stack pair={tr} />
        </div>
        <div className="relative">
          <Stack pair={br} dx={sepX} dy={-sepY} rotateBefore={-5.5} rotateAfter={3.5} />
        </div>
      </div>
    </>
  );
}