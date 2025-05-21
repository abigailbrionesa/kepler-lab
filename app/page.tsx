"use client"

import { AppSidebar } from "@/components/app-sidebar"
import { SiteHeader } from "@/components/site-header"
import { RightSidebar } from "@/components/right-sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { SelectedCategoryProvider } from "@/context/selected-category-context"
import { ViewConfigProvider } from "@/context/view-config-context"
import { RightSidebarProvider } from "@/context/right-sidebar-context"
import { useSelectedCategory } from "@/context/selected-category-context"
import { ControlPanel } from "@/components/control-panel"
function MainContent() {
  const { selectedCategory } = useSelectedCategory()

  return (
    <div className="flex flex-1 flex-col">
      <SiteHeader />
      <div className="flex flex-1 relative">
        {selectedCategory && <ControlPanel />}
        <div className="flex flex-1">
          <div className="flex h-[calc(100vh-80px)] w-full items-center justify-center rounded-lg border border-dashed">
            <p className="text-lg text-muted-foreground">
              {selectedCategory ? `Viewing ${selectedCategory.title} in 3D` : "Main content area"}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <SelectedCategoryProvider>
      <ViewConfigProvider>
        <RightSidebarProvider>
          <SidebarProvider>
            <AppSidebar variant="inset" />
            <SidebarInset>
              <MainContent />
            </SidebarInset>
            <RightSidebar />
          </SidebarProvider>
        </RightSidebarProvider>
      </ViewConfigProvider>
    </SelectedCategoryProvider>
  )
}
