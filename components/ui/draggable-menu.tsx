"use client";

import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { CardTitle } from "./shadcn/card";
import { motion, useDragControls } from "framer-motion";
import { GripVertical, Minimize2 } from "lucide-react";
import type { RefObject } from "react";
import { cn } from "@/lib/utils";
import { AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import type { ReactNode } from "react";

export default function DraggablePanel({
  dragConstraints,
  title,
  children,
  position,
  width = "w-64",
  transparent = true,
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
  title: string | ReactNode;
  children: ReactNode;
  position?: string;
  width?: string;
  transparent?: boolean;
}) {
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      whileDrag={{ scale: 0.98 }}
      dragMomentum={false}
      dragConstraints={dragConstraints.current ? dragConstraints : undefined}
      dragElastic={0}
      className={cn("absolute z-10", position, width)}
    >
      <div className="z-10 select-none space-y-4 overflow-y-auto h-min max-h-[calc(100vh-80px)]">
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-move px-3 py-2 border-secondary border-1 rounded-xl bg-background"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 text-secondary" />
              <CardTitle>
                <p className="text-sm">{title}</p>
              </CardTitle>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 cursor-pointer"
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
              className={cn(
                "px-4 py-1 rounded-xl border border-secondary overflow-hidden",
                mounted && theme === "light" && "bg-background",
                transparent ? "backdrop-blur-sm" : "bg-background"
              )}
            >
              {children}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
