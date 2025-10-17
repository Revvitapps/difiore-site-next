import AgentFloat from "@/components/AgentFloat";
import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TrustedBadges from "@/components/TrustedBadges";

export const metadata: Metadata = {
  title: { default: "DiFiore Builders", template: "%s | DiFiore Builders" },
  description: "Quality work from the foundation to the roof.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/* No max-w on <main>; sections control their own width */}
      <body className="bg-zinc-950 text-zinc-100 antialiased">
        <Header />
        <main className="min-h-[60vh]">{children}</main>

        {/* Global prefooter */}

        <Footer />
        <AgentFloat />
      </body>
    </html>
  );
}
