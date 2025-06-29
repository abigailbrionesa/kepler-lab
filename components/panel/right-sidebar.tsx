"use client";

import { useRightSidebar } from "@/context/right-sidebar-context";
import { useSelectedCategory } from "@/context/selected-category-context";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function RightSidebar() {
  const { isOpen, toggleSidebar } = useRightSidebar();
  const { selectedCategory } = useSelectedCategory();

  if (!selectedCategory) return null;

  const displayTitle = selectedCategory.title.replace("See ", "");

  return (
    <div
      className={`fixed top-0 right-0 z-40 h-screen w-64 bg-sidebar border-l border-sidebar-border transform transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="flex h-full flex-col">
        <div className="flex h-12 items-center justify-between border-b border-sidebar-border px-4">
          <div className="flex items-center">
            {selectedCategory.icon && (
              <selectedCategory.icon className="mr-2 h-5 w-5" />
            )}
            <h2 className="font-medium">{displayTitle} Info</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSidebar}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Close sidebar</span>
          </Button>
        </div>

        <div className="flex-1 overflow-auto p-4">
          <div className="space-y-6">
            <div>
              <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                Category Information
              </h3>
              <div className="rounded-md bg-accent/50 p-3">
                <p className="text-sm">
                  More info information about <strong>{displayTitle}</strong>
                </p>
              </div>
            </div>

            <Separator />

            {selectedCategory.type === "planets" && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Solar System Planets
                </h3>
              </div>
            )}

            {selectedCategory.type === "neas" && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Near-Earth Asteroids
                </h3>
              </div>
            )}

            {selectedCategory.type === "necs" && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Near-Earth Comets
                </h3>
              </div>
            )}

            {selectedCategory.type === "phas" && (
              <div>
                <h3 className="mb-2 text-sm font-medium text-muted-foreground">
                  Potentially Hazardous Asteroids
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
