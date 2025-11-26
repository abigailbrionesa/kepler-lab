importScripts("https://cdn.jsdelivr.net/npm/minisearch@6.3.0/dist/umd/index.min.js");

let miniSearch;
let asteroidsMap = new Map();

self.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === "LOAD") {
    const asteroids = payload.asteroids;

    asteroidsMap.clear();
    asteroids.forEach((asteroid) => {
      asteroidsMap.set(String(asteroid.spkid), asteroid);
    });

    miniSearch = new MiniSearch({
      fields: ["full_name"],
      storeFields: ["spkid", "full_name", "condition_code"],
      idField: "spkid",
      searchOptions: {
        prefix: true,
        fuzzy: 0.2,
        boost: { full_name: 2 },
      },
    });

    miniSearch.addAll(asteroids);
    
    self.postMessage({ type: "READY" });
  }

  if (type === "SEARCH") {
    if (!miniSearch) {
      self.postMessage({ type: "RESULTS", results: [] });
      return;
    }

    const query = payload.query?.trim() || "";
    
    if (!query) {
      const allAsteroids = Array.from(asteroidsMap.values());
      const results = allAsteroids
        .sort((a, b) => (a.condition_code || 9) - (b.condition_code || 9))
        .slice(0, 10)
        .map((a) => ({
          spkid: String(a.spkid),
          full_name: a.full_name,
          condition_code: a.condition_code,
        }));
      self.postMessage({ type: "RESULTS", results });
      return;
    }

    const searchResults = miniSearch.search(query).slice(0, 10);
    
    const sortedResults = searchResults
      .sort((a, b) => {
        const codeA = a.condition_code ?? 9;
        const codeB = b.condition_code ?? 9;
        if (codeA !== codeB) {
          return codeA - codeB;
        }
        return (b.score || 0) - (a.score || 0);
      })
      .map((result) => ({
        spkid: String(result.spkid),
        full_name: result.full_name,
      }));

    self.postMessage({ type: "RESULTS", results: sortedResults });
  }

  if (type === "FETCH_BY_SPKID") {
    const spkid = String(payload.spkid);
    const asteroid = asteroidsMap.get(spkid);
    
    if (asteroid) {
      self.postMessage({ type: "ASTEROID_DATA", asteroid });
    } else {
      self.postMessage({ type: "ASTEROID_DATA", asteroid: null });
    }
  }
};

