"use client";
import { EarthModel } from "./Earth";
import { MarsModel } from "./Mars";
import { JupiterModel } from "./Jupiter";
import { MercuryModel } from "./Mercury";
import { NeptuneModel } from "./Neptune";
import { SaturnModel } from "./Saturn";
import { UranusModel } from "./Uranus";
import { VenusModel } from "./Venus";
import { forwardRef } from "react";
import type { Group } from "three";
import type { PlanetType } from "@/lib/types";

export type PlanetModelProps = {
  name: PlanetType;
} & React.ComponentProps<"group">;

const PlanetModel = forwardRef<Group, PlanetModelProps>((props, ref) => {
  const { name, ...rest } = props;

  switch (name) {
    case "Earth":
      return <EarthModel ref={ref} {...rest} />;
    case "Mars":
      return <MarsModel ref={ref} {...rest} />;
    case "Jupiter":
      return <JupiterModel ref={ref} {...rest} />;
    case "Venus":
      return <VenusModel ref={ref} {...rest} />;
    case "Mercury":
      return <MercuryModel ref={ref} {...rest} />;
    case "Neptune":
      return <NeptuneModel ref={ref} {...rest} />;
    case "Saturn":
      return <SaturnModel ref={ref} {...rest} />;
    case "Uranus":
      return <UranusModel ref={ref} {...rest} />;
    default:
      return null;
  }
});

PlanetModel.displayName = "PlanetModel";

export default PlanetModel;
