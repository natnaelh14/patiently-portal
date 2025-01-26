"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "~/adapters/api/auth";
import { useForm } from "react-hook-form";

import type { SignInFormSchema } from "~/schemas/forms/login";
import { signInFormSchema } from "~/schemas/forms/login";
import { doLogin } from "~/app/use-session";
import { LabeledInput } from "~/components/common/LabeledInput";
import { SquareIcon } from "~/components/SquareIcon";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";

export const SignInForm = () => {
  const router = useRouter();
  const signInForm = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = signInForm;

  const onSubmit = async (data: SignInFormSchema) => {
    const response = await signIn(data);
    if (response.success) {
      await doLogin(response.data.authToken);
      router.push("/internal/dashboard");
      return reset();
    }
  };

  return (
    <Form {...signInForm}>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-8 w-full">
        <div className="space-y-4">
          <FormField
            control={control}
            name="email"
            render={({ field }) => <LabeledInput field={field} label="Email" placeholder="Email" />}
          />
          <FormField
            control={control}
            name="password"
            render={({ field }) => (
              <LabeledInput field={field} label="Password" type="password" placeholder="Password" />
            )}
          />
        </div>
        <Button
          variant="primary"
          isSubmitting={isSubmitting}
          type="submit"
          className="mx-auto w-fit rounded bg-[#336CFB] flex items-center"
        >
          <SquareIcon name="login-arrow" />
          Sign in
        </Button>
      </form>
    </Form>
  );
};
