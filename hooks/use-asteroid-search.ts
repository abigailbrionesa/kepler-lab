"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { AsteroidRow } from "@/lib/types";

type SearchResult = {
  spkid: string;
  full_name: string;
};

export function useAsteroidSearch() {
  const workerRef = useRef<Worker | null>(null);
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    workerRef.current = new Worker(
      new URL("../searchWorker.js", import.meta.url),
      { type: "module" }
    );
  
    const loadAsteroids = async () => {
      try {
        setLoading(true);
        const res = await fetch("/data/asteroids.json");
        if (!res.ok) {
          throw new Error(`Failed to fetch asteroids: ${res.statusText}`);
        }
        const asteroids: AsteroidRow[] = await res.json();

        workerRef.current?.postMessage({
          type: "LOAD",
          payload: { asteroids },
        });
      } catch (error) {
        console.error("Error loading asteroids:", error);
        setLoading(false);
      }
    };

    loadAsteroids();

    workerRef.current.onmessage = (e) => {
      const { type, results: searchResults, asteroid } = e.data;

      if (type === "READY") {
        setReady(true);
        setLoading(false);
      }

      if (type === "RESULTS") {
        setResults(searchResults || []);
      }

      if (type === "ASTEROID_DATA") {
      }
    };

    workerRef.current.onerror = (error) => {
      console.error("Worker error:", error);
      setLoading(false);
    };

    return () => {
      workerRef.current?.terminate();
      workerRef.current = null;
    };
  }, []);

  const search = useCallback(
    (query: string) => {
      if (!workerRef.current || !ready) return;

      workerRef.current.postMessage({
        type: "SEARCH",
        payload: { query },
      });
    },
    [ready]
  );

  const fetchAsteroidBySpkid = useCallback(
    (spkid: string): Promise<AsteroidRow | null> => {
      return new Promise((resolve) => {
        if (!workerRef.current || !ready) {
          resolve(null);
          return;
        }

        const handleMessage = (e: MessageEvent) => {
          const { type, asteroid } = e.data;

          if (type === "ASTEROID_DATA") {
            workerRef.current?.removeEventListener("message", handleMessage);
            resolve(asteroid || null);
          }
        };

        workerRef.current.addEventListener("message", handleMessage);

        workerRef.current.postMessage({
          type: "FETCH_BY_SPKID",
          payload: { spkid },
        });

        setTimeout(() => {
          workerRef.current?.removeEventListener("message", handleMessage);
          resolve(null);
        }, 5000);
      });
    },
    [ready]
  );

  return { ready, results, search, fetchAsteroidBySpkid, loading };
}

