"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useSelectedAsteroidSpkid } from "@/context/view-selected-asteroid-spkid";
import CelestialObject from "./objects/celestial_object";
import { degToRad } from "three/src/math/MathUtils.js";

export default function Asteroid() {
  const { selectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const [loading, setLoading] = useState(false);
  const [asteroidData, setAsteroidData] = useState<any>(null);
console.log(selectedAsteroidSpkid, "is spkid")
  useEffect(() => {
    const fetchAsteroid = async () => {
      if (!selectedAsteroidSpkid) return;

      setLoading(true);
      const { data, error } = await supabase
        .from("asteroids")
        .select("*")
        .eq("spkid", selectedAsteroidSpkid)
        .single();

      if (error) {
        console.error("Failed to fetch asteroid data", error);
        setAsteroidData(null);
      } else {
        console.log(data)
        setAsteroidData(data);
      }
      setLoading(false);
    };

    fetchAsteroid();
  }, [selectedAsteroidSpkid]);

  if (!selectedAsteroidSpkid || loading || !asteroidData) return null;

  const {
    a: semiMajorAxis, //au
    e: eccentricity, 
    per_y: orbitalPeriod, //
    H: magnitude,
    i: inclination, //deg
    w: argument_of_periapsis, //deg
    om: longitude_of_ascending_node, //deg
    ma: mean_anomaly, //deg
    n: mean_motion, //deg
    epoch,
    full_name: name,
  } = asteroidData;

  console.log(asteroidData, "lol")

  const diameter = 10; 
  const albedo = 0.14;
  const color = "#f5d300"; 

  return (
    <CelestialObject
      semiMajorAxis={semiMajorAxis * 149597871}
      eccentricity={eccentricity}
      orbitalPeriod={orbitalPeriod}
      albedo={albedo}
      magnitude={magnitude}
      diameter={diameter}
      inclination={degToRad(inclination)}
      argument_of_periapsis={degToRad(argument_of_periapsis)}
      longitude_of_ascending_node={degToRad(longitude_of_ascending_node)}
      mean_anomaly={degToRad(mean_anomaly)}
      mean_motion={degToRad(mean_motion)}
      epoch={epoch}
      name={name}
      color={color}
    />
  );
}
