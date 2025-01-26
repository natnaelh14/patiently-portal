import React from "react";
import { redirect } from "next/navigation";

import { getSession, handleLoggedInUserRedirect } from "~/utils/auth";

const Index = async () => {
  const session = await getSession();
  if (!session.isLoggedIn) {
    redirect("/login");
  }
  await handleLoggedInUserRedirect();

  return <div></div>;
};

export default Index;
