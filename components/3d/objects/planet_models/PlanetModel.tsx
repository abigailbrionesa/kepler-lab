"use client"
import type { PlanetType } from "@/context/view-selected-planet";
import { EarthModel } from "./Earth";
import { MarsModel } from "./Mars";
import { JupiterModel } from "./Jupiter";
import { MercuryModel } from "./Mercury";
import { NeptuneModel } from "./Neptune";
import { SaturnModel } from "./Saturn";
import { UranusModel } from "./Uranus";
import { VenusModel } from "./Venus";
import { forwardRef } from "react";
import type { Mesh } from "three";

type PlanetModelProps = {
  name: PlanetType;
  scale: number;
} & React.ComponentProps<'group'>;  

const PlanetModel = forwardRef<Mesh, PlanetModelProps>((props, ref) => {
  const { name, scale, ...rest } = props;

  switch (name) {
    case "Earth":
      return <EarthModel ref={ref} scale={scale} {...rest} />;
    case "Mars":
      return <MarsModel ref={ref} scale={scale} {...rest} />;
    case "Jupiter":
      return <JupiterModel ref={ref} scale={scale} {...rest} />;
    case "Venus":
      return <VenusModel ref={ref} scale={scale} {...rest} />;
    case "Mercury":
      return <MercuryModel ref={ref} scale={scale} {...rest} />;
    case "Neptune":
      return <NeptuneModel ref={ref} scale={scale} {...rest} />;
    case "Saturn":
      return <SaturnModel ref={ref} scale={scale} {...rest} />;
    case "Uranus":
      return <UranusModel ref={ref} scale={scale} {...rest} />;
    default:
      return null;
  }
});

PlanetModel.displayName = "PlanetModel";

export default PlanetModel;
