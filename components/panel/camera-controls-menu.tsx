import React from "react";
import { useCameraControls } from "@/context/camera-control-context";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "../ui/shadcn/tooltip";
import {
  ZoomOut,
  ZoomIn,
  MoveRight,
  RotateCw,
  MoveLeft,
  RotateCcw,
} from "lucide-react";
import { Button } from "../ui/shadcn/button";

function CameraControlsMenu() {
  const { rotate, zoom, dolly } = useCameraControls();
  return (
    <TooltipProvider>
      <span className="text-xs">Camera Controls</span>
      <div className="flex space-x-4 items-center z-50 px-5 ">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => rotate(-Math.PI / 4, 0)}
              aria-label="Rotate -45 degrees"
            >
              <RotateCcw className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate -45°</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => rotate(Math.PI / 4, 0)}
              aria-label="Rotate +45 degrees"
            >
              <RotateCw className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate +45°</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dolly(-1000)}
              aria-label="Dolly In"
            >
              <MoveRight className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dolly In</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => dolly(1000)}
              aria-label="Dolly Out"
            >
              <MoveLeft className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dolly Out</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => zoom(0.1)}
              aria-label="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              onClick={() => zoom(-0.1)}
              aria-label="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

export default CameraControlsMenu;
