"use client";

import { FormControl, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { RadioGroup, RadioGroupItem } from "~/components/ui/radio-group";

interface RadioGroupInputProps {
  label: string;
  description?: string;
  radioValues: string[]; // Array of radio options
  onValueChange: (value: string) => void; // Function to handle value changes
  defaultValue?: string;
}

export const RadioGroupInput = ({ label, radioValues, onValueChange, defaultValue }: RadioGroupInputProps) => {
  return (
    <FormItem className="space-y-3">
      <FormLabel>{label}</FormLabel>
      <FormControl>
        <RadioGroup
          onValueChange={onValueChange}
          defaultValue={defaultValue}
          className="flex flex-row items-center gap-4"
        >
          {radioValues.map((value) => {
            return (
              <FormItem key={value} className="flex items-center space-x-3 space-y-0">
                <FormControl>
                  <RadioGroupItem value={value} />
                </FormControl>
                <FormLabel className="font-normal">{value}</FormLabel>
              </FormItem>
            );
          })}
        </RadioGroup>
      </FormControl>
      <FormMessage />
    </FormItem>
  );
};
