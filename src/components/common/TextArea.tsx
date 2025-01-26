"use client";

import type { TextareaHTMLAttributes } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Textarea } from "~/components/ui/textarea";

interface TextareaProps<T extends FieldValues> extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  description?: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>; // ControllerRenderProps from react-hook-form
}
export const TextareaInput = <T extends FieldValues>({ placeholder, description, label, field }: TextareaProps<T>) => {
  return (
    <div className="sm:col-span-3">
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea placeholder={placeholder} className="resize-none" {...field} />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
    </div>
  );
};
