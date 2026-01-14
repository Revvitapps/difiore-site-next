import Link from "next/link";
import type { Metadata } from "next";

const posts = [
  {
    slug: "crawl-the-site",
    title: "Crawl the site before we lose more ground",
    summary:
      "Compare today’s structure with the old GoDaddy pages, surface hidden errors, and feed the findings into a Screaming Frog-style audit so search engines see the progress.",
    tag: "Site health",
    date: "August 2024",
  },
  {
    slug: "seo-frog-findings",
    title: "Screaming Frog report: quick wins for DiFiore Builders",
    summary:
      "Turn the SEO Frog data into action items (canonical fixes, structured metadata, missing alt tags, and speed tweaks) so every visit feels intentional.",
    tag: "SEO strategy",
    date: "August 2024",
  },
];

export const metadata: Metadata = {
  title: "Blog | DiFiore Builders",
  description:
    "Updates from DiFiore Builders about improving site health, cleaning up SEO errors, and sharing lessons from the Screaming Frog report.",
  alternates: {
    canonical: "https://difiorebuilders.com/blog",
  },
};

export default function BlogPage() {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-6xl px-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">
            DiFiore Builders insights
          </p>
          <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Two fresh blog posts to protect the new site’s SEO momentum
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
            The team is leaning into analytics, crawls, and intentional content so every visitor
            understands the same craftsmanship that made the GoDaddy site work.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition hover:border-amber-500/60 hover:bg-zinc-900/70"
            >
              <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-amber-300">
                <span>{post.tag}</span>
                <span className="text-white/60">{post.date}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">
                {post.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{post.summary}</p>
              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-300">
                <span>Read story</span>
                <span aria-hidden>→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
