"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "~/components/ui/form";

const permissions = [
  {
    name: "USER",
    types: [
      {
        id: "1",
        label: "View User",
      },
      {
        id: "2",
        label: "Edit User",
      },
      {
        id: "3",
        label: "Reset User Password",
      },
      {
        id: "4",
        label: "Create User",
      },
      {
        id: "5",
        label: "Delete User",
      },
    ],
  },
  {
    name: "ROLE",
    types: [
      {
        id: "6",
        label: "View Role",
      },
      {
        id: "7",
        label: "Edit Role",
      },
      {
        id: "8",
        label: "Create Role",
      },
      {
        id: "9",
        label: "Delete Role",
      },
    ],
  },
  {
    name: "PATIENT",
    types: [
      {
        id: "10",
        label: "View Patient",
      },
      {
        id: "11",
        label: "Edit Patient",
      },
      {
        id: "12",
        label: "Create Patient",
      },
      {
        id: "13",
        label: "Delete Patient",
      },
    ],
  },
  {
    name: "LAB REPORT",
    types: [
      {
        id: "14",
        label: "View Lab Report",
      },
      {
        id: "15",
        label: "Edit Lab Report",
      },
      {
        id: "16",
        label: "Create Lab Report",
      },
      {
        id: "17",
        label: "Delete Lab Report",
      },
      {
        id: "18",
        label: "View Test Data",
      },
      {
        id: "19",
        label: "View Test Data",
      },
    ],
  },
] as const;

const FormSchema = z.object({
  items: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "You have to select at least one item.",
  }),
});

export default function EditRole() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      items: ["recents", "home"],
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.info("Permissions", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex justify-around flex-wrap gap-8">
          {permissions.map((permission) => (
            <FormField
              key={permission.name}
              control={form.control}
              name="items"
              render={() => (
                <FormItem className="p-4 bg-[#f3f2f9] divide-y rounded-2xl min-w-[400px] ">
                  <div className="pb-4">
                    <FormLabel className="text-base">
                      {permission.name} <span className="text-xs font-normal text-[#8f9094]">Permission</span>
                    </FormLabel>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {permission.types.map((type) => (
                      <FormField
                        key={type.id}
                        control={form.control}
                        name="items"
                        render={({ field }) => {
                          return (
                            <FormItem key={type.id} className="flex flex-row items-center space-x-2">
                              <FormControl>
                                <Checkbox
                                  checked={field.value.includes(type.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, type.id])
                                      : field.onChange(field.value.filter((value: string) => value !== type.id));
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="text-sm font-normal">{type.label}</FormLabel>
                            </FormItem>
                          );
                        }}
                      />
                    ))}
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
        </div>
        <div className="gap-4 flex justify-center">
          <Button variant={"outline-shad-cn"}>Cancel</Button>
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
