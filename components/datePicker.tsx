"use client";

import { useFormContext } from "react-hook-form";
import { PickupFormData } from "../types/PickupPage";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "./ui/popover";
import { cn } from "../lib/utils";

export function DatePickerField() {
  const { setValue, watch } = useFormContext<PickupFormData>();
  const pickupDate = watch("scheduledDate");

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">Pickup Date</h3>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal",
              !pickupDate && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {pickupDate ? format(pickupDate, "PPP") : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={pickupDate}
            onSelect={(date) => date && setValue("scheduledDate", date)}
            disabled={(date) => date < new Date()}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}