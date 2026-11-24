// Writes src/lib/seo/lastModified.json: one date per sitemap route, taken from the last git commit that
// touched that route's page file (plus the shared data file for the generated city/service and cost pages).
// The sitemap reads this file instead of stamping every URL with the build time.
// Run after a commit that changes page content: npm run lastmod (needs full git history, not a shallow clone).
// Entries can also be set by hand; a route missing from the file is listed without <lastmod>.
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync, statSync, writeFileSync } from "node:fs";
import { join, relative, sep } from "node:path";

const APP = "src/app";
const LOCAL_DATA = "src/lib/seo/localPages.ts";
const OUT = "src/lib/seo/lastModified.json";

function gitDate(paths) {
  const out = execFileSync("git", ["log", "-1", "--format=%cs", "--", ...paths], { encoding: "utf8" }).trim();
  return out || null;
}

function pageFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) return pageFiles(p);
    return name === "page.tsx" ? [p] : [];
  });
}

const result = {};
for (const file of pageFiles(APP)) {
  const route = "/" + relative(APP, file).split(sep).slice(0, -1).join("/");
  if (route.includes("[")) continue; // dynamic routes handled below
  result[route === "/" ? "/" : route.replace(/\/$/, "")] = gitDate([file]);
}

// Generated pages: content comes from the shared template plus localPages.ts.
const { CITY_PAGES, CITY_SERVICE_COMBINATIONS } = await import("../src/lib/seo/localPages.ts").catch(() => ({}));
if (CITY_PAGES && CITY_SERVICE_COMBINATIONS) {
  const cityDate = gitDate([join(APP, "[city]/page.tsx"), LOCAL_DATA]);
  const serviceDate = gitDate([join(APP, "[city]/[service]/page.tsx"), LOCAL_DATA]);
  for (const slug of Object.keys(CITY_PAGES)) result[`/${slug}`] = cityDate;
  for (const { city, service } of CITY_SERVICE_COMBINATIONS) result[`/${city}/${service}`] = serviceDate;
} else if (!existsSync(LOCAL_DATA)) {
  console.warn("localPages.ts not found; generated routes skipped");
} else {
  console.warn("Could not import localPages.ts (needs Node 22.6+ type stripping); generated routes skipped");
}

const sorted = Object.fromEntries(Object.entries(result).filter(([, d]) => d).sort(([a], [b]) => a.localeCompare(b)));
writeFileSync(OUT, JSON.stringify(sorted, null, 2) + "\n");
console.log(`Wrote ${Object.keys(sorted).length} routes to ${OUT}`);
