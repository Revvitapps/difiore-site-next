/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    // Legacy service URLs from the first build; point them at the current pages.
    return [
      { source: "/services/kitchens", destination: "/services/kitchens-bathrooms", permanent: true },
      { source: "/services/kitchens-renovations", destination: "/services/kitchens-bathrooms", permanent: true },
      { source: "/services/roofing", destination: "/services/roofing-siding", permanent: true },
      { source: "/services/additions", destination: "/services/additions-basements", permanent: true },
      { source: "/services/new-builds", destination: "/services/new-builds-gc", permanent: true },
    ];
  },
  async headers() {
    // The production deployment is also reachable at *.vercel.app; keep those copies out of search.
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "(?<sub>.+)\\.vercel\\.app" }],
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
  experimental: {
    serverActions: {}, // ✅ fixed from boolean to object
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "m.bbb.org" },
      { protocol: "https", hostname: "img1.wsimg.com" },
    ],
  },
  env: {
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    GITHUB_ID: process.env.GITHUB_ID,
    GITHUB_SECRET: process.env.GITHUB_SECRET,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    STRIPE_SECRET: process.env.STRIPE_SECRET,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
  },
  output: "standalone",
};

export default nextConfig;
