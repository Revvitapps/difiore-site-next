type Pair = { before: string; after: string; alt?: string };

export default function BeforeAfterStacks({
  topLeft,
  bottomLeft,
  topRight,
  bottomRight,
}: {
  topLeft: Pair;
  bottomLeft: Pair;
  topRight: Pair;
  bottomRight: Pair;
}) {
  return (
    <>
      <CornerPair
        pair={topLeft}
        className="left-3 top-3 sm:left-6 sm:top-6"
        tiltBefore="-rotate-3"
        tiltAfter="rotate-2"
      />
      <CornerPair
        pair={bottomLeft}
        className="left-3 bottom-3 sm:left-6 sm:bottom-6"
        tiltBefore="rotate-2"
        tiltAfter="-rotate-1"
      />
      <CornerPair
        pair={topRight}
        className="right-3 top-3 sm:right-6 sm:top-6"
        tiltBefore="rotate-2"
        tiltAfter="-rotate-2"
      />
      <CornerPair
        pair={bottomRight}
        className="right-3 bottom-3 sm:right-6 sm:bottom-6"
        tiltBefore="-rotate-1"
        tiltAfter="rotate-3"
      />
    </>
  );
}

function CornerPair({
  pair,
  className,
  tiltBefore,
  tiltAfter,
}: {
  pair: Pair;
  className: string;
  tiltBefore: string;
  tiltAfter: string;
}) {
  return (
    <div className={`pointer-events-none absolute z-[-1] ${className}`}>
      <div className="relative">
        {/* BEFORE card */}
        <figure
          className={`
            absolute -left-2 -top-2 ${tiltBefore}
            h-36 w-36 rounded-xl overflow-hidden border border-white/20
            shadow-[0_18px_50px_rgba(3,9,20,.55)]
            sm:h-40 sm:w-40 md:h-44 md:w-44
          `}
          aria-hidden
        >
          <img
            src={pair.before}
            alt={pair.alt || "Before"}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>

        {/* AFTER card */}
        <figure
          className={`
            relative ${tiltAfter}
            h-36 w-36 rounded-xl overflow-hidden border border-white/20
            shadow-[0_18px_50px_rgba(3,9,20,.55)]
            sm:h-40 sm:w-40 md:h-44 md:w-44
          `}
          aria-hidden
        >
          <img
            src={pair.after}
            alt={pair.alt || "After"}
            className="h-full w-full object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </div>
  );
}