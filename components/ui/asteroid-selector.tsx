"use client";
import { useAsteroids } from "@/context/scene/asteroids-context";
import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/shadcn/command";
import { useDebounce } from "use-debounce";
import { useSelectedAsteroidSpkid } from "@/context/scene/view-selected-asteroid-spkid";
import { cn, getRandomColor } from "@/lib/utils";
import type { AsteroidRow, AsteroidOption } from "@/lib/types";
import { useAsteroidSearch } from "@/hooks/use-asteroid-search";
import { degToRad } from "three/src/math/MathUtils.js";

function formatAsteroid(data: AsteroidRow) {
  return {
    id: String(data.spkid),
    name: data.full_name.trim(),
    distance_from_sun: data.a * 149597871,
    color: getRandomColor(),
    eccentricity: data.e,
    orbital_period: parseFloat(data.per),
    albedo: data.albedo ?? 0.1,
    magnitude: data.H,
    diameter: data.diameter ?? 0,
    inclination: degToRad(data.i),
    argument_of_periapsis: degToRad(data.w),
    longitude_of_ascending_node: degToRad(data.om),
    mean_anomaly: degToRad(data.ma),
    mean_motion: degToRad(data.n),
    epoch: data.epoch,
  };
}

export function AsteroidSelector({ className }: { className?: string }) {
  const { setSelectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const { asteroids, addAsteroid } = useAsteroids();
  const { ready, results, search, fetchAsteroidBySpkid, loading: searchLoading } = useAsteroidSearch();

  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);
  const [options, setOptions] = useState<AsteroidOption[]>([]);
  const [fetching, setFetching] = useState(false);
  const [, setSelected] = useState<AsteroidOption | null>(null);

  // Update search results when worker returns them
  useEffect(() => {
    if (!ready) return;

    const usedSpkids = new Set(asteroids.map((a) => a.id));

    const filtered = results
      .filter((result) => !usedSpkids.has(String(result.spkid)))
      .slice(0, 3)
      .map((result) => ({
        id: String(result.spkid),
        full_name: result.full_name,
      }));

    setOptions(filtered);
  }, [results, asteroids, ready]);

  // Trigger search when debounced input changes
  useEffect(() => {
    if (!ready) return;
    search(debouncedInput || "");
  }, [debouncedInput, ready, search]);

  const handleSearchName = (query: string) => {
    if (!ready) return;
    search(query);
  };

  const fetchFullAsteroidData = async (spkid: string) => {
    if (!ready) {
      console.error("Search worker not ready");
      return;
    }

    setFetching(true);

    try {
      const asteroidData = await fetchAsteroidBySpkid(spkid);

      if (asteroidData) {
        const formatted = formatAsteroid(asteroidData);

        addAsteroid(formatted);
        setSelectedAsteroidSpkid(spkid);

        setOptions((prevOptions) => {
          const updated = prevOptions.filter(
            (opt) => String(opt.id) !== String(spkid)
          );
          return updated;
        });
      } else {
        console.error("Asteroid not found:", spkid);
      }
    } catch (error) {
      console.error("Error fetching asteroid data:", error);
    } finally {
      setFetching(false);
    }
  };

  return (
    <div className={cn("w-full", className)}>
      <Command>
        <CommandInput
          value={input}
          onValueChange={setInput}
          onFocus={() => handleSearchName("")}
          placeholder="Search asteroids..."
        />
        <CommandList className="max-h-60 overflow-y-auto">
          {!ready || searchLoading ? (
            <CommandItem disabled>Loading...</CommandItem>
          ) : fetching ? (
            <CommandItem disabled>Fetching asteroid data...</CommandItem>
          ) : options.length > 0 ? (
            options.map((asteroid) => (
              <CommandItem
                key={asteroid.id}
                onSelect={() => {
                  const trimmedName = asteroid.full_name.trim();
                  setSelected({ ...asteroid, full_name: trimmedName });
                  setInput(trimmedName);
                  fetchFullAsteroidData(String(asteroid.id));
                  setInput("");
                }}
              >
                {asteroid.full_name}
              </CommandItem>
            ))
          ) : (
            <CommandItem disabled>No matches found</CommandItem>
          )}
        </CommandList>
      </Command>
    </div>
  );
}
