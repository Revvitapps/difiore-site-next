import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-zinc-950/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2">
          <img src="/difiore-logo.png" alt="DiFiore Builders" className="h-8 w-auto" />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        <nav className="flex items-center gap-4">
          <div className="relative">
            <button
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              onClick={() => setOpen((s) => !s)}
              className="text-sm text-zinc-300 hover:text-white"
            >
              Services
            </button>

            <div
              onMouseEnter={() => setOpen(true)}
              onMouseLeave={() => setOpen(false)}
              className={(open ? "block" : "hidden") + " absolute right-0 mt-2 w-48 rounded-md bg-zinc-900/80 border border-white/10 shadow-lg"}
            >
              <Link href="/services/roofing" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5">Roofing & Siding</Link>
              <Link href="/services/additions" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5">Additions</Link>
              <Link href="/services/kitchens" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5">Kitchens</Link>
              <Link href="/services/new-builds" className="block px-4 py-2 text-sm text-zinc-100 hover:bg-white/5">New Builds</Link>
            </div>
          </div>

          <Link href="/our-story" className="hidden md:inline text-sm text-zinc-300 hover:text-white">Our Story</Link>
        </nav>
      </div>
    </header>
  );
}
