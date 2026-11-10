// Ping IndexNow (Bing, Yandex, Seznam...) with every URL in the live sitemap.
// Usage: npm run indexnow            -> all sitemap URLs
//        npm run indexnow -- /path   -> just the given paths
const HOST = "www.difiorebuilders.com";
const ORIGIN = `https://${HOST}`;
const KEY = "e971f7eb44d680da7d16674d01e8fadb";

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => new URL(p, ORIGIN).toString());
} else {
  const xml = await (await fetch(`${ORIGIN}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `${ORIGIN}/${KEY}.txt`, urlList }),
});
console.log(`IndexNow ${res.status} for ${urlList.length} URLs`);
if (!res.ok && res.status !== 202) {
  console.error(await res.text());
  process.exit(1);
}
