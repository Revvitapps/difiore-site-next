"use client";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative z-20 isolate border-t border-white/15 bg-zinc-950/95 text-white"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 px-4 py-8 md:grid-cols-[1fr_auto_auto] md:items-center">
        {/* Logo → home */}
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/difiore-logo.png"
            alt="DiFiore Builders"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
          <span className="font-semibold tracking-tight">DiFiore Builders</span>
        </Link>

        {/* Nav */}
        <nav aria-label="Footer navigation" className="flex flex-wrap gap-6 text-sm">
          <Link href="/our-story" className="text-zinc-300 hover:text-white">Our Story</Link>
          <Link href="/before-and-after" className="text-zinc-300 hover:text-white">Before &amp; After</Link>
          <Link href="/project-calculator" className="text-zinc-300 hover:text-white">Project Calculator</Link>
        </nav>

        {/* Copyright */}
        <p className="text-right text-xs text-zinc-400 md:justify-self-end">
          © {new Date().getFullYear()} DiFiore Builders. Licensed &amp; Insured.
        </p>
      </div>
    </footer>
  );
}
