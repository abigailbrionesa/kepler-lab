import { Label } from "@/components/ui/shadcn/label";
import { Slider } from "@/components/ui/shadcn/slider";
import type { Dispatch, SetStateAction } from "react";

type ParamSliderProps = {
  label: string;
  id: string;
  min: number;
  max: number;
  step: number;
  value: number | number[];
  onChange: ((val: number) => void) | Dispatch<SetStateAction<number[]>>;
  type?: "number" | "range";
};

export function ParamSlider({
  label,
  id,
  min,
  max,
  step,
  value,
  onChange,
  type = "number",
}: ParamSliderProps) {
  const isNumber = type === "number";

  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <Label htmlFor={id}>{label}</Label>
        <span className="text-xs text-muted-foreground">
          {isNumber
            ? (value as number).toFixed(2)
            : `${(value as number[])[0].toFixed(1)} - ${(
              value as number[]
            )[1].toFixed(1)}`}
        </span>
      </div>
      <Slider
        id={id}
        min={min}
        max={max}
        step={step}
        value={isNumber ? [value as number] : (value as number[])}
        onValueChange={
          isNumber
            ? (vals) => (onChange as (val: number) => void)(vals[0])
            : (onChange as Dispatch<SetStateAction<number[]>>)
        }
        className="w-full"
      />
    </div>
  );
}
