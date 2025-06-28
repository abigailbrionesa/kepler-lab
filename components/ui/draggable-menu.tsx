"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CardTitle } from "../ui/card";
import { motion, useDragControls } from "framer-motion";
import { GripVertical, X, Minimize2 } from "lucide-react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";

export default function DraggablePanel({
  dragConstraints,
  title,
  children,
  position,
  width = "w-64",
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
  title: string;
  children: React.ReactNode;
  position?: string;
  width?: string;
}) {
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      whileDrag={{ scale: 0.98, opacity: 0.8 }}
      dragMomentum={false}
      dragConstraints={dragConstraints.current ? dragConstraints : undefined}
      dragElastic={0}
      className={cn("absolute z-10 ", position, width)}
    >
      <div
        className="
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

        <AnimatePresence initial={false}>
          {!isMinimized && (
            <motion.div
              key="panel-content"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="px-4 py-1 backdrop-blur-sm rounded-xl border-1 border-secondary overflow-hidden"
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
