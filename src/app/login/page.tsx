import React from "react";
import Image from "next/image";

import { handleLoggedInUserRedirect } from "~/utils/auth";
import { SignInForm } from "~/app/login/SignInForm";

const Login = async () => {
  await handleLoggedInUserRedirect();

  return (
    <section className="md:px-40 md:py-10 bg-zinc-100 h-screen w-full">
      <div className="rounded-2xl grid h-full lg:grid-cols-2 lg:space-x-8">
        <div className="flex items-center">
          <Image
            src="/login.png"
            alt="log in image"
            height={500}
            width={400}
            className="w-full hidden lg:block col-span-1 rounded-2xl"
          />
        </div>
        <div className="rounded-2xl border border-[#e5e7eb] flex flex-col items-center justify-center gap-8 p-10 bg-zinc-50 col-span-1">
          <Image alt="Patiently App" src="/logo.svg" height={40} width={40} className="h-10 w-auto" />
          <div className="space-y-2">
            <h1 className="text-3xl font-medium">Welcome back</h1>
            <p className="text-center"> Log in to your account.</p>
          </div>
          <SignInForm />
        </div>
      </div>
    </section>
  );
};

export default Login;
