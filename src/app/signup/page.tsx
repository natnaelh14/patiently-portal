import { redirect } from "next/navigation";
import { getRegistrationSession } from "~/adapters/api/auth";

import { CreateAccountForm } from "~/app/signup/CreateAccountForm";

type PageProps = {
  searchParams: {
    sessionId?: string;
  };
};

export default async function SignUp({ searchParams }: Readonly<PageProps>) {
  const sessionId = searchParams.sessionId ?? "No sessionId provided";
  const response = await getRegistrationSession(sessionId);
  if (!response.success) {
    redirect("/login");
  }

  return (
    <section className="relative grid grid-cols-5 lg:grid-cols-3 divide-y-red-500 h-screen">
      <CreateAccountForm session={response.data} />
    </section>
  );
}
