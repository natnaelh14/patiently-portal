"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { createAccount } from "~/adapters/api/auth";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import type { RegistrationSession } from "~/schemas/account";
import type { CreateAccountFormSchema } from "~/schemas/forms/createAccount";
import { createAccountFormSchema } from "~/schemas/forms/createAccount";
import useSession from "~/app/use-session";
import { CheckboxInput } from "~/components/common/CheckoutInput";
import { DatePicker } from "~/components/common/DatePicker";
import {
  ActiveIcon,
  CompletedIcon,
  CreateAccountIcon,
  InactiveIcon,
  PersonalInfoIcon,
} from "~/components/common/icons";
import { LabeledInput } from "~/components/common/LabeledInput";
import { MaskedInput } from "~/components/common/MaskedInput";
import { RadioGroupInput } from "~/components/common/RadioGroupInput";
import { Button } from "~/components/ui/button";
import { Form, FormField } from "~/components/ui/form";

type InitialStep = {
  id: number;
  name: string;
  fields: string[];
  status: string;
};

const initialSteps: InitialStep[] = [
  {
    id: 1,
    name: "Personal Information",
    fields: ["firstName", "lastName", "email", "phoneNumber", "dob", "gender"],
    status: "IN_PROGRESS",
  },
  {
    id: 2,
    name: "Create Account",
    fields: ["email", "password", "confirmPassword", "treatmentConsent", "disclosureConsent", "privacyConsent"],
    status: "NOT_STARTED",
  },
] as const;

