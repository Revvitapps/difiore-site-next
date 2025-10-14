import fs from "fs/promises";
import path from "path";
import { parse } from "csv-parse/sync";

const CRAWL_DIR = "seo/crawl";
const OUT_DIR = "seo/out";

const FILES = {
  titles:        "page_titles_all.csv",
  metas:         "meta_description_all.csv",
  directives:    "directives_all.csv",
  canonicals:    "canonicals_all.csv",
  responses:     "response_codes_all.csv",
};

function readCsvSync(csvText){
  return parse(csvText, { columns:true, skip_empty_lines:true, bom:true });
}

const H = {
  url:                ["Address","URL","Canonical Link Element 1"],
  title:              ["Title 1","Title"],
  titleLength:        ["Title 1 Length","Title Length"],
  titlePx:            ["Title 1 Pixel Width","Title Pixel Width"],
  meta:               ["Meta Description 1","Meta Description"],
  metaLength:         ["Meta Description 1 Length","Meta Description Length"],
  metaPx:             ["Meta Description 1 Pixel Width","Meta Description Pixel Width"],
  h1:                 ["H1-1","H1-1 Text","H1"],
  indexability:       ["Indexability","Directives"],
  noindex:            ["Noindex","Directives (All)","X-Robots-Tag 1"],
  canonical:          ["Canonical Link Element 1","Canonical"],
  statusCode:         ["Status Code","Status"],
};

function get(row, keys){
  for (const k of keys){ if (row[k] !== undefined && row[k] !== "") return row[k]; }
  return undefined;
}

function toInt(v){
  if (v === undefined || v === null || v === "") return undefined;
  const n = parseInt(String(v).replace(/[^\d-]/g,""), 10);
  return Number.isNaN(n) ? undefined : n;
}

function tooLong(len, px, maxChars, maxPx){
  if (px !== undefined && toInt(px) > maxPx) return true;
  if (len !== undefined && toInt(len) > maxChars) return true;
  return false;
}

async function loadCsvMap(filename, reducer){
  const p = path.join(CRAWL_DIR, filename);
  const txt = await fs.readFile(p, "utf8");
  const rows = readCsvSync(txt);
  const map = new Map();
  for (const r of rows){
    const url = get(r, H.url);
    if (!url) continue;
    const current = map.get(url) ?? {};
    const next = reducer(current, r);
    map.set(url, next);
  }
  return map;
}

const HOST = process.env.DOMAIN || "difiorebuilders.com";
function isFirstPartyHtml(u){
  try{
    const { hostname, pathname, protocol } = new URL(u);
    if (!/^https?:$/.test(protocol)) return false;
    if (!hostname.endsWith(HOST)) return false;
    // exclude common asset/file extensions
    if (/\.(png|jpe?g|gif|webp|svg|js|css|ico|woff2?|ttf|pdf|mp4|mov)(\?|$)/i.test(pathname)) return false;
    return true;
  }catch{ return false; }
}

