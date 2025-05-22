"use client"
import { useSelectedCategory } from "@/context/selected-category-context"
import SolarSystem from "@/components/3d/solar-system"
import { ControlPanel } from "@/components/panel/control-panel"
import { SiteHeader } from "@/components/panel/site-header"
import type { Planet } from "@prisma/client"

export default function MainContent({planets_data}: {planets_data: Planet[]}) {
  const { selectedCategory } = useSelectedCategory()

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 relative">
        {selectedCategory && <ControlPanel />}
        <div className="flex flex-1">
          <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center rounded-lg border border-dashed">
            <SolarSystem planets_data={planets_data} />
          </div>
        </div>
      </div>
    </div>
  )
}
