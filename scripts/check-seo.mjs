// Checks prerendered HTML in .next/server/app: title <= 70, description <= 165, exactly one <h1>,
// an og:image, and JSON-LD blocks that parse.
// Run after a build: npm run build && npm run check:seo
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = ".next/server/app";
const SKIP = [/^_/, /\/lsa\.html$/, /\/meta\.html$/];

const decode = (s) =>
  s.replace(/&amp;/g, "&").replace(/&#x27;|&#39;/g, "'").replace(/&quot;/g, '"').replace(/&lt;/g, "<").replace(/&gt;/g, ">");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const p = join(dir, name);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith(".html") ? [p] : [];
  });
}

const problems = [];
const files = walk(ROOT).filter((f) => !SKIP.some((re) => re.test(relative(ROOT, f))));
for (const file of files) {
  const html = readFileSync(file, "utf8");
  if (/<meta name="robots" content="noindex/.test(html)) continue;
  const page = "/" + relative(ROOT, file).replace(/\.html$/, "").replace(/^index$/, "");
  const title = decode(html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "");
  const desc = decode(html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "");
  const h1 = (html.match(/<h1[\s>]/g) ?? []).length;
  if (!title) problems.push(`${page}: missing <title>`);
  else if (title.length > 70) problems.push(`${page}: title ${title.length} chars`);
  if (!desc) problems.push(`${page}: missing description`);
  else if (desc.length > 165) problems.push(`${page}: description ${desc.length} chars`);
  if (h1 !== 1) problems.push(`${page}: ${h1} <h1> tags`);
  if (!/<meta property="og:image" content="https?:\/\/[^"]+"/.test(html)) problems.push(`${page}: missing og:image`);
  for (const [, json] of html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)) {
    try {
      JSON.parse(json);
    } catch {
      problems.push(`${page}: JSON-LD does not parse`);
    }
  }
}

console.log(`check:seo scanned ${files.length} pages`);
if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}
console.log("All pages pass (title <= 70, description <= 165, one h1, og:image, valid JSON-LD).");
