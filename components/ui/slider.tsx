// "use client"

// import * as React from "react"
// import * as SliderPrimitive from "@radix-ui/react-slider"

// import { cn } from "@/lib/utils"

// function Slider({
//   className,
//   defaultValue,
//   value,
//   min = 0,
//   max = 100,
//   ...props
// }: React.ComponentProps<typeof SliderPrimitive.Root>) {
//   const _values = React.useMemo(
//     () =>
//       Array.isArray(value)
//         ? value
//         : Array.isArray(defaultValue)
//           ? defaultValue
//           : [min, max],
//     [value, defaultValue, min, max]
//   )

//   return (
//     <SliderPrimitive.Root
//       data-slot="slider"
//       defaultValue={defaultValue}
//       value={value}
//       min={min}
//       max={max}
//       className={cn(
//         "relative flex w-full touch-none items-center select-none data-[disabled]:opacity-50 data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col",
//         className
//       )}
//       {...props}
//     >
//       <SliderPrimitive.Track
//         data-slot="slider-track"
//         className={cn(
//           "bg-muted relative grow overflow-hidden rounded-full data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5"
//         )}
//       >
//         <SliderPrimitive.Range
//           data-slot="slider-range"
//           className={cn(
//             "bg-primary absolute data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full"
//           )}
//         />
//       </SliderPrimitive.Track>
//       {Array.from({ length: _values.length }, (_, index) => (
//         <SliderPrimitive.Thumb
//           data-slot="slider-thumb"
//           key={index}
//           className="border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow] hover:ring-4 focus-visible:ring-4 focus-visible:outline-hidden disabled:pointer-events-none disabled:opacity-50"
//         />
//       ))}
//     </SliderPrimitive.Root>
//   )
// }

// export { Slider }


"use client"

import * as React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "../../lib/utils"

function TimeRangeSlider({
  className,
  defaultValue = [540, 660], // Default: 9:00 AM - 11:00 AM
  min = 540,    // 9:00 AM (540 minutes)
  max = 1140,   // 7:00 PM (1140 minutes)
  minRange = 120, // Minimum 2-hour range
  onChange,
  ...props
}: {
  className?: string;
  defaultValue?: [number, number];
  min?: number;
  max?: number;
  minRange?: number;
  onChange?: (value: [number, number]) => void;
} & React.ComponentProps<typeof SliderPrimitive.Root>) {

  const [localValue, setLocalValue] = React.useState<[number, number]>(
    defaultValue || [min, min + minRange]
  );

  // Format minutes to time string (e.g., 540 -> "9:00 AM")
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    const period = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return `${displayHours}:${mins.toString().padStart(2, '0')} ${period}`;
  };

  const handleValueChange = (value: number[]) => {
    const [start, end] = value;
    let newValue: [number, number];

    if (end - start < minRange) {
      newValue = value[0] !== localValue[0]
        ? [start, start + minRange]
        : [end - minRange, end];
    } else {
      newValue = [start, end];
    }

    // Ensure values stay within bounds
    newValue = [
      Math.max(min, newValue[0]),
      Math.min(max, newValue[1])
    ];

    setLocalValue(newValue);
    onChange?.(newValue);
  };

  return (
    <div className="w-full space-y-4">
      {/* Display selected time range */}
      <div className="flex justify-between text-sm">
        <div className="font-medium">Start: {formatTime(localValue[0])}</div>
        <div className="font-medium">End: {formatTime(localValue[1])}</div>
      </div>

      {/* Slider component */}
      <SliderPrimitive.Root
        value={localValue}
        min={min}
        max={max}
        step={15} // 15-minute steps
        minStepsBetweenThumbs={minRange / 15} // Minimum 8 steps (120min/15min)
        onValueChange={handleValueChange}
        className={cn(
          "relative flex w-full touch-none items-center select-none",
          className
        )}
        {...props}
      >
        <SliderPrimitive.Track className="bg-gray-200 dark:bg-gray-800 relative grow rounded-full h-2">
          <SliderPrimitive.Range className="absolute rounded-full h-full 
            bg-gradient-to-r 
            from-primary/80 to-primary/50 
            dark:from-primary-foreground/80 dark:to-primary-foreground/50" />
        </SliderPrimitive.Track>

        <SliderPrimitive.Thumb className="block size-4 bg-white rounded-full border-2 border-primary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
        <SliderPrimitive.Thumb className="block size-4 bg-white rounded-full border-2 border-primary shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400" />
      </SliderPrimitive.Root>

      {/* Time markers (9AM to 7PM) */}
      <div className="flex justify-between text-xs text-gray-500">
        {[9, 11, 13, 15, 17, 19].map(hour => (
          <span key={hour}>
            {hour > 12 ? `${hour - 12}PM` : hour === 12 ? '12PM' : `${hour}AM`}
          </span>
        ))}
      </div>
    </div>
  );
}

export { TimeRangeSlider };