import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import SeoJsonLd from "@/components/SeoJsonLd";
import { RSS_ALTERNATE, SITE_URL } from "@/lib/seo/constants";
import { BLOG_POSTS } from "@/lib/blogPosts";
import { breadcrumbSchema } from "@/lib/seo/schema";

const posts = BLOG_POSTS;

export const metadata: Metadata = {
  title: "Remodeling Blog | DiFiore Builders",
  description:
    "Renovation insights, remodeling tips, and local project guidance from DiFiore Builders in Chadds Ford, PA, Glen Mills, West Chester, and Wilmington.",
  alternates: {
    canonical: `${SITE_URL}/blog`,
    ...RSS_ALTERNATE,
  },
};

export default function BlogPage() {
  const breadcrumb = breadcrumbSchema([
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
  ]);

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    name: "DiFiore Builders Blog",
    description:
      "Remodeling tips and project guidance for homeowners in Chadds Ford, Glen Mills, West Chester, and Wilmington.",
    url: `${SITE_URL}/blog`,
    publisher: { "@id": `${SITE_URL}/#organization` },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
    })),
  };

  return (
    <>
      <SeoJsonLd data={breadcrumb} />
      <SeoJsonLd data={blogSchema} />
      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4">
        <header className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.4em] text-amber-300">
            DiFiore Builders insights
          </p>
          <h1 className="mt-4 font-serif text-4xl font-extrabold leading-tight text-white md:text-5xl">
            Remodeling guidance from your local contractor
          </h1>
          <p className="mt-4 text-[15px] leading-relaxed text-zinc-200">
            Practical advice for basements, additions, kitchens, roofing, and full remodels so you know what to expect
            before work begins.
          </p>
        </header>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group relative min-h-[260px] overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 transition hover:border-amber-500/60 hover:bg-zinc-900/70"
            >
              <div className="absolute inset-0">
                <Image
                  src={post.image}
                  alt=""
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div aria-hidden className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/80" />
              </div>
              <div className="relative z-10">
                <div className="text-xs uppercase tracking-[0.3em] text-amber-300">{post.tag}</div>
                <h2 className="mt-4 text-2xl font-semibold leading-tight text-white">{post.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-200">{post.summary}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-amber-300">
                  <span>Read story</span>
                  <span aria-hidden>→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        </div>
      </section>
    </>
  );
}
