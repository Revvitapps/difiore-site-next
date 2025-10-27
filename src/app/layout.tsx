import AgentFloat from "@/components/AgentFloat";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";

export const metadata: Metadata = {
  title: {
    default: "DiFiore Builders",
    template: "%s | DiFiore Builders",
  },
  description: "Quality work from the foundation to the roof.",
  openGraph: {
    title: "DiFiore Builders",
    description: "Quality craftsmanship from the foundation to the roof — serving the Tri-State area since 2003.",
    url: "https://difiorebuilders.com",
    siteName: "DiFiore Builders",
    locale: "en_US",
    type: "website",
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* No max-w on <main>; sections control their own width */}
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>
<Script
  src="https://www.googletagmanager.com/gtag/js?id=G-364C0XZKH3"
  strategy="afterInteractive"
  async
/>
<Script id="gtag-init" strategy="afterInteractive">
  {`
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', 'G-364C0XZKH3');
  `}
</Script>

        {/* Global prefooter */}

        <Footer />
        <AgentFloat />
        <Analytics />
      </body>
    </html>
  );
}
