"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import type { AsteroidRow } from "@/lib/types";

export type SearchResult = {
  spkid: string;
  full_name: string;
  condition_code?: number;
  a?: number;
  e?: number;
  i?: number;
  H?: number;
};

export type SearchStats = {
  total: number;
  minDistance: number;
  maxDistance: number;
  minEccentricity: number;
  maxEccentricity: number;
  minInclination: number;
  maxInclination: number;
  minMagnitude: number;
  maxMagnitude: number;
};

export type SearchFilters = {
  minDistance?: number;
  maxDistance?: number;
  minEccentricity?: number;
  maxEccentricity?: number;
  minInclination?: number;
  maxInclination?: number;
  minMagnitude?: number;
  maxMagnitude?: number;
};

export function useAsteroidSearch() {
  const workerRef = useRef<Worker | null>(null);
  const [ready, setReady] = useState(false);
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<SearchStats | null>(null);
  const [count, setCount] = useState(0);

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
        setStats(e.data.stats);
      }

      if (type === "RESULTS") {
        setResults(e.data.results || []);
        setCount(e.data.count || 0);
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
    (query: string, filters: SearchFilters = {}) => {
      if (!workerRef.current || !ready) return;

      workerRef.current.postMessage({
        type: "SEARCH",
        payload: { query, filters },
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

  return { 
    ready, 
    results, 
    search, 
    fetchAsteroidBySpkid, 
    loading, 
    stats, 
    count 
  };
}

