"use client";
import SolarSystem from "@/solar-system";
import { SiteHeader } from "@/components/panel/site-header";
import { useRef } from "react";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import SelectedPlanetHeader from "@/components/panel/selected-planet-header";
import GeneralControlsPanel from "@/components/panel/scene/general-controls-panel";
import { OrbitalControlsPanel } from "@/components/panel/scene/orbit-controls-panel";
import { AsteroidsPanel } from "@/components/panel/scene/asteroid-panel";

export default function MainContent() {
  const { selectedPlanet } = useSelectedPlanet();
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-1 flex-col border-secondary border-1  rounded-2xl">
      <SiteHeader />
      <div
        ref={containerRef}
        className="relative flex flex-1 flex-col rounded-b-2xl max-w-full max-h-full overflow-hidden"
        style={{ backgroundColor: "oklch(16.932% 0.03326 44.084)" }}
      >
        <div className="@container/main flex flex-1 flex-col">
          {selectedPlanet && <SelectedPlanetHeader />}
          <AsteroidsPanel dragConstraints={containerRef} />
          {<GeneralControlsPanel dragConstraints={containerRef} />}
          {<OrbitalControlsPanel dragConstraints={containerRef} />}
          <div className="flex flex-1 ">
            <SolarSystem />
          </div>
        </div>
      </div>
    </div>
  );
}
