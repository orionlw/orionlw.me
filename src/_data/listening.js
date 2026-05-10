const USER = "orionlw";
const ENDPOINT = `https://api.listenbrainz.org/1/user/${USER}/listens?count=100`;
const LIMIT = 5;

export default async function () {
  try {
    const res = await fetch(ENDPOINT, {
      headers: { Accept: "application/json" },
    });
    if (!res.ok) {
      console.warn(`[listening] ListenBrainz returned ${res.status}`);
      return null;
    }
    const data = await res.json();
    const listens = data?.payload?.listens || [];

    const albums = [];
    const seen = new Set();
    for (const listen of listens) {
      const meta = listen.track_metadata;
      if (!meta?.release_name || !meta?.artist_name) continue;
      const key = `${meta.artist_name}::${meta.release_name}`;
      if (seen.has(key)) continue;
      seen.add(key);
      albums.push({
        album: meta.release_name,
        artist: meta.artist_name,
      });
      if (albums.length >= LIMIT) break;
    }
    return albums.length ? albums : null;
  } catch (err) {
    console.warn("[listening] fetch failed:", err.message);
    return null;
  }
}
