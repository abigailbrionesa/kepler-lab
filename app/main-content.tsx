"use client";
import SolarSystem from "@/components/3d/solar-system";
import { SiteHeader } from "@/components/panel/site-header";
import { useRef } from "react";
import { useSelectedPlanet } from "@/context/view-selected-planet";
import SelectedPlanetHeader from "@/components/panel/selected-planet-header";
import ControlsPanel from "@/components/panel/controls-panel";
import { OrbitalControlsPanel } from "@/components/panel/orbit-controls-panel";
import { AsteroidsPanel } from "@/components/panel/asteroid-panel";
export default function MainContent() {
  const { selectedPlanet } = useSelectedPlanet();
  const containerRef = useRef<HTMLDivElement>(null);
  return (
    <div className="flex flex-1 flex-col border-secondary border-1  rounded-2xl">
      <SiteHeader />
      <div ref={containerRef} className="relative flex flex-1 flex-col">
        <div className="@container/main flex flex-1 flex-col">
          {selectedPlanet && <SelectedPlanetHeader />}
          <AsteroidsPanel dragConstraints={containerRef}/>
          {<ControlsPanel dragConstraints={containerRef} />}
          {<OrbitalControlsPanel dragConstraints={containerRef} />}
          <div className="flex flex-1">
            <SolarSystem />
          </div>
        </div>
      </div>
    </div>
  );
}
