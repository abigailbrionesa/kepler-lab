"use client";

import { useState, useEffect } from "react";
import { CalendarIcon } from "lucide-react";
import { format, addDays, startOfYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useSelectedCategory } from "@/context/selected-category-context";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { useSelectedDate } from "@/context/view-selected-date";
import isEqual from "lodash/isEqual";
import { motion, useDragControls } from "framer-motion";
import { GripVertical, X, Minimize2 } from "lucide-react";
import type { RefObject } from "react";
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function ControlPanel({
  dragConstraints,
}: {
  dragConstraints: RefObject<HTMLDivElement | null>;
}) {
  const dragControls = useDragControls();
  const [isMinimized, setIsMinimized] = useState(false);

  const { selectedCategory } = useSelectedCategory();
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

  const [semiMajorAxisUI, setSemiMajorAxisUI] = useState<number[]>([0.5, 5]);
  const [eccentricityUI, setEccentricityUI] = useState<number[]>([0, 1]);
  const [orbitalPeriodUI, setOrbitalPeriodUI] = useState<number[]>([0.5, 10]);
  const [albedoUI, setAlbedoUI] = useState<number[]>([0, 1]);
  const [magnitudeUI, setMagnitudeUI] = useState<number[]>([5, 25]);
  const [diameterUI, setDiameterUI] = useState<number[]>([0.1, 10]);
  const [showOnlyHazardous, setShowOnlyHazardous] = useState<boolean>(false);

  const debouncedYear = useDebounce(yearUI, 100);
  const debouncedDayOfYear = useDebounce(dayOfYearUI, 100);
  const debouncedSemiMajorAxis = useDebounce(semiMajorAxisUI, 1500);
  const debouncedEccentricity = useDebounce(eccentricityUI, 1500);
  const debouncedOrbitalPeriod = useDebounce(orbitalPeriodUI, 1500);
  const debouncedAlbedo = useDebounce(albedoUI, 1500);
  const debouncedMagnitude = useDebounce(magnitudeUI, 1500);
  const debouncedDiameter = useDebounce(diameterUI, 1500);

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

  useEffect(() => {
    console.log("Filters updated:", {
      semiMajorAxis: debouncedSemiMajorAxis,
      eccentricity: debouncedEccentricity,
      orbitalPeriod: debouncedOrbitalPeriod,
      albedo: debouncedAlbedo,
      magnitude: debouncedMagnitude,
      diameter: debouncedDiameter,
    });
  }, [
    debouncedSemiMajorAxis,
    debouncedEccentricity,
    debouncedOrbitalPeriod,
    debouncedAlbedo,
    debouncedMagnitude,
    debouncedDiameter,
  ]);

  const displayDate = addDays(
    startOfYear(new Date(yearUI, 0, 1)),
    dayOfYearUI - 1
  );

  const showFilters =
    selectedCategory?.type != null &&
    ["neas", "necs", "phas"].includes(selectedCategory.type);

  const isUpdatingFilters =
    !isEqual(semiMajorAxisUI, debouncedSemiMajorAxis) ||
    !isEqual(eccentricityUI, debouncedEccentricity) ||
    !isEqual(orbitalPeriodUI, debouncedOrbitalPeriod) ||
    !isEqual(albedoUI, debouncedAlbedo) ||
    !isEqual(magnitudeUI, debouncedMagnitude) ||
    !isEqual(diameterUI, debouncedDiameter);

  if (!selectedCategory) return null;

  return (
    <motion.div
      drag
      dragControls={dragControls}
      dragListener={false}
      dragMomentum={false}
      dragConstraints={dragConstraints.current ? dragConstraints : undefined}
      dragElastic={0}
      className="absolute left-20 top-20 z-10"
    >
      <div
        className="w-64 
      z-10 
       select-none
      space-y-4 overflow-y-auto h-min 
    max-h-[calc(100vh-80px)] "
      >
        <div
          onPointerDown={(e) => dragControls.start(e)}
          className="cursor-move px-3 py-2 border-secondary border-1 rounded-xl bg-background  "
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <GripVertical className="h-4 w-4 " />
              <CardTitle>
                <p className="text-sm ">Controls</p>
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
          <div className="px-4 backdrop-blur-sm rounded-xl border-1 border-secondary">
            <Accordion
              type="single"
              collapsible
              defaultValue="date-controls"
              className="w-full "
            >
              <AccordionItem value="date-controls" className="border-b-0">
                <AccordionTrigger className="py-2 hover:no-underline">
                  <div className="flex flex-col items-start">
                    <h3 className="text-sm font-medium">Date Controls</h3>
                    <p className="text-xs text-muted-foreground text-left">
                      {format(selectedDate, "MMMM d, yyyy")}
                    </p>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-4 pt-2">
                    <div className="space-y-2">
                      <Label htmlFor="date">Select Date</Label>
                      <Popover
                        open={calendarOpen}
                        onOpenChange={setCalendarOpen}
                      >
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

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="year">Year: {yearUI}</Label>
                        <span className="text-xs text-muted-foreground">
                          1850-2090
                        </span>
                      </div>
                      <Slider
                        id="year"
                        min={1850}
                        max={2090}
                        step={1}
                        value={[yearUI]}
                        onValueChange={(values) => setYearUI(values[0])}
                        className="w-full"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="day">Day: {dayOfYearUI}</Label>
                        <span className="text-xs text-muted-foreground">
                          {format(displayDate, "MMM d")}
                        </span>
                      </div>
                      <Slider
                        id="day"
                        min={1}
                        max={365}
                        step={1}
                        value={[dayOfYearUI]}
                        onValueChange={(values) => setDayOfYearUI(values[0])}
                        className="w-full"
                      />
                    </div>

                    {(debouncedYear !== yearUI ||
                      debouncedDayOfYear !== dayOfYearUI) && (
                      <div className="text-xs text-muted-foreground italic">
                        Updating...
                      </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>

              {showFilters && (
                <AccordionItem value="filters" className="border-b-0 mt-2">
                  <AccordionTrigger className="py-2 hover:no-underline">
                    <div className="flex flex-col items-start">
                      <h3 className="text-sm font-medium">
                        Filters
                        {isUpdatingFilters && (
                          <span className="ml-2 text-xs text-muted-foreground italic">
                            (updating...)
                          </span>
                        )}
                      </h3>
                      <p className="text-xs text-muted-foreground text-left">
                        Orbital & physical parameters
                      </p>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pt-2">
                      {/* Semi-Major Axis */}
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="semi-major-axis">
                            Semi-Major Axis (AU)
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {semiMajorAxisUI[0].toFixed(1)}-
                            {semiMajorAxisUI[1].toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          id="semi-major-axis"
                          min={0.1}
                          max={10}
                          step={0.1}
                          value={semiMajorAxisUI}
                          onValueChange={setSemiMajorAxisUI}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="eccentricity">Eccentricity</Label>
                          <span className="text-xs text-muted-foreground">
                            {eccentricityUI[0].toFixed(2)}-
                            {eccentricityUI[1].toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          id="eccentricity"
                          min={0}
                          max={1}
                          step={0.01}
                          value={eccentricityUI}
                          onValueChange={setEccentricityUI}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="orbital-period">
                            Orbital Period (years)
                          </Label>
                          <span className="text-xs text-muted-foreground">
                            {orbitalPeriodUI[0].toFixed(1)}-
                            {orbitalPeriodUI[1].toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          id="orbital-period"
                          min={0.1}
                          max={20}
                          step={0.1}
                          value={orbitalPeriodUI}
                          onValueChange={setOrbitalPeriodUI}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="albedo">Albedo</Label>
                          <span className="text-xs text-muted-foreground">
                            {albedoUI[0].toFixed(2)}-{albedoUI[1].toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          id="albedo"
                          min={0}
                          max={1}
                          step={0.01}
                          value={albedoUI}
                          onValueChange={setAlbedoUI}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="magnitude">Magnitude</Label>
                          <span className="text-xs text-muted-foreground">
                            {magnitudeUI[0].toFixed(1)}-
                            {magnitudeUI[1].toFixed(1)}
                          </span>
                        </div>
                        <Slider
                          id="magnitude"
                          min={0}
                          max={30}
                          step={0.5}
                          value={magnitudeUI}
                          onValueChange={setMagnitudeUI}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="diameter">Diameter (km)</Label>
                          <span className="text-xs text-muted-foreground">
                            {diameterUI[0].toFixed(2)}-
                            {diameterUI[1].toFixed(2)}
                          </span>
                        </div>
                        <Slider
                          id="diameter"
                          min={0.01}
                          max={50}
                          step={0.01}
                          value={diameterUI}
                          onValueChange={setDiameterUI}
                          className="w-full"
                        />
                      </div>

                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full mt-4"
                        onClick={() => {
                          setSemiMajorAxisUI([0.5, 5]);
                          setEccentricityUI([0, 1]);
                          setOrbitalPeriodUI([0.5, 10]);
                          setAlbedoUI([0, 1]);
                          setMagnitudeUI([5, 25]);
                          setDiameterUI([0.1, 10]);
                          setShowOnlyHazardous(false);
                        }}
                      >
                        Reset Filters
                      </Button>

                      {selectedCategory.type === "phas" && (
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox
                            id="hazardous"
                            checked={showOnlyHazardous}
                            onCheckedChange={(checked) =>
                              setShowOnlyHazardous(checked as boolean)
                            }
                          />
                          <Label htmlFor="hazardous" className="text-sm">
                            Show only hazardous objects
                          </Label>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              )}
            </Accordion>
          </div>
        )}
      </div>
    </motion.div>
  );
}
