import MainContent from "./main-content";
import { AppSidebar } from "@/components/panel/app-sidebar";
import { RightSidebar } from "@/components/panel/right-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { SelectedCategoryProvider } from "@/context/selected-category-context";
import { ViewConfigProvider } from "@/context/view-config-context";
import { RightSidebarProvider } from "@/context/right-sidebar-context";
import { SelectedDateProvider } from "@/context/view-selected-date";
import { getPlanets } from "./actions/getPlanets";
import { SelectedPlanetProvider } from "@/context/view-selected-planet";

export default async function Page() {
  const planets_data = await getPlanets();

  if (!planets_data) return null;
  return (
    <SidebarProvider>
      <RightSidebarProvider>
        <ViewConfigProvider>
          <SelectedCategoryProvider>
            <SelectedDateProvider>
              <SelectedPlanetProvider>
                <AppSidebar variant="inset" />
                <SidebarInset>
                  <MainContent planets_data={planets_data} />
                </SidebarInset>
                <RightSidebar />
              </SelectedPlanetProvider>
            </SelectedDateProvider>
          </SelectedCategoryProvider>
        </ViewConfigProvider>
      </RightSidebarProvider>
    </SidebarProvider>


  );
}
