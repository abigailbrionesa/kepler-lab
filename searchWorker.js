importScripts("https://cdn.jsdelivr.net/npm/minisearch@6.3.0/dist/umd/index.min.js");

let miniSearch;
let asteroidsMap = new Map();
let allAsteroids = [];

function applyFilters(asteroids, filters) {
  return asteroids.filter(asteroid => {
    if (filters.minDistance !== undefined && asteroid.a * 149597871 < filters.minDistance) return false;
    if (filters.maxDistance !== undefined && asteroid.a * 149597871 > filters.maxDistance) return false;
    if (filters.minEccentricity !== undefined && asteroid.e < filters.minEccentricity) return false;
    if (filters.maxEccentricity !== undefined && asteroid.e > filters.maxEccentricity) return false;
    if (filters.minInclination !== undefined && asteroid.i < filters.minInclination) return false;
    if (filters.maxInclination !== undefined && asteroid.i > filters.maxInclination) return false;
    if (filters.minMagnitude !== undefined && asteroid.H < filters.minMagnitude) return false;
    if (filters.maxMagnitude !== undefined && asteroid.H > filters.maxMagnitude) return false;
    return true;
  });
}

self.onmessage = (e) => {
  const { type, payload } = e.data;

  if (type === "LOAD") {
    allAsteroids = payload.asteroids;
    asteroidsMap.clear();
    allAsteroids.forEach((asteroid) => {
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

    miniSearch.addAll(allAsteroids);

    self.postMessage({
      type: "READY",
      stats: {
        total: allAsteroids.length,
        minDistance: Math.min(...allAsteroids.map(a => a.a * 149597871)),
        maxDistance: Math.max(...allAsteroids.map(a => a.a * 149597871)),
        minEccentricity: Math.min(...allAsteroids.map(a => a.e)),
        maxEccentricity: Math.max(...allAsteroids.map(a => a.e)),
        minInclination: Math.min(...allAsteroids.map(a => a.i)),
        maxInclination: Math.max(...allAsteroids.map(a => a.i)),
        minMagnitude: Math.min(...allAsteroids.map(a => a.H)),
        maxMagnitude: Math.max(...allAsteroids.map(a => a.H)),
      }
    });
  }

if (type === "SEARCH") {
  if (!miniSearch) {
    self.postMessage({ type: "RESULTS", results: [], count: 0 });
    return;
  }

  const { query = "", filters = {} } = payload;
  let results = [];

  if (query.trim()) {
    const lowerQuery = query.toLowerCase();
    results = allAsteroids.filter(a => a.full_name.toLowerCase().includes(lowerQuery));
  } else {
    results = [...allAsteroids];
  }

  const filteredResults = applyFilters(results, filters);

  const sortedResults = filteredResults
    .sort((a, b) => (a.condition_code || 9) - (b.condition_code || 9))
    .map((a) => ({
      spkid: String(a.spkid),
      full_name: a.full_name,
      condition_code: a.condition_code,
      a: a.a,
      e: a.e,
      i: a.i,
      H: a.H,
    }));

  self.postMessage({
    type: "RESULTS",
    results: sortedResults,
    count: filteredResults.length
  });
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

