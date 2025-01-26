"use client";

import type { HTMLAttributes } from "react";
import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { cn } from "~/utils/helpers";
import { Button } from "~/components/ui/button";
import { Calendar } from "~/components/ui/calendar";
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "~/components/ui/popover";

interface DatePickerProps<T extends FieldValues> extends HTMLAttributes<HTMLDivElement> {
  label: string;
  description?: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>; // Use ControllerRenderProps
}
export const DatePicker = <T extends FieldValues>({
  placeholder,
  description,
  label,
  ...props
}: DatePickerProps<T>) => {
  const { field } = { ...props };
  return (
    <div className="sm:col-span-3">
      <FormItem className="flex flex-col">
        <FormLabel>{label}</FormLabel>
        <Popover>
          <PopoverTrigger asChild>
            <FormControl>
              <Button
                variant={"outline-shad-cn"}
                className={cn("pl-3 mt-4 text-left font-normal", !field.value && "text-muted-foreground")}
              >
                {field.value ? format(field.value, "PPP") : <span>{placeholder}</span>}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </FormControl>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={field.value}
              onSelect={field.onChange}
              disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </div>
  );
};
