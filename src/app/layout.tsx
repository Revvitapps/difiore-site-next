import type { Metadata } from 'next';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { site } from '@/lib/site';

const description = 'Quality work from the foundation to the roof. Additions, renovations, roofing, siding, and more for the Tri-State Area.';

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.name, template: `%s | ${site.name}` },
  description,
  openGraph: {
    type: 'website',
    url: site.url,
    siteName: site.name,
    title: site.name,
    description,
    images: [
      {
        url: `${site.url}/difiore-hero-spotlight-house.png`,
        width: 1200,
        height: 630,
        alt: 'DiFiore Builders — additions, renovations, roofing & siding.',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description,
    images: [`${site.url}/difiore-hero-spotlight-house.png`],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="bg-[#050b15]">
      <body className="bg-[#050b15] text-zinc-100 antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
