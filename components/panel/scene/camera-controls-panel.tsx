import {
  RotateCcw,
  RotateCw,
  MoveLeft,
  MoveRight,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { Button } from "@/components/ui/shadcn/button";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/shadcn/tooltip";
import { useCameraControls } from "@/context/scene/camera-control-context";

export function CameraControlsPanel() {
  const { rotate, zoom, dolly } = useCameraControls();

  return (
    <div className="space-y-2">
      <div className="text-xs text-muted-foreground">Rotate</div>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => rotate(-Math.PI / 4, 0)}
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate -45°</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              size="icon"
              variant="outline"
              onClick={() => rotate(Math.PI / 4, 0)}
            >
              <RotateCw className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Rotate +45°</TooltipContent>
        </Tooltip>
      </div>

      <div className="text-xs text-muted-foreground pt-2">Dolly</div>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={() => dolly(-1000)}>
              <MoveRight className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dolly In</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={() => dolly(1000)}>
              <MoveLeft className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Dolly Out</TooltipContent>
        </Tooltip>
      </div>

      <div className="text-xs text-muted-foreground pt-2">Zoom</div>
      <div className="flex space-x-2">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={() => zoom(0.1)}>
              <ZoomIn className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom In</TooltipContent>
        </Tooltip>

        <Tooltip>
          <TooltipTrigger asChild>
            <Button size="icon" variant="outline" onClick={() => zoom(-0.1)}>
              <ZoomOut className="w-4 h-4" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Zoom Out</TooltipContent>
        </Tooltip>
      </div>
    </div>
  );
}
