import MainContent from "./main-content";
import { AppSidebar } from "@/components/panel/app-sidebar";
import { RightSidebar } from "@/components/panel/right-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SelectedCategoryProvider } from "@/context/selected-category-context";
import { ViewConfigProvider } from "@/context/view-config-context";
import { RightSidebarProvider } from "@/context/right-sidebar-context";
import { SelectedDateProvider } from "@/context/view-selected-date";
import { SelectedPlanetProvider } from "@/context/view-selected-planet";
import { IsObjectPivotProvider } from "@/context/view-is-object-pivot";
import { OccludableRefsProvider } from "@/context/occludable-refs-context";
import { CameraControlProvider } from "@/context/camera-control-context";
import { OrbitCreatorParamsProvider } from "@/context/orbit-creator-params-context";
import { SelectedAsteroidSpkidProvider } from "@/context/view-selected-asteroid-spkid";
import { CustomObjectsProvider } from "@/context/custom-objects-context";
import { AsteroidProvider } from "@/context/asteroids-context";
export default function Page() {
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <ViewConfigProvider>
          <OccludableRefsProvider>
            <SelectedCategoryProvider>
              <OrbitCreatorParamsProvider>
                <CustomObjectsProvider>
                  <AsteroidProvider> 
                  <SelectedDateProvider>
                    <SelectedAsteroidSpkidProvider>
                      <SelectedPlanetProvider>
                        <IsObjectPivotProvider>
                          <CameraControlProvider>
                            <AppSidebar variant="inset" />
                            <SidebarInset>
                              <MainContent />
                            </SidebarInset>
                            <RightSidebar />
                          </CameraControlProvider>
                        </IsObjectPivotProvider>
                      </SelectedPlanetProvider>
                    </SelectedAsteroidSpkidProvider>
                  </SelectedDateProvider>
                  </AsteroidProvider>
                </CustomObjectsProvider>
              </OrbitCreatorParamsProvider>
            </SelectedCategoryProvider>
          </OccludableRefsProvider>
        </ViewConfigProvider>
      </RightSidebarProvider>
    </SidebarProvider>
  );
}
