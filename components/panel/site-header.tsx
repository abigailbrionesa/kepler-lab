"use client";

import type React from "react";

import { Separator } from "@/components/ui/shadcn/separator";
import { SidebarTrigger } from "@/components/ui/shadcn/sidebar";
import { useSelectedCategory } from "@/context/selected-category-context";
import { useViewConfig } from "@/context/scene/view-config-context";
import { useRightSidebar } from "@/context/right-sidebar-context";
import { Settings2Icon, TagIcon, InfoIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuCheckboxItem,
  DropdownMenuTrigger,
} from "@/components/ui/shadcn/dropdown-menu";
import { Button } from "@/components/ui/shadcn/button";
import { ThemeToggle } from "./theme-toggle";
import CameraControlsMenu from "./camera-controls-menu";

const CustomOrbitIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <circle cx="12" cy="12" r="3" />
    <circle cx="12" cy="12" r="10" />
    <ellipse cx="12" cy="12" rx="10" ry="4" />
  </svg>
);

export function SiteHeader() {
  const { viewConfig, toggleOption } = useViewConfig();

  return (
    <header
      className=" group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex
     h-12 shrink-0 items-center gap-2 border-b border-secondary  transition-[width,height] ease-linear"
    >
      <div className="flex w-full items-center justify-between px-4 lg:px-6">
        <div className="flex items-center gap-1 lg:gap-2">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mx-2 data-[orientation=vertical]:h-4"
          />
          <h1 className="text-base font-medium flex items-center">
            Celestial Dashboard
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <CameraControlsMenu />

          <>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="gap-1.5">
                  <Settings2Icon className="h-4 w-4" />
                  <span>Config</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuLabel>Display Options</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={viewConfig.labels}
                  onCheckedChange={() => toggleOption("labels")}
                >
                  <TagIcon className="mr-2 h-4 w-4" />
                  <span>Show Labels</span>
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={viewConfig.orbits}
                  onCheckedChange={() => toggleOption("orbits")}
                >
                  <CustomOrbitIcon className="mr-2 h-4 w-4" />
                  <span>Show Orbits</span>
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
