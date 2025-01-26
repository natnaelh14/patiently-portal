"use client";

import type { InputHTMLAttributes } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { Checkbox } from "~/components/ui/checkbox";
import { FormControl, FormDescription, FormItem, FormLabel } from "~/components/ui/form";

interface CheckboxProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  field: ControllerRenderProps<T, Path<T>>; // Properly typed as ControllerRenderProps
}

export const CheckboxInput = <T extends FieldValues>({ description, label, field }: CheckboxProps<T>) => {
  return (
    <div className="sm:col-span-3">
      <FormItem className="flex flex-row gap-4 items-center">
        <FormControl>
          <Checkbox checked={field.value} onCheckedChange={field.onChange} />
        </FormControl>
        <div className="space-y-1 leading-none">
          <FormLabel>{label}</FormLabel>
          {description && <FormDescription>{description}</FormDescription>}
        </div>
      </FormItem>
    </div>
  );
};
