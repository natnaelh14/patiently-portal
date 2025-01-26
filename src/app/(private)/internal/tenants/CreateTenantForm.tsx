"use client";

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { createTenant } from "~/adapters/api/tenant";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import { useUser } from "~/hooks/useUser";
import { createTenantFormSchema, type CreateTenantFormSchema } from "~/schemas/forms/createTenant";
import { LabeledInput } from "~/components/common/LabeledInput";
import { MaskedInput } from "~/components/common/MaskedInput";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";

export const CreateTenantForm = () => {
  const { user } = useUser();
  const createTenantForm = useForm<CreateTenantFormSchema>({
    resolver: zodResolver(createTenantFormSchema),
    mode: "onSubmit",
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = createTenantForm;

  const onSubmit = async (data: CreateTenantFormSchema) => {
    if (!user?.isLoggedIn) return null;
    const response = await createTenant(user.token);
    if (response.success) {
      toast.success(`${data.tenantName} Tenant Successfully toasted!`, {
        position: "bottom-center",
        style: {
          minWidth: "600px",
        },
      });
    }
  };

  return (
    <Form {...createTenantForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <FormField
          control={control}
          name="tenantName"
          render={({ field }) => <LabeledInput field={field} label="Tenant Name" placeholder="Tenant Name" />}
        />
        <FormField
          control={control}
          name="adminFirstName"
          render={({ field }) => <LabeledInput field={field} label="Admin First Name" placeholder="Admin First Name" />}
        />
        <FormField
          control={control}
          name="adminLastName"
          render={({ field }) => <LabeledInput field={field} label="Admin Last Name" placeholder="Admin Last Name" />}
        />
        <FormField
          control={control}
          name="adminEmail"
          render={({ field }) => <LabeledInput field={field} label="Admin Email" placeholder="Admin Email" />}
        />
        <FormField
          control={control}
          name="adminPhoneNumber"
          render={({ field }) => (
            <MaskedInput
              field={field}
              mask="(xxx) xxx-xxxx"
              label="Admin Phone Number"
              placeholder="Admin Phone Number"
              type="tel"
              autoComplete="tel"
            />
          )}
        />
        <Button
          variant="primary"
          isSubmitting={isSubmitting}
          type="submit"
          className="mt-4 rounded-2xl bg-[#06aeb6] hover:bg-[#047f85] disabled:bg-[#047f85]]"
        >
          Create
        </Button>
      </form>
    </Form>
  );
};
