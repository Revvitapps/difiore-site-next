import { AnalyticsListener } from "@/components/AnalyticsListener";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ANALYTICS_CONFIG } from "@/lib/analytics/config";
import { Analytics } from '@vercel/analytics/react';
import Script from "next/script";
import { Suspense } from "react";
import { SITE_URL } from "@/lib/seo/constants";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "DiFiore Builders | Home Remodeling and General Contractor in Chadds Ford, PA",
    template: "%s",
  },
  description: "Quality work from the foundation to the roof.",
  openGraph: {
    title: "DiFiore Builders",
    description:
      "Quality craftsmanship from the foundation to the roof — serving Chadds Ford, PA, Glen Mills, West Chester, and Wilmington since 2003.",
    url: SITE_URL,
    siteName: "DiFiore Builders",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/difiore-hero-spotlight-house.webp`,
        width: 1920,
        height: 1080,
        alt: "DiFiore Builders custom home exterior",
      },
    ],
  },
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { metaPixelId, ga4MeasurementId } = ANALYTICS_CONFIG;

  return (
    <html lang="en">
      <head>
        <meta property="og:image" content={`${SITE_URL}/difiore-hero-spotlight-house.webp`} />
        <meta property="og:image:alt" content="Exterior renovation by DiFiore Builders" />
        <meta property="twitter:image" content={`${SITE_URL}/difiore-hero-spotlight-house.webp`} />
        <meta name="twitter:card" content="summary_large_image" />
        {metaPixelId && (
          <>
            <Script id="fb-pixel" strategy="afterInteractive">
              {`
                !function(f,b,e,v,n,t,s){
                  if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)
                }(window, document,'script','https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', '${metaPixelId}');
              `}
            </Script>
            <Script id="fb-pixel-pageview" strategy="afterInteractive">
              {`fbq('track', 'PageView');`}
            </Script>
          </>
        )}

        {ga4MeasurementId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${ga4MeasurementId}`}
              strategy="afterInteractive"
              async
            />
            <Script id="gtag-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${ga4MeasurementId}', { send_page_view: false });
              `}
            </Script>
          </>
        )}
      </head>
      {/* No max-w on <main>; sections control their own width */}
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Header />
        <Suspense fallback={null}>
          <AnalyticsListener />
        </Suspense>
        <main className="min-h-[60vh]">{children}</main>

        {/* Global prefooter */}

        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
