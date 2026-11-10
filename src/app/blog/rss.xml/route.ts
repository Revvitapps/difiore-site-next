import { BLOG_POSTS } from "@/lib/blogPosts";
import { BUSINESS_NAME, RSS_PATH, SITE_URL, absoluteAssetUrl } from "@/lib/seo/constants";

export const dynamic = "force-static";

const escapeXml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

// Dates are calendar days; pin to noon US Eastern so the day never shifts.
const rfc822 = (isoDate: string) => new Date(`${isoDate}T12:00:00-05:00`).toUTCString();

const imageType = (path: string) => {
  const ext = path.split(".").pop()?.toLowerCase();
  if (ext === "webp") return "image/webp";
  if (ext === "png") return "image/png";
  return "image/jpeg";
};

export function GET() {
  const posts = [...BLOG_POSTS].sort((a, b) => b.datePublished.localeCompare(a.datePublished));
  const lastBuild = posts.map((p) => p.dateModified).sort().at(-1) ?? posts[0].datePublished;

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description>${escapeXml(post.summary)}</description>
      <category>${escapeXml(post.tag)}</category>
      <pubDate>${rfc822(post.datePublished)}</pubDate>
      <enclosure url="${escapeXml(absoluteAssetUrl(post.image))}" type="${imageType(post.image)}" length="0" />
    </item>`;
    })
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${BUSINESS_NAME} Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <atom:link href="${SITE_URL}${RSS_PATH}" rel="self" type="application/rss+xml" />
    <description>Remodeling, roofing and home-addition guides from ${escapeXml(BUSINESS_NAME)}, a family-owned general contractor in Chadds Ford, PA since 2003.</description>
    <language>en-us</language>
    <lastBuildDate>${rfc822(lastBuild)}</lastBuildDate>
${items}
  </channel>
</rss>
`;

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
