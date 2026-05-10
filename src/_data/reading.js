// Storygraph has no public API or RSS, so we scrape the public
// currently-reading page. Selectors may change — this is best-effort
// and falls back to a profile link on failure.
const USER = "orionlw";
const ENDPOINT = `https://app.thestorygraph.com/currently-reading/${USER}`;
const LIMIT = 5;

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&#39;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

export default async function () {
  try {
    const res = await fetch(ENDPOINT, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; orionlw.me/1.0; +https://orionlw.me)",
        Accept: "text/html",
      },
    });
    if (!res.ok) {
      console.warn(`[reading] Storygraph returned ${res.status}`);
      return null;
    }
    const html = await res.text();

    const books = [];
    const seen = new Set();
    const re = /<a[^>]*href="\/books\/([a-z0-9-]+)"[^>]*>([^<]+)<\/a>/gi;
    let m;
    while ((m = re.exec(html)) !== null) {
      const slug = m[1];
      const title = decode(m[2]);
      if (seen.has(slug)) continue;
      if (!title || title.length < 2) continue;
      seen.add(slug);
      books.push({
        title,
        link: `https://app.thestorygraph.com/books/${slug}`,
      });
      if (books.length >= LIMIT) break;
    }
    return books.length ? books : null;
  } catch (err) {
    console.warn("[reading] fetch failed:", err.message);
    return null;
  }
}
