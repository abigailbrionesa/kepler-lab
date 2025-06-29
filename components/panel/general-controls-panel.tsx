"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, addDays, startOfYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { ParamSlider } from "../ui/param-slider";
import DraggablePanel from "../ui/draggable-menu";
import { CameraControlsPanel } from "./camera-controls-panel";
import DraggableMenuItem from "../ui/draggable-menu-item";
import AsteroidQuery from "./asteroid-query";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Accordion } from "@/components/ui/accordion";
import { useSelectedDate } from "@/context/view-selected-date";
import type { RefObject } from "react";
import { useDebounce } from "use-debounce";

export default function GeneralControlsPanel({
  dragConstraints,
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
}) {
  const [calendarOpen, setCalendarOpen] = useState(false);
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const [yearUI, setYearUI] = useState<number>(new Date().getFullYear());
  const [dayOfYearUI, setDayOfYearUI] = useState<number>(
    Math.floor(
      (new Date().getTime() -
        new Date(new Date().getFullYear(), 0, 0).getTime()) /
        (1000 * 60 * 60 * 24)
    )
  );

  const [debouncedYear] = useDebounce(yearUI, 100);
  const [debouncedDayOfYear] = useDebounce(dayOfYearUI, 100);

  useEffect(() => {
    const newDate = addDays(
      startOfYear(new Date(debouncedYear, 0, 1)),
      debouncedDayOfYear - 1
    );
    setSelectedDate(newDate);
  }, [debouncedYear, debouncedDayOfYear, setSelectedDate]);

  useEffect(() => {
    const year = selectedDate.getFullYear();
    const start = new Date(selectedDate.getFullYear(), 0, 0);
    const diff = selectedDate.getTime() - start.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const day = Math.floor(diff / oneDay);

    setYearUI(year);
    setDayOfYearUI(day);
  }, [selectedDate]);

  const displayDate = addDays(
    startOfYear(new Date(yearUI, 0, 1)),
    dayOfYearUI - 1
  );

  return (
    <>
      <DraggablePanel
        position="left-5 top-5"
        dragConstraints={dragConstraints}
        title="General Controls"
      >
        <Accordion
          type="single"
          collapsible
          defaultValue="date-controls"
          className="w-full"
        >
          <DraggableMenuItem
            accordionValue="date-controls"
            title="Date Controls"
            subtitle={format(selectedDate, "MMMM d, yyyy")}
          >
            <div className="space-y-4 pt-2">
              <div className="space-y-2">
                <Label htmlFor="date">Select Date</Label>
                <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="date"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !selectedDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? (
                        format(selectedDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className=" p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={(newDate) => {
                        if (newDate) {
                          setSelectedDate(newDate);
                          setCalendarOpen(false);
                        }
                      }}
                      defaultMonth={selectedDate}
                      startMonth={new Date(1850, 0)}
                      endMonth={new Date(2090, 11)}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <ParamSlider
                label={`Year: ${yearUI}`}
                id="year"
                min={1850}
                max={2090}
                step={1}
                value={yearUI}
                onChange={(val:number) => setYearUI(val)}
              />

              <ParamSlider
                label={`Day: ${dayOfYearUI}`}
                id="day"
                min={1}
                max={365}
                step={1}
                value={dayOfYearUI}
                onChange={(val:number) => setDayOfYearUI(val)}
              />

              {(debouncedYear !== yearUI ||
                debouncedDayOfYear !== dayOfYearUI) && (
                <div className="text-xs text-muted-foreground italic">
                  Updating...
                </div>
              )}
            </div>
          </DraggableMenuItem>

          <AsteroidQuery />

          <DraggableMenuItem
            accordionValue="camera-controls"
            title="Camera Controls"
            subtitle="dolly, zoom, rotate"
          >
            <div className="space-y-4 pt-2">
              <CameraControlsPanel />
            </div>
          </DraggableMenuItem>
        </Accordion>
      </DraggablePanel>
    </>
  );
}
