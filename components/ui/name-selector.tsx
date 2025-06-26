"use client";

import { useEffect, useState } from "react";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useDebounce } from "use-debounce";
import { createClient } from "@/lib/supabase/client";

type AsteroidOption = { spkid: number; full_name: string };

const supabase = createClient();

export function AsteroidSelector() {
  const [input, setInput] = useState("");
  const [debouncedInput] = useDebounce(input, 300);
  const [options, setOptions] = useState<AsteroidOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [selected, setSelected] = useState<AsteroidOption | null>(null);

  const handleSearchName = async (query: string) => {
    setLoading(true);
    console.log(query, "is query");
    const { data, error } = await supabase
      .from("asteroids")
      .select("spkid, full_name")
      .ilike("full_name", `%${query}%`)
      .order("condition_code", { ascending: true })
      .limit(5);

    if (!error && data) setOptions(data);
    setLoading(false);
  };
  useEffect(() => {
    handleSearchName(debouncedInput || "");
  }, [debouncedInput]);

  return (
    <div className="w-full max-w-md">
      <Command>
        <CommandInput
          value={input}
          onValueChange={setInput}
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
                  setSelected(asteroid);
                  setInput(asteroid.full_name);
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

      {selected && (
        <p className="text-sm mt-2 text-muted-foreground">
          You selected: <strong>{selected.full_name}</strong>
        </p>
      )}
    </div>
  );
}
