import { useState } from "react";
import { Button } from "@/components/ui/shadcn/button";
import { CalendarIcon } from "lucide-react";
import { format, addDays, startOfYear, isLeapYear } from "date-fns";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/shadcn/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/shadcn/popover";
import { ParamSlider } from "../../ui/param-slider";
import { useSelectedDate } from "@/context/scene/view-selected-date";

export default function DateSelector() {
  const { selectedDate, setSelectedDate } = useSelectedDate();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [sliderOpen, setSliderOpen] = useState(false);

  const year = selectedDate.getFullYear();
  const startOfYearDate = startOfYear(selectedDate);
  const dayOfYear =
    Math.floor((selectedDate.getTime() - startOfYearDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
  const daysInYear = isLeapYear(selectedDate) ? 366 : 365;

  const displayDate = addDays(startOfYearDate, dayOfYear - 1);

  const handleYearChange = (newYear: number) => {
    const newStart = startOfYear(new Date(newYear, 0, 1));
    const newDay = Math.min(
      dayOfYear,
      isLeapYear(new Date(newYear, 0, 1)) ? 366 : 365
    );
    setSelectedDate(addDays(newStart, newDay - 1));
  };

  const handleDayChange = (newDay: number) => {
    const newDate = addDays(startOfYear(new Date(year, 0, 1)), newDay - 1);
    setSelectedDate(newDate);
  };

  return (
    <div className="flex space-x-2">
      <div>
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

      <div>
        <Popover open={sliderOpen} onOpenChange={setSliderOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full">
              Date Sliders
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
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
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
}