async function main(){
  const pages = new Map();
  const merge = (url, data) => {
    const prev = pages.get(url) ?? {};
    pages.set(url, { url, ...prev, ...data });
  };

  if (FILES.titles){
    const m = await loadCsvMap(FILES.titles, (cur, r) => ({
      ...cur,
      title: (get(r, H.title) ?? "").trim(),
      titleLength: toInt(get(r, H.titleLength)),
      titlePx: toInt(get(r, H.titlePx)),
    }));
    m.forEach((v,k)=>merge(k,v));
  }

  if (FILES.metas){
    const m = await loadCsvMap(FILES.metas, (cur, r) => ({
      ...cur,
      meta: (get(r, H.meta) ?? "").trim(),
      metaLength: toInt(get(r, H.metaLength)),
      metaPx: toInt(get(r, H.metaPx)),
    }));
    m.forEach((v,k)=>merge(k,v));
  }

  if (FILES.directives){
    const m = await loadCsvMap(FILES.directives, (cur, r) => {
      const noindexRaw = String(get(r, H.noindex) ?? "").toLowerCase();
      const hasNoindex = /noindex/.test(noindexRaw);
      return {
        ...cur,
        h1: (get(r, H.h1) ?? "").trim(),
        indexability: get(r, H.indexability),
        noindex: hasNoindex,
      };
    });
    m.forEach((v,k)=>merge(k,v));
  }

  if (FILES.canonicals){
    const m = await loadCsvMap(FILES.canonicals, (cur, r) => ({
      ...cur,
      canonical: get(r, H.canonical) ?? "",
    }));
    m.forEach((v,k)=>merge(k,v));
  }

  if (FILES.responses){
    const m = await loadCsvMap(FILES.responses, (cur, r) => ({
      ...cur,
      statusCode: toInt(get(r, H.statusCode)),
    }));
    m.forEach((v,k)=>merge(k,v));
  }

  if (pages.size === 0){
    console.error("No pages parsed. Ensure CSVs are in ./seo/crawl/");
    process.exit(1);
  }

  // Narrow to first-party HTML pages with 200 status (or missing status -> treat as 200)
  const fp = [...pages.values()].filter(p =>
    isFirstPartyHtml(p.url) && (p.statusCode === undefined || p.statusCode === 200)
  );

  const issues = {
    non200:[], missingTitle:[], longTitle:[],
    missingMeta:[], longMeta:[], missingH1:[],
    noindex:[], missingCanonical:[]
  };

  for (const p of fp){
    if (p.statusCode && p.statusCode !== 200) issues.non200.push(p);
    if (!p.title) issues.missingTitle.push(p);
    else if (tooLong(p.titleLength, p.titlePx, 60, 580)) issues.longTitle.push(p);

    if (!p.meta) issues.missingMeta.push(p);
    else if (tooLong(p.metaLength, p.metaPx, 155, 920)) issues.longMeta.push(p);

    if (!p.h1) issues.missingH1.push(p);
    if (p.noindex) issues.noindex.push(p);
    if (p.canonical === undefined || p.canonical === "") issues.missingCanonical.push(p);
  }

  // Ensure output dir
  await fs.mkdir(OUT_DIR, { recursive: true });

  const summary = {
    domain: HOST,
    totalPages: fp.length,
    counts: Object.fromEntries(Object.entries(issues).map(([k,v])=>[k,v.length])),
    generatedAt: new Date().toISOString(),
  };

  await fs.writeFile(path.join(OUT_DIR,"seo-summary.json"), JSON.stringify({ summary, issues }, null, 2), "utf8");

  const top = (arr,n=20)=>arr.slice(0,n);
  const md = `# SEO Summary
Generated: ${summary.generatedAt}
**Domain:** ${HOST}

**Total pages:** ${summary.totalPages}

| Issue | Count |
|---|---:|
${Object.entries(summary.counts).map(([k,v])=>`| ${k} | ${v} |`).join("\n")}

## Examples

### Missing Title (first 20)
${top(issues.missingTitle).map(p=>`- ${p.url}`).join("\n") || "_None_"}

### Long Title (first 20)
${top(issues.longTitle).map(p=>`- (${p.titleLength ?? p.titlePx ?? "len?"}) — ${p.url}`).join("\n") || "_None_"}

### Missing Meta (first 20)
${top(issues.missingMeta).map(p=>`- ${p.url}`).join("\n") || "_None_"}

### Long Meta (first 20)
${top(issues.longMeta).map(p=>`- (${p.metaLength ?? p.metaPx ?? "len?"}) — ${p.url}`).join("\n") || "_None_"}

### Missing H1 (first 20)
${top(issues.missingH1).map(p=>`- ${p.url}`).join("\n") || "_None_"}

### Noindex (first 20)
${top(issues.noindex).map(p=>`- ${p.url}`).join("\n") || "_None_"}

### Missing Canonical (first 20)
${top(issues.missingCanonical).map(p=>`- ${p.url}`).join("\n") || "_None_"}
`;
  await fs.writeFile(path.join(OUT_DIR,"seo-summary.md"), md, "utf8");

  console.log("✅ Wrote:");
  console.log(" - seo/out/seo-summary.json");
  console.log(" - seo/out/seo-summary.md");
}

main().catch((e)=>{ console.error(e); process.exit(1); });
