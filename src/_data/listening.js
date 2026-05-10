const USER = "orionlw";
const ENDPOINT = `https://api.listenbrainz.org/1/user/${USER}/listens?count=1`;

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
    const meta = data?.payload?.listens?.[0]?.track_metadata;
    if (!meta?.track_name) return null;
    return {
      track: meta.track_name,
      artist: meta.artist_name,
      release: meta.release_name || null,
    };
  } catch (err) {
    console.warn("[listening] fetch failed:", err.message);
    return null;
  }
}
