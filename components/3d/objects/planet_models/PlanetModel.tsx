"use client"
import type { PlanetType } from "@/context/view-selected-planet";
import { EarthModel } from "./Earth";
import MarsModel from "./Mars";
import { JupiterModel } from "./Jupiter";
import MercuryModel from "./Mercury";
import { NeptuneModel } from "./Neptune";
import { SaturnModel } from "./Saturn";
import UranusModel from "./Uranus";
import VenusModel from "./Venus";
import { forwardRef } from "react";

type PlanetModelProps = {
  name: PlanetType;
  scale: number;
  visible?: boolean; 
};

const PlanetModel = forwardRef<any, PlanetModelProps>(({ name, scale }, ref) => {

  return <NeptuneModel ref={ref} scale={scale} />

  {/* 
  switch (name) {
    case 'Earth':
      return <EarthModel ref={ref} scale={scale} />;
    case 'Mars':
      return <MarsModel ref={ref} scale={scale} />;
    case 'Jupiter':
      return <JupiterModel ref={ref} scale={scale} />;
    case 'Venus':
      return <VenusModel ref={ref} scale={scale} />;
    case 'Mercury':
      return <MercuryModel ref={ref} scale={scale} />;
    case 'Neptune':
      return <NeptuneModel ref={ref} scale={scale} />;
    case 'Saturn':
      return <SaturnModel ref={ref} scale={scale} />;
    case 'Uranus':
      return <UranusModel ref={ref} scale={scale} />;
    default:
      return null;
  }*/}
});
export default PlanetModel;
