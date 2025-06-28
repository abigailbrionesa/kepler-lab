"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/supabase";
import { useSelectedAsteroidSpkid } from "@/context/view-selected-asteroid-spkid";
import CelestialObject from "./objects/celestial_object";
import { degToRad } from "three/src/math/MathUtils.js";
import { useSelectedDate } from "@/context/view-selected-date";
import Object from "./objects/object";

export default function Asteroid() {
  const { selectedAsteroidSpkid } = useSelectedAsteroidSpkid();
  const [loading, setLoading] = useState(false);
  const { selectedDate } = useSelectedDate();

  const [asteroidData, setAsteroidData] = useState<any>(null);

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
        console.log(data);
        setAsteroidData(data);
      }
      setLoading(false);
    };

    fetchAsteroid();
  }, [selectedAsteroidSpkid]);

  if (!selectedAsteroidSpkid || loading || !asteroidData) return null;

  const {
    spkid,
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

  const color = "#f5d300";

  return (
    <Object
      key={spkid}
      type="NEA"
      selectedDate={selectedDate}
      objectParams={{
        name: name,
        distance_from_sun: semiMajorAxis * 149597871,
        color: color,
        eccentricity: eccentricity,
        inclination: degToRad(inclination),
        argument_of_periapsis: degToRad(argument_of_periapsis),
        longitude_of_ascending_node: degToRad(longitude_of_ascending_node),
        mean_anomaly: degToRad(mean_anomaly),
        mean_motion: degToRad(mean_motion),
        epoch: epoch,
        spkid: spkid,
      }}
    />
  );
}
