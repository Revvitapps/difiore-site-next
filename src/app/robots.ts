import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo/constants";

// AI search / answer-engine crawlers, named explicitly so it's clear they are welcome
// (they are already covered by the "*" rule; listing them guards against future defaults).
const AI_AND_SEARCH_CRAWLERS = [
  "GPTBot",
  "OAI-SearchBot",
  "ChatGPT-User",
  "ClaudeBot",
  "Claude-SearchBot",
  "Claude-User",
  "PerplexityBot",
  "Perplexity-User",
  "Google-Extended",
  "Applebot-Extended",
  "Bingbot",
  "DuckAssistBot",
  "CCBot",
  "meta-externalagent",
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
      },
      {
        userAgent: AI_AND_SEARCH_CRAWLERS,
        allow: "/",
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
