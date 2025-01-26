import type { InputHTMLAttributes } from "react";
import format from "format-string-by-pattern";
import type { ControllerRenderProps, FieldValues, Path } from "react-hook-form";

import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from "~/components/ui/form";
import { Input } from "~/components/ui/input";

interface InputProps<T extends FieldValues> extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  mask: string;
  description?: string;
  placeholder?: string;
  field: ControllerRenderProps<T, Path<T>>;
  type?: "text" | "password" | "email" | "number" | "tel" | "time";
}

export const MaskedInput = <T extends FieldValues>({ placeholder, description, label, mask, field }: InputProps<T>) => {
  const handleMaskedChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const maskedValue = format(mask, value);
    field.onChange(maskedValue);
  };

  return (
    <div className="sm:col-span-3">
      <FormItem className="flex flex-col gap-2 space-y-2">
        <FormLabel className="text-xs">{label}</FormLabel>
        <FormControl>
          <Input
            onChange={handleMaskedChange}
            placeholder={placeholder}
            className="block text-xs font-medium leading-6 text-gray-900"
            value={field.value}
            onBlur={field.onBlur}
            name={field.name}
            ref={field.ref}
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
