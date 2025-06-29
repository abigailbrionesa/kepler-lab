"use client";
import { useAsteroids } from "@/context/asteroids-context";
import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import { useSelectedAsteroidSpkid } from "@/context/view-selected-asteroid-spkid";
import { cn } from "@/lib/utils";
import type { AsteroidRow, AsteroidOption } from "@/lib/types";
import { supabase } from "@/lib/supabase/supabase";

function formatAsteroid(data: AsteroidRow) {
  return {
    spkid: String(data.spkid),
    full_name: data.full_name.trim(),
    semiMajorAxis: data.a,
    eccentricity: data.e,
    orbitalPeriod: parseFloat(data.per),
    albedo: data.albedo ?? 0.1,
    magnitude: data.H,
    diameter: data.diameter ?? 0,
    inclination: data.i,
    argument_of_periapsis: data.w,
    longitude_of_ascending_node: data.om,
    mean_anomaly: data.ma,
    mean_motion: data.n,
    epoch: data.epoch,
  };
}

export function AsteroidSelector({ className }: { className?: string }) {
  const { setSelectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const { asteroids, addAsteroid } = useAsteroids();

  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);
  const [options, setOptions] = useState<AsteroidOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [, setSelected] = useState<AsteroidOption | null>(null);

  const handleSearchName = async (query: string) => {
    setLoading(true);

    const { data, error } = await supabase
      .from("asteroids")
      .select("spkid, full_name")
      .ilike("full_name", `%${query}%`)
      .order("condition_code", { ascending: true })
      .limit(10);

    if (error) {
      console.error(error);
    }

    if (data) {
      const usedSpkids = new Set(asteroids.map((a) => a.spkid));

      const filtered = data
        .filter((a) => !usedSpkids.has(String(a.spkid)))
        .slice(0, 3);

      setOptions(filtered);
    }

    setLoading(false);
  };

  const fetchFullAsteroidData = async (spkid: string) => {
    const { data, error } = await supabase
      .from("asteroids")
      .select("*")
      .eq("spkid", spkid)
      .single();

    if (error) {
      console.error(error);
    }

    if (data) {
      const formatted = formatAsteroid(data);

      addAsteroid(formatted);
      setSelectedAsteroidSpkid(spkid);

      setOptions((prevOptions) => {
        const updated = prevOptions.filter(
          (opt) => String(opt.spkid) !== String(spkid),
        );
        return updated;
      });
    }
  };

  useEffect(() => {
    handleSearchName(debouncedInput || "");
  }, [debouncedInput, asteroids]);

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
          {loading ? (
            <CommandItem disabled>Loading...</CommandItem>
          ) : options.length > 0 ? (
            options.map((asteroid) => (
              <CommandItem
                key={asteroid.spkid}
                onSelect={() => {
                  const trimmedName = asteroid.full_name.trim();
                  setSelected({ ...asteroid, full_name: trimmedName });
                  setInput(trimmedName);
                  fetchFullAsteroidData(String(asteroid.spkid));
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
