"use client";

import { useState, useMemo } from "react";
import { CalendarIcon } from "lucide-react";
import { format, addDays, startOfYear, isLeapYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/shadcn/button";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Label } from "@/components/ui/shadcn/label";
import { ParamSlider } from "../../ui/param-slider";
import DraggableMenuItem from "../../ui/draggable-menu-item";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { useSelectedDate } from "@/context/scene/view-selected-date";

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const [calendarOpen, setCalendarOpen] = useState(false);

  const year = selectedDate.getFullYear();
  const startOfYearDate = startOfYear(selectedDate);
  const dayOfYear = Math.floor((selectedDate.getTime() - startOfYearDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const daysInYear = isLeapYear(selectedDate) ? 366 : 365;

  const displayDate = addDays(startOfYearDate, dayOfYear - 1);

  const handleYearChange = (newYear: number) => {
    const newStart = startOfYear(new Date(newYear, 0, 1));
    const newDay = Math.min(dayOfYear, isLeapYear(new Date(newYear, 0, 1)) ? 366 : 365);
    setSelectedDate(addDays(newStart, newDay - 1));
  };

  const handleDayChange = (newDay: number) => {
    const newDate = addDays(startOfYear(new Date(year, 0, 1)), newDay - 1);
    setSelectedDate(newDate);
  };

  return (
    <DraggableMenuItem
      accordionValue="date-controls"
      title="Date Controls"
      subtitle={format(selectedDate, "MMMM d, yyyy")}
    >
      <div className="space-y-4 pt-2">
        <div className="space-y-2">
          <Label htmlFor="date" className="star-point">
            Select Date
          </Label>
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
                {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent align="start">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(newDate) => {
                  if (newDate) setSelectedDate(newDate);
                  setCalendarOpen(false);
                }}
                captionLayout="dropdown"
                defaultMonth={selectedDate}
                startMonth={new Date(1850, 0)}
                endMonth={new Date(2090, 11)}
              />
            </PopoverContent>
          </Popover>
        </div>

        <ParamSlider
          label={`Year: ${year}`}
          id="year"
          min={1850}
          max={2090}
          step={1}
          value={year}
          onChange={handleYearChange}
        />

        <ParamSlider
          label={`Day: ${dayOfYear} (${format(displayDate, "MMM d")})`}
          id="day"
          min={1}
          max={daysInYear}
          step={1}
          value={dayOfYear}
          onChange={handleDayChange}
        />
      </div>
    </DraggableMenuItem>
  );
}
