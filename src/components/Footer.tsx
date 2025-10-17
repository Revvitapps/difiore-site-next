import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-zinc-950">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 md:flex-row md:items-center md:justify-between">
        <div className="space-y-1">
          <Link
            href="/"
            aria-label="Go to homepage"
            className="flex items-center gap-2 hover:opacity-90"
          >
            <img
              src="/difiore-logo.png"
              alt="DiFiore Builders"
              className="h-8 w-auto"
            />
            <strong className="tracking-tight">DiFiore Builders</strong>
          </Link>
          <p className="text-sm text-zinc-400">
            “Quality work from the foundation to the Roof”
          </p>
        </div>

        <nav className="flex gap-6 text-sm text-zinc-300">
          <Link href="/our-story" className="hover:text-white">Our Story</Link>
          <Link href="/our-projects" className="hover:text-white">Past Projects</Link>
          <Link href="/project-calculator" className="hover:text-white">Project Calculator</Link>
        </nav>

        <p className="text-xs text-zinc-500">
          © {new Date().getFullYear()} DiFiore Builders. Licensed &amp; Insured.
        </p>
      </div>
    </footer>
  );
}
