const USER = "orionlw";
const ENDPOINT = `https://letterboxd.com/${USER}/rss/`;

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
    const item = xml.match(/<item>([\s\S]*?)<\/item>/);
    if (!item) return null;
    const title = extractTag(item[1], "title");
    const link = extractTag(item[1], "link");
    if (!title) return null;
    return { title, link };
  } catch (err) {
    console.warn("[watching] fetch failed:", err.message);
    return null;
  }
}
