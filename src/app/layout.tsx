import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://difiorebuilders.com"),
  title: { default: "DiFiore Builders", template: "%s | DiFiore Builders" },
  description:
    "Quality work from the foundation to the roof. Additions, renovations, roofing, siding, and new builds.",
  openGraph: {
    type: "website",
    siteName: "DiFiore Builders",
    images: [
      {
        url: "https://img1.wsimg.com/isteam/ip/111e2203-c8e6-4588-acfc-521f62348879/1caf07f0-8ccd-4239-a28b-6fbfef42a7dc.jpg/:/rs=w:1200",
        width: 1200,
        height: 630,
        alt: "DiFiore Builders",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DiFiore Builders",
    description:
      "Quality work from the foundation to the roof. Additions, renovations, roofing, siding, and new builds.",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Header />
        <main className="mx-auto min-h-[60vh] max-w-6xl px-4 py-8">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
