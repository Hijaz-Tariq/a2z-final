"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { PickupFormData } from "../utils/shipping-calculations";
// import { PickupFormData } from "../types/PickupPage";
import {
  FormField,
  FormItem,
  FormLabel,
  // FormControl,
} from "../components/ui/form";
import {
  Command,
  CommandInput,
  CommandItem,
  CommandList,
  CommandEmpty,
  CommandGroup,
} from "../components/ui/command";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Button } from "../components/ui/button";

interface ItemDescriptionComboboxProps {
  itemIndex: number;
}

export const ItemDescriptionCombobox = ({ itemIndex }: ItemDescriptionComboboxProps) => {
  const { control, setValue, watch } = useFormContext<PickupFormData>();
  const watchedItems = watch("items");

  const [knownDescriptions, setKnownDescriptions] = useState<string[]>([]);
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const currentValue = watchedItems?.[itemIndex]?.description || "";

  useEffect(() => {
    // Collect all existing unique descriptions from the form
    if (watchedItems && Array.isArray(watchedItems)) {
      const uniqueDescriptions = Array.from(
        new Set(watchedItems.map((item) => item.description).filter(Boolean))
      );
      setKnownDescriptions(uniqueDescriptions);
    }
  }, [watchedItems]);

  const handleSelect = (value: string) => {
    setValue(`items.${itemIndex}.description`, value);
    setOpen(false);
  };

  const handleClose = () => {
    if (inputValue.trim()) {
      setValue(`items.${itemIndex}.description`, inputValue.trim());
    }
    setOpen(false);
  };

  return (
    <FormField
      control={control}
      name={`items.${itemIndex}.description`}
      render={() => (
        <FormItem>
          <FormLabel>Description</FormLabel>
          <Popover open={open} onOpenChange={(nextOpen) => {
            if (!nextOpen) handleClose();
            else setOpen(true);
          }}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="w-full justify-start">
                {currentValue ? currentValue : "+ Set description"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-0 w-full" align="start">
              <Command>
                <CommandInput
                  placeholder="Type or select..."
                  value={inputValue}
                  onValueChange={setInputValue}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      if (inputValue.trim()) {
                        handleSelect(inputValue.trim());
                      }
                    }
                  }}
                />
                <CommandList>
                  <CommandEmpty>No matches found.</CommandEmpty>
                  <CommandGroup>
                    {knownDescriptions.map((desc, i) => (
                      <CommandItem
                        key={i}
                        value={desc}
                        onSelect={() => handleSelect(desc)}
                      >
                        {desc}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </FormItem>
      )}
    />
  );
};
