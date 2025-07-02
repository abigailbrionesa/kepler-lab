import MainContent from "./main-content";
import { AppSidebar } from "@/components/panel/app-sidebar";
import { RightSidebar } from "@/components/panel/-/right-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/shadcn/sidebar";
import { SelectedCategoryProvider } from "@/context/selected-category-context";
import { ViewConfigProvider } from "@/context/scene/view-config-context";
import { RightSidebarProvider } from "@/context/right-sidebar-context";
import { SelectedDateProvider } from "@/context/scene/view-selected-date";
import { SelectedPlanetProvider } from "@/context/scene/view-selected-planet";
import { IsObjectPivotProvider } from "@/context/scene/view-is-object-pivot";
import { OccludableRefsProvider } from "@/context/scene/occludable-refs-context";
import { CameraControlProvider } from "@/context/scene/camera-control-context";
import { SelectedAsteroidSpkidProvider } from "@/context/scene/view-selected-asteroid-spkid";
import { CustomObjectsProvider } from "@/context/scene/custom-objects-context";
import { AsteroidProvider } from "@/context/scene/asteroids-context";
export default function Page() {
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <ViewConfigProvider>
          <OccludableRefsProvider>
            <SelectedCategoryProvider>
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
            </SelectedCategoryProvider>
          </OccludableRefsProvider>
        </ViewConfigProvider>
      </RightSidebarProvider>
    </SidebarProvider>
  );
}
