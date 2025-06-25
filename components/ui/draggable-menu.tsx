"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "../ui/card";
import { motion, useDragControls } from "framer-motion";
import { GripVertical, X, Minimize2 } from "lucide-react";
import type { RefObject } from "react";
export default function DraggablePanel({
  dragConstraints,
  title,
  children,
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
  title: string;
  children: React.ReactNode;
}) {
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={dragConstraints.current ? dragConstraints : undefined}
      dragElastic={0}
      className="absolute left-5 top-5 z-10"
    >
      <div
        className="w-64 
        z-10 
        select-none
        space-y-4 overflow-y-auto h-min 
        max-h-[calc(100vh-80px)]"
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-move px-3 py-2 border-secondary border-1 rounded-xl bg-background"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-secondary" />
              <CardTitle>
                <p className="text-sm ">{title}</p>
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6"
                onClick={() => setIsMinimized(!isMinimized)}
              >
                <Minimize2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        </div>

        {!isMinimized && (
          <div className="px-4 py-1 backdrop-blur-sm rounded-xl border-1 border-secondary">
            {children}
          </div>
        )}
      </div>
    </motion.div>
  );
}
