const USER = "orionlw";
const ENDPOINT = `https://letterboxd.com/${USER}/rss/`;
const LIMIT = 5;

function extractTag(xml, tag) {
  const re = new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`);
  const m = xml.match(re);
  return m ? m[1].trim() : null;
}

export default async function () {
  try {
    const res = await fetch(ENDPOINT);
    if (!res.ok) {
      console.warn(`[watching] Letterboxd RSS returned ${res.status}`);
      return null;
    }
    const xml = await res.text();
    const itemRe = /<item>([\s\S]*?)<\/item>/g;
    const films = [];
    let m;
    while ((m = itemRe.exec(xml)) !== null && films.length < LIMIT) {
      const title = extractTag(m[1], "title");
      const link = extractTag(m[1], "link");
      if (!title) continue;
      films.push({ title, link });
    }
    return films.length ? films : null;
  } catch (err) {
    console.warn("[watching] fetch failed:", err.message);
    return null;
  }
}
