import Link from "next/link";

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative z-50 border-t border-white/10 bg-zinc-950 text-zinc-200"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 py-10 md:flex-row md:items-center md:justify-between">
        {/* Brand */}
<div className="space-y-2">
  <div className="flex items-center gap-3">
    <img
      src="/difiore-logo.png"
      alt="DiFiore Builders"
      className="h-8 w-auto"
      loading="lazy"
      decoding="async"
    />
    <strong className="tracking-tight text-white">DiFiore Builders</strong>
  </div>
  <p className="text-sm text-zinc-400">
    “Quality work from the foundation to the Roof”
  </p>
</div>

        {/* Nav */}
        <nav className="flex flex-wrap items-center gap-6 text-sm">
          <Link href="/our-story" className="hover:text-white">Our Story</Link>
          <Link href="/our-projects" className="hover:text-white">Past Projects</Link>
          <Link href="/project-calculator" className="hover:text-white">Project Calculator</Link>
        </nav>

        {/* Social (inline SVGs so no deps) */}
        <div className="flex items-center gap-4">
          <a
            href="https://facebook.com"
            aria-label="Facebook"
            className="rounded p-1 hover:bg-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
              <path d="M22 12c0-5.522-4.477-10-10-10S2 6.478 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.988H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.261c-1.243 0-1.631.772-1.631 1.562v1.875h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/>
            </svg>
          </a>
          <a
            href="https://instagram.com"
            aria-label="Instagram"
            className="rounded p-1 hover:bg-white/10"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-zinc-300">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5zM17.75 6a1 1 0 1 1-1 1 1 1 0 0 1 1-1z"/>
            </svg>
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto max-w-6xl px-4 py-4 text-center text-xs text-zinc-500">
          © {new Date().getFullYear()} DiFiore Builders. Licensed &amp; Insured.
        </div>
      </div>
    </footer>
  );
}