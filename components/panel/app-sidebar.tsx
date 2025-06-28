"use client";

import type * as React from "react";
import { useState } from "react";
import {
  SettingsIcon,
  BookOpenIcon,
  StarIcon,
  ShareIcon,
  SatelliteIcon,
  RocketIcon as MeteorIcon,
  AlertTriangleIcon,
  GraduationCapIcon,
} from "lucide-react";

// import { ChevronDownIcon, ArrowUpCircleIcon } from "lucide-react";

import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
  SidebarContent,
} from "@/components/ui/sidebar";

// import { , SidebarGroup, SidebarGroupContent } from "@/components/ui/sidebar";
{
  /* 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { NavUser } from "./nav-user";*/
}
import {
  useSelectedCategory,
  type CategoryType,
} from "@/context/selected-category-context";
import { CreatorInfo } from "./creator-info";

const OrbitIcon = (props: React.SVGProps<SVGSVGElement>) => (
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

const Cube3dIcon = (props: React.SVGProps<SVGSVGElement>) => (
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
    <path d="M12 3v18" />
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </svg>
);

const data = {
  user: {
    name: "John Doe",
    email: "john@example.com",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  navMain: [
    {
      title: "See 3D Objects",
      icon: Cube3dIcon,
      isDropdown: true,
      submenu: [
        {
          title: "Planets",
          url: "#planets",
          icon: SatelliteIcon,
          type: "planets" as CategoryType,
        },
        {
          title: "NEAs",
          url: "#neas",
          icon: SatelliteIcon,
          type: "neas" as CategoryType,
        },
        {
          title: "NECs",
          url: "#necs",
          icon: MeteorIcon,
          type: "necs" as CategoryType,
        },
        {
          title: "PHAs",
          url: "#phas",
          icon: AlertTriangleIcon,
          type: "phas" as CategoryType,
        },
      ],
    },
    {
      title: "Orbit Creator",
      url: "#",
      icon: OrbitIcon,
    },
    {
      title: "ObservableNEAs",
      url: "#observable-neas",
      icon: BookOpenIcon,
    },
    {
      title: "Saved Objects",
      url: "#",
      icon: StarIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
    {
      title: "Tutorial",
      url: "#",
      icon: GraduationCapIcon,
    },
    {
      title: "Share",
      url: "#",
      icon: ShareIcon,
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  // const { isMobile } = useSidebar();
  const { setSelectedCategory } = useSelectedCategory();
  // const [dropdownOpen, setDropdownOpen] = useState(false);
  const [, setDropdownOpen] = useState(false);
  {/* 
  const handleCategorySelect = (
    item: NonNullable<(typeof data.navMain)[number]["submenu"]>[number]
  ) => {
    setSelectedCategory({
      type: item.type,
      title: item.title,
      icon: item.icon,
    });
    setDropdownOpen(false);
  };*/}

  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">☀️ Abi's Space</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        {/*  
        <SidebarGroup>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu>
              {data.navMain.map((item) =>
                item.isDropdown ? (
                  <SidebarMenuItem key={item.title}>
                    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
                      <DropdownMenuTrigger asChild>
                        <SidebarMenuButton className="w-full justify-between">
                          <div className="flex items-center">
                            <item.icon className="mr-2 h-4 w-4" />
                            <span>{item.title}</span>
                          </div>
                          <ChevronDownIcon className="h-4 w-4" />
                        </SidebarMenuButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side={isMobile ? "bottom" : "right"} align="start" className="w-56">
                        {item.submenu.map((subItem) => (
                          <DropdownMenuItem key={subItem.title} asChild>
                            <a
                              href={subItem.url}
                              className="flex w-full items-center"
                              onClick={(e) => {
                                e.preventDefault()
                                handleCategorySelect(subItem)
                              }}
                            >
                              {subItem.icon && <subItem.icon className="mr-2 h-4 w-4" />}
                              <span>{subItem.title}</span>
                            </a>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                ) : (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton tooltip={item.title} asChild>
                      <a href={item.url} onClick={() => setSelectedCategory(null)}>
                        {item.icon && <item.icon />}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ),
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto">
          <SidebarGroupContent>
            <SidebarMenu>
              {data.navSecondary.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild tooltip={item.title}>
                    <a
                      href={item.url}
                      onClick={() => setSelectedCategory(null)}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>*/}
        <p className="text-sm p-2">Welcome! Explore</p>
      </SidebarContent>
      <SidebarFooter className="flex flex-col">
        <CreatorInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