export const CreateAccountForm = ({ session }: { session: RegistrationSession }) => {
  const { login } = useSession();
  const [previousStep, setPreviousStep] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);
  const [currentSteps, setCurrentSteps] = useState(initialSteps);
  const delta = currentStep - previousStep;
  const router = useRouter();

  const signUpForm = useForm<CreateAccountFormSchema>({
    resolver: zodResolver(createAccountFormSchema),
  });

  const {
    handleSubmit,
    reset,
    trigger,
    setError,
    control,
    formState: { isSubmitting },
  } = signUpForm;

  const onSubmit = async (data: CreateAccountFormSchema) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords must match",
      });
      return;
    }
    const body = { roleId: session.roleId, ...data };
    const response = await createAccount(body, session.id);
    if (response.success) {
      router.push("/patient/dashboard");
      return reset();
    }
    console.error(response.error);
  };

  type FieldName = keyof CreateAccountFormSchema;

  const handleNext = async () => {
    setCurrentSteps((prevSteps) =>
      prevSteps.map((step) =>
        step.id === currentStep + 1
          ? { ...step, status: "COMPLETED" }
          : step.id === currentStep + 2
            ? { ...step, status: "IN_PROGRESS" }
            : step
      )
    );
    const fields = initialSteps[currentStep].fields;
    const output = await trigger(fields as FieldName[], { shouldFocus: true });

    if (!output) return;

    if (currentStep < initialSteps.length - 1) {
      if (currentStep === initialSteps.length - 2) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        await handleSubmit(onSubmit)();
      }
      setPreviousStep(currentStep);
      setCurrentStep((step) => step + 1);
    }
  };

  const prev = () => {
    if (currentStep > 0) {
      setPreviousStep(currentStep);
      setCurrentStep((step) => step - 1);
    }
  };

  return (
    <>
      <nav aria-label="Progress" className="col-span-1 bg-zinc-100 lg:pr-20 border-r-zinc-200 border-2">
        <div className="pt-5 flex justify-center items-center lg:hidden">
          <Image alt="Patiently App" src="/logo-icon.png" height={40} width={40} className="h-10 w-auto" />
        </div>
        <div className="hidden pt-5 lg:flex justify-end">
          <Image alt="Patiently App" src="/logo.svg" height={40} width={40} className="h-10 w-auto" />
        </div>
        <ol className="flex items-center lg:items-end justify-start space-y-16 flex-col h-screen mt-5">
          {initialSteps.map((step, index) => (
            <li key={step.name}>
              {currentStep > index ? (
                <div className="flex items-center gap-8 group w-full lg:pl-4 transition-colors pb-0 pt-4">
                  <span className="hidden lg:block text-base text-zinc-400">{step.name}</span>
                  {step.name === "Personal Information" ? (
                    <PersonalInfoIcon stroke="#a1a1aa" />
                  ) : (
                    <CreateAccountIcon stroke="#a1a1aa" />
                  )}
                </div>
              ) : currentStep === index ? (
                <div
                  className="flex items-center gap-8 w-full lg:pl-4 md:border-l-0 md:pb-0 md:pl-0 pt-4"
                  aria-current="step"
                >
                  <span className="hidden lg:block text-base">{step.name}</span>
                  {step.name === "Personal Information" ? <PersonalInfoIcon /> : <CreateAccountIcon />}
                </div>
              ) : (
                <div className="flex items-center gap-8 group w-full lg:pl-4 transition-colors md:pb-0 md:pl-0 md:pt-4">
                  <span className="hidden lg:block text-base text-zinc-400">{step.name}</span>
                  {step.name === "Personal Information" ? (
                    <PersonalInfoIcon stroke="#a1a1aa" />
                  ) : (
                    <CreateAccountIcon stroke="#a1a1aa" />
                  )}
                </div>
              )}
            </li>
          ))}
          <div className="relative hidden lg:block">
            {currentSteps.map((step) =>
              step.name === "Personal Information" ? (
                step.status === "IN_PROGRESS" ? (
                  <ActiveIcon key={step.id} className="top-[-220px] left-[65px]" />
                ) : step.status === "COMPLETED" ? (
                  <CompletedIcon key={step.id} className="top-[-220px] left-[65px]" />
                ) : null
              ) : step.name === "Create Account" ? (
                step.status === "NOT_STARTED" ? (
                  <InactiveIcon className="top-[-100px] left-[65px]" />
                ) : step.status === "IN_PROGRESS" ? (
                  <ActiveIcon key={step.id} className="top-[-100px] left-[65px]" />
                ) : step.status === "COMPLETED" ? (
                  <CompletedIcon key={step.id} className="top-[-100px] left-[65px]" />
                ) : null
              ) : null
            )}
          </div>
        </ol>
      </nav>
      <Form {...signUpForm}>
        <form onSubmit={handleSubmit(onSubmit)} className="col-span-4 lg:col-span-2 px-4 lg:px-16 bg-zinc-50">
          <div className="flex gap-4 items-center border-b border-zinc-300">
            <Image
              alt={session.tenant.name}
              src="https://www.logotypes101.com/logos/730/BB44441B88DFDFB4BEA11839017D3509/emoryhealthcare.png"
              height={80}
              width={80}
            />
            <h1 className="font-bold text-base lg:text-2xl">{session.tenant.name}</h1>
          </div>
          {currentStep === 0 && (
            <motion.div
              initial={{ translateX: 4, opacity: 0.5 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 1 }}
              exit={{ display: "none" }}
            >
              <div className="space-y-2 my-8">
                <h1 className="font-medium lg:text-xl text-base">Personal Information</h1>
                <p className="text-zinc-500	text-sm lg:text-base">Please fill out the following details accurately.</p>
              </div>
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <FormField
                  control={control}
                  name="firstName"
                  render={({ field }) => <LabeledInput field={field} label="First Name" placeholder="First Name" />}
                />
                <FormField
                  control={control}
                  name="lastName"
                  render={({ field }) => <LabeledInput field={field} label="Last Name" placeholder="Last Name" />}
                />
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => <LabeledInput field={field} label="Email" placeholder="Email" />}
                />
                <FormField
                  control={control}
                  name="phoneNumber"
                  render={({ field }) => (
                    <MaskedInput
                      field={field}
                      mask="(xxx) xxx-xxxx"
                      label="Phone Number"
                      placeholder="Phone Number"
                      type="tel"
                      autoComplete="tel"
                    />
                  )}
                />
                <FormField
                  control={control}
                  name="dob"
                  render={({ field }) => <DatePicker field={field} label="Date of birth" placeholder="Date of birth" />}
                />
                <FormField
                  control={control}
                  name="gender"
                  render={({ field }) => (
                    <RadioGroupInput
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      label="Gender"
                      radioValues={["Male", "Female", "Other"]}
                    />
                  )}
                />
              </div>
            </motion.div>
          )}
          {currentStep === 1 && (
            <motion.div
              initial={{ translateX: 4, opacity: 0.5 }}
              animate={{ translateX: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              exit={{ display: "none" }}
            >
              <div className="space-y-4 my-8">
                <h2 className="font-medium lg:text-xl text-base">Create Account</h2>
                <p className="text-zinc-500 text-sm lg:text-base">Please fill out the following details accurately.</p>
              </div>
              <div className="mt-10 w-full">
                <div className="flex flex-col gap-x-6 gap-y-4">
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
                  <FormField
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <LabeledInput
                        field={field}
                        type="password"
                        label="Confirm password"
                        placeholder="Confirm password"
                      />
                    )}
                  />
                  <div className="space-y-4 mt-4">
                    <FormField
                      control={control}
                      name="treatmentConsent"
                      render={({ field }) => (
                        <CheckboxInput field={field} label="I consent to receive treatment for my health condition." />
                      )}
                    />
                    <FormField
                      control={control}
                      name="disclosureConsent"
                      render={({ field }) => (
                        <CheckboxInput
                          field={field}
                          label="I consent to the use and disclosure of my health information for treatment purposes."
                        />
                      )}
                    />
                    <FormField
                      control={control}
                      name="privacyConsent"
                      render={({ field }) => (
                        <CheckboxInput
                          field={field}
                          label="I acknowledged that I have reviewed and agree to the privacy policy."
                        />
                      )}
                    />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
          <div className="flex items-center justify-between mt-8 space-x-4">
            <Button variant="outline-shad-cn" onClick={prev} disabled={currentStep === 0}>
              Previous
            </Button>
            {currentStep === initialSteps.length - 1 ? (
              <Button variant="primary" isSubmitting={isSubmitting} type="submit" className="w-fit mx-auto px-10">
                Submit
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={currentStep === initialSteps.length - 1}
                variant="primary"
                className="px-6 py-1 text-sm font-semibold text-white shadow-sm ring-0 ring-inset disabled:cursor-not-allowed disabled:opacity-50"
              >
                Next
              </Button>
            )}
          </div>
        </form>
      </Form>
    </>
  );
};
