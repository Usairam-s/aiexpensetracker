import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import Guest from "./components/Guest";

export default async function page() {
  const user = await currentUser();
  if (!user) {
    return <Guest />;
  }
  return <div>page</div>;
}
