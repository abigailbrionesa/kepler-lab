"use client"
import type { PlanetType } from "@/context/view-selected-planet";
import { EarthModel } from "./Earth";
import MarsModel from "./Mars";
import { JupiterModel } from "./Jupiter";
import MercuryModel from "./Mercury";
import NeptuneModel from "./Neptune";
import { SaturnModel } from "./Saturn";
import UranusModel from "./Uranus";
import VenusModel from "./Venus";

type PlanetModelProps = {
  name: PlanetType;
  scale: number;
};

export default function PlanetModel({ name, scale }: PlanetModelProps) {
  switch (name) {
    case 'Earth':
      return <EarthModel scale={scale} />;
    case 'Mars':
      return <MarsModel scale={scale} />;
    case 'Jupiter':
      return <JupiterModel scale={scale} />;
    case 'Venus':
      return <VenusModel scale={scale} />;
    case 'Mercury':
      return <MercuryModel scale={scale} />;
    case 'Neptune':
      return <NeptuneModel scale={scale} />;
    case 'Saturn':
      return <SaturnModel scale={scale} />;
    case 'Uranus':
      return <UranusModel scale={scale} />;
    default:
      return null;
  }
}