import type { InputHTMLAttributes } from "react";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  description?: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>;
  type?: "text" | "password" | "email" | "number" | "tel" | "time" | "file";
}

export const LabeledInput = <T extends FieldValues>({
  placeholder,
  description,
  label,
  field,
  type,
}: InputProps<T>) => {
  return (
    <div className="sm:col-span-3">
      <FormItem className="flex flex-col gap-2 space-y-2">
        <FormLabel className="text-xs">{label}</FormLabel>
        <FormControl>
          <Input
            type={type}
            required={undefined}
            placeholder={placeholder}
            className="block text-sm font-medium leading-6 text-gray-900 placeholder:text-xs"
            {...field}
          />
        </FormControl>
        {description && <FormDescription>{description}</FormDescription>}
        <FormMessage />
      </FormItem>
      {/* {errors.firstName && (
        <p className="text-red-500">{`${errors.firstName.message}`}</p>
      )} */}
    </div>
  );
};
