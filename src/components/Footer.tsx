import Image from 'next/image';
import Link from 'next/link';
import { site } from '@/lib/site';

const footerNav = site.nav.filter((item) => item.href !== '/');

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#040913]">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-6 px-5 py-10 text-sm text-white/70 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="space-y-2 text-white/80">
          <Link href="/" className="flex items-center gap-3 text-white">
            <Image src="/difiore-logo.png" alt="DiFiore Builders" width={38} height={38} className="h-[38px] w-[38px]" />
            <span className="text-[16px] font-semibold tracking-tight">DiFiore Builders</span>
          </Link>
          <p>“Quality work from the foundation to the roof.”</p>
          <p className="text-xs text-white/55">
            Serving the greater Tri-State Area with additions, renovations, roofing, siding, and more.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/70">
          {footerNav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/project-calculator" className="transition hover:text-white">
            Project Calculator
          </Link>
        </nav>

        <div className="text-xs text-white/55">
          <p>© {new Date().getFullYear()} DiFiore Builders. Licensed &amp; insured.</p>
          <p>General Contractor • Residential &amp; Commercial</p>
        </div>
      </div>
    </footer>
  );
}
