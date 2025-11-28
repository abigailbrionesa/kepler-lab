"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useVirtualizer } from "@tanstack/react-virtual";
import { useDebounce } from "use-debounce";
import { degToRad } from "three/src/math/MathUtils.js";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import { useAsteroids } from "@/context/scene/asteroids-context";
import { useSelectedAsteroidSpkid } from "@/context/scene/view-selected-asteroid-spkid";
import {
  Command,
  CommandInput,
  CommandItem,
} from "@/components/ui/shadcn/command";
import { Slider } from "@/components/ui/shadcn/slider";
import { Button } from "@/components/ui/shadcn/button";
import { Label } from "@/components/ui/shadcn/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { cn, getRandomColor } from "@/lib/utils";
import type { AsteroidRow, AsteroidOption } from "@/lib/types";
import { useAsteroidSearch, type SearchFilters } from "@/hooks/use-asteroid-search";

const DEBOUNCE_DELAY = 300;
const SEARCH_INPUT_PLACEHOLDER = "Search asteroids by name...";
const VIRTUALIZER_OVERSCAN = 5;
const VIRTUALIZER_ESTIMATED_SIZE = 50;
const MAX_VIRTUAL_HEIGHT = 100;
const DECIMAL_PLACES = 2;
const ECCENTRICITY_STEP = 0.01;
const INCLINATION_STEP = 0.1;
const MAGNITUDE_STEP = 0.1;
const INCLINATION_MAX = 180;
const MAGNITUDE_DEFAULT_MAX = 30;
const DISTANCE_STEP = 1000000;

const formatNumber = (num: number, decimals: number = 2) => {
  return Number(num.toFixed(decimals)).toLocaleString();
};


const formatAsteroid = (data: AsteroidRow) => {
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
};

interface FilterState {
  minDistance?: number;
  maxDistance?: number;
  minEccentricity?: number;
  maxEccentricity?: number;
  minInclination?: number;
  maxInclination?: number;
  minMagnitude?: number;
  maxMagnitude?: number;
}

interface AsteroidSelectorProps {
  className?: string;
}

