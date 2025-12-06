"use client";
import type * as React from "react";
import {
  Sidebar,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
} from "@/components/ui/shadcn/sidebar";
import { CreatorInfo } from "./creator-info";
import Link from "next/link";

const spaceResources = [
  {
    label: "NASA Solar System Overview",
    url: "https://science.nasa.gov/solar-system/",
  },
  {
    label: "Formulae for using the Keplerian elements",
    url: "https://ssd.jpl.nasa.gov/planets/approx_pos.html",
  },
  {
    label: "What does SSD do?",
    url: "https://ssd.jpl.nasa.gov/about/",
  },
  {
    label: "NASA 3D Resources",
    url: "https://science.nasa.gov/3d-resources/",
  },
  {
    label: "NASA Space Place (for students)",
    url: "https://spaceplace.nasa.gov/",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className=" data-[slot=sidebar-menu-button]:!p-1.5 hover:!bg-transparent hover:text-secondary-foreground"
            >
              <Link href="/" className="!no-underline !underline-offset-4">
                <span className="text-base font-semibold">
                  ☀️ KeplerLab
                </span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <p className="text-sm p-2">
          Welcome! <br /> Explore the planets and asteroids in our Solar System.{" "}
          <br />
          Orbital and physical parameters are generated from{" "}
          <a
            href="https://ssd.jpl.nasa.gov/tools/sbdb_query.html"
            target="_blank"
          >
            NASA Jet Propulsion Laboratoria small-body database (SBDB){" "}
          </a>{" "}
        </p>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <h3 className="font-semibold mb-2">Helpful Resources</h3>

              <ul className="space-y-2 ">
                {spaceResources.map((resource, index) => (
                  <li key={index} className="star-point">
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm hover:underline"
                    >
                      {resource.label}
                    </a>
                  </li>
                ))}
              </ul>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="flex flex-col">
        <CreatorInfo />
      </SidebarFooter>
    </Sidebar>
  );
}
