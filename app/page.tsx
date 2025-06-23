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
export default function Page() {
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <ViewConfigProvider>
          <OccludableRefsProvider> 
          <SelectedCategoryProvider>
            <SelectedDateProvider>
              <SelectedPlanetProvider>
                <IsObjectPivotProvider> 
                <AppSidebar variant="inset" />
                <SidebarInset>
                  <MainContent/>
                </SidebarInset>
                <RightSidebar />
                </IsObjectPivotProvider>
              </SelectedPlanetProvider>
            </SelectedDateProvider>
          </SelectedCategoryProvider>
          </OccludableRefsProvider>
        </ViewConfigProvider>
      </RightSidebarProvider>
    </SidebarProvider>


  );
}