export function AsteroidSelector({ className }: AsteroidSelectorProps) {
  const { setSelectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const { asteroids, addAsteroid } = useAsteroids();
  const {
    ready,
    results,
    search,
    fetchAsteroidBySpkid,
    loading: searchLoading,
    stats,
    count,
  } = useAsteroidSearch();

  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, DEBOUNCE_DELAY);
  const [options, setOptions] = useState<AsteroidOption[]>([]);
  const [fetching, setFetching] = useState(false);
  const [filters, setFilters] = useState<FilterState>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [debouncedFilters] = useDebounce(filters, DEBOUNCE_DELAY);

  // Refs
  const parentRef = useRef<HTMLDivElement>(null);
  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current!,
    estimateSize: () => VIRTUALIZER_ESTIMATED_SIZE,
    overscan: VIRTUALIZER_OVERSCAN,
  });

  // Update options when results change
  useEffect(() => {
    if (!ready) return;

    const usedSpkids = new Set(asteroids.map((a) => a.id));

    const filtered = results
      .filter((result) => !usedSpkids.has(String(result.spkid)))
      .map((result) => ({
        id: String(result.spkid),
        full_name: result.full_name,
        a: result.a,
        e: result.e,
        i: result.i,
        H: result.H,
      }));

    setOptions(filtered);
  }, [results, asteroids, ready]);

  useEffect(() => {
    if (!ready) return;
    search(debouncedInput || "", debouncedFilters);
  }, [debouncedInput, debouncedFilters, ready, search]);

  // Filter handlers
  const handleFilterChange = useCallback(
    (key: keyof FilterState, value: number | undefined) => {
      setFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    []
  );

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined);

  const fetchFullAsteroidData = useCallback(
    async (spkid: string) => {
      if (!ready) {
        return;
      }

      setFetching(true);
      try {
        const asteroidData = await fetchAsteroidBySpkid(spkid);
        if (asteroidData) {
          const formatted = formatAsteroid(asteroidData);
          addAsteroid(formatted);
          setSelectedAsteroidSpkid(spkid);
          setOptions((prevOptions) =>
            prevOptions.filter((opt) => String(opt.id) !== String(spkid))
          );
        }
      } finally {
        setFetching(false);
      }
    },
    [ready, fetchAsteroidBySpkid, addAsteroid, setSelectedAsteroidSpkid]
  );

  const renderFilterSlider = (
    id: string,
    label: string,
    min: number,
    max: number,
    step: number,
    minKey: keyof FilterState,
    maxKey: keyof FilterState,
    formatValue: (val: number) => string
  ) => (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {filters[minKey] !== undefined ? formatValue(filters[minKey] as number) : formatValue(min)} -
          {filters[maxKey] !== undefined ? formatValue(filters[maxKey] as number) : formatValue(max)}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={[filters[minKey] as number || min, filters[maxKey] as number || max]}
        onValueChange={([minVal, maxVal]) => {
          handleFilterChange(minKey, minVal);
          handleFilterChange(maxKey, maxVal);
        }}
        className="py-4"
      />
    </div>
  );

  return (
    <div className={cn("w-full", className)}>
      {/* Filters Section */}
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="mb-2">
            {isFiltersOpen ? (
              <ChevronUp className="mr-2 h-4 w-4" />
            ) : (
              <ChevronDown className="mr-2 h-4 w-4" />
            )}
            Filters
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div className="space-y-4 rounded-md border p-4">
            {renderFilterSlider(
              "distance-range",
              "Distance from Sun (km)",
              stats?.minDistance || 0,
              stats?.maxDistance || 1000000000,
              DISTANCE_STEP,
              "minDistance",
              "maxDistance",
              (val) => formatNumber(val, DECIMAL_PLACES)
            )}

            {renderFilterSlider(
              "eccentricity-range",
              "Eccentricity",
              0,
              1,
              ECCENTRICITY_STEP,
              "minEccentricity",
              "maxEccentricity",
              (val) => val.toFixed(2)
            )}

            {renderFilterSlider(
              "inclination-range",
              "Inclination (degrees)",
              0,
              INCLINATION_MAX,
              INCLINATION_STEP,
              "minInclination",
              "maxInclination",
              (val) => `${val.toFixed(1)}°`
            )}

            {renderFilterSlider(
              "magnitude-range",
              "Absolute Magnitude (H)",
              stats?.minMagnitude || 0,
              stats?.maxMagnitude || MAGNITUDE_DEFAULT_MAX,
              MAGNITUDE_STEP,
              "minMagnitude",
              "maxMagnitude",
              (val) => val.toFixed(1)
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
      <Command className="rounded-lg border shadow-md">
        <div className="relative">
          <CommandInput
            placeholder={SEARCH_INPUT_PLACEHOLDER}
            value={input}
            onValueChange={setInput}
            className="h-12"
          />
          {input && (
            <button
              onClick={() => setInput("")}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
              aria-label="Clear search input"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {ready && (
          <div className="mb-2 text-sm text-muted-foreground">
            {count} asteroid{count !== 1 ? "s" : ""} found
          </div>
        )}

        {/* Virtualized List */}
        <div
          ref={parentRef}
          className={`relative overflow-auto`}
          style={{ maxHeight: `${MAX_VIRTUAL_HEIGHT}px` }}
        >
          <div style={{ height: rowVirtualizer.getTotalSize(), position: "relative" }}>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const option = options[virtualRow.index];
              return (
                <CommandItem
                  key={option.id}
                  value={option.full_name}
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onSelect={() => fetchFullAsteroidData(option.id)}
                >
                  <div className="flex w-full items-center justify-between">
                    <span>{option.full_name}</span>
                  </div>
                </CommandItem>
              );
            })}
          </div>
        </div>
      </Command>
    </div>
  );
}
