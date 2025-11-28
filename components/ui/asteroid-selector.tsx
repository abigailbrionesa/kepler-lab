"use client";
import { useAsteroids } from "@/context/scene/asteroids-context";
import { useEffect, useState, useCallback } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/shadcn/command";
import { Slider } from "@/components/ui/shadcn/slider";
import { Button } from "@/components/ui/shadcn/button";
import { Input } from "@/components/ui/shadcn/input";
import { Label } from "@/components/ui/shadcn/label";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "./collapsible";
import { ChevronDown, ChevronUp, Filter, X } from "lucide-react";
import { useDebounce } from "use-debounce";
import { useSelectedAsteroidSpkid } from "@/context/scene/view-selected-asteroid-spkid";
import { cn, getRandomColor } from "@/lib/utils";
import type { AsteroidRow, AsteroidOption } from "@/lib/types";
import { useAsteroidSearch, type SearchFilters } from "@/hooks/use-asteroid-search";
import { degToRad } from "three/src/math/MathUtils.js";
import { useRef } from "react";
import { useVirtualizer } from '@tanstack/react-virtual';
// Format number with specified decimal places
const formatNumber = (num: number, decimals: number = 2) => {
  return Number(num.toFixed(decimals)).toLocaleString();
};

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

export function AsteroidSelector({ className }: { className?: string }) {
  const { setSelectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const { asteroids, addAsteroid } = useAsteroids();
  const {
    ready,
    results,
    search,
    fetchAsteroidBySpkid,
    loading: searchLoading,
    stats,
    count
  } = useAsteroidSearch();

  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);
  const [options, setOptions] = useState<AsteroidOption[]>([]);
  const [fetching, setFetching] = useState(false);
  const [selected, setSelected] = useState<AsteroidOption | null>(null);
  const [filters, setFilters] = useState<FilterState>({});
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [debouncedFilters] = useDebounce(filters, 300);

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

  const handleSearchName = useCallback((query: string) => {
    if (!ready) return;
    setInput(query);
  }, [ready]);

  const handleFilterChange = useCallback((key: keyof FilterState, value: number | undefined) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  }, []);

  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  const hasActiveFilters = Object.values(filters).some(v => v !== undefined);

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

  const parentRef = useRef<HTMLDivElement>(null);

  const rowVirtualizer = useVirtualizer({
    count: options.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    overscan: 5,
  });


  return (
    <div className={cn("w-full", className)}>
      <Command>
        <CommandInput
          value={input}
          onValueChange={setInput}
          onFocus={() => handleSearchName("")}
          placeholder="Search asteroids..."
        />
      </Command>

      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button variant="outline" size="sm" className="mb-2">
            {isFiltersOpen ? <ChevronUp className="mr-2 h-4 w-4" /> : <ChevronDown className="mr-2 h-4 w-4" />}
            Filters
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-4">
          <div className="space-y-4 rounded-md border p-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="distance-range">Distance from Sun (km)</Label>
                <span className="text-xs text-muted-foreground">
                  {filters.minDistance ? formatNumber(filters.minDistance) : 'min'} -
                  {filters.maxDistance ? formatNumber(filters.maxDistance) : 'max'}
                </span>
              </div>
              <Slider
                id="distance-range"
                min={stats?.minDistance || 0}
                max={stats?.maxDistance || 1000000000}
                step={1000000}
                value={[
                  filters.minDistance || stats?.minDistance || 0,
                  filters.maxDistance || stats?.maxDistance || 1000000000
                ]}
                onValueChange={([min, max]) => {
                  handleFilterChange('minDistance', min);
                  handleFilterChange('maxDistance', max);
                }}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="eccentricity-range">Eccentricity</Label>
                <span className="text-xs text-muted-foreground">
                  {filters.minEccentricity?.toFixed(2) || '0.00'} -
                  {filters.maxEccentricity?.toFixed(2) || '1.00'}
                </span>
              </div>
              <Slider
                id="eccentricity-range"
                min={0}
                max={1}
                step={0.01}
                value={[
                  filters.minEccentricity || 0,
                  filters.maxEccentricity || 1
                ]}
                onValueChange={([min, max]) => {
                  handleFilterChange('minEccentricity', min);
                  handleFilterChange('maxEccentricity', max);
                }}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="inclination-range">Inclination (degrees)</Label>
                <span className="text-xs text-muted-foreground">
                  {filters.minInclination?.toFixed(1) || '0.0'}° -
                  {filters.maxInclination?.toFixed(1) || '180.0'}°
                </span>
              </div>
              <Slider
                id="inclination-range"
                min={0}
                max={180}
                step={0.1}
                value={[
                  filters.minInclination || 0,
                  filters.maxInclination || 180
                ]}
                onValueChange={([min, max]) => {
                  handleFilterChange('minInclination', min);
                  handleFilterChange('maxInclination', max);
                }}
                className="py-4"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="magnitude-range">Absolute Magnitude (H)</Label>
                <span className="text-xs text-muted-foreground">
                  {filters.minMagnitude?.toFixed(1) || stats?.minMagnitude?.toFixed(1) || '0.0'} -
                  {filters.maxMagnitude?.toFixed(1) || stats?.maxMagnitude?.toFixed(1) || '30.0'}
                </span>
              </div>
              <Slider
                id="magnitude-range"
                min={stats?.minMagnitude || 0}
                max={stats?.maxMagnitude || 30}
                step={0.1}
                value={[
                  filters.minMagnitude || stats?.minMagnitude || 0,
                  filters.maxMagnitude || stats?.maxMagnitude || 30
                ]}
                onValueChange={([min, max]) => {
                  handleFilterChange('minMagnitude', min);
                  handleFilterChange('maxMagnitude', max);
                }}
                className="py-4"
              />
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <Command className="rounded-lg border shadow-md">
        <div className="relative">
          <CommandInput
            placeholder="Search asteroids by name..."
            value={input}
            onValueChange={setInput}
            className="h-12"
          />
          {input && (
            <button
              onClick={() => setInput('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-1 text-muted-foreground hover:bg-muted"
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
        <CommandList
          ref={parentRef}
          className="max-h-[400px] overflow-auto relative"
        >
          {options.length > 0 ? (
            <div
              style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
            >
              {rowVirtualizer.getVirtualItems().map((virtualRow) => {
                const option = options[virtualRow.index];
                return (
                  <CommandItem
                    key={option.id}
                    value={option.full_name}
                    onSelect={() => {
                      setSelected(option);
                      fetchFullAsteroidData(option.id);
                    }}
                    className={cn(
                      "cursor-pointer",
                      selected?.id === option.id && "bg-accent"
                    )}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      transform: `translateY(${virtualRow.start}px)`,
                    }}
                  >
                    <div className="flex w-full items-center justify-between">
                      <span>{option.full_name}</span>
                      <div className="flex space-x-4 text-xs text-muted-foreground">
                        <span>a: {formatNumber(option.a! * 149597871, 0)} km</span>
                        <span>e: {option.e?.toFixed(3)}</span>
                        <span>i: {option.i?.toFixed(1)}°</span>
                        <span>H: {option.H?.toFixed(1)}</span>
                      </div>
                    </div>
                  </CommandItem>
                );
              })}
            </div>
          ) : (
            <CommandEmpty>
              {searchLoading ? 'Searching...' : 'No asteroids found. Try adjusting your search or filters.'}
            </CommandEmpty>
          )}
        </CommandList>

      </Command>
    </div>
  );
}
