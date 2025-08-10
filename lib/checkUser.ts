import { currentUser } from "@clerk/nextjs/server";

import { db } from "./db";

export async function checkUser() {
  const user = await currentUser();
  if (!user) {
    return null;
  }

  const dbUser = await db.user.findUnique({
    where: { clerkUserId: user.id },
  });

  if (dbUser) {
    return dbUser;
  }
  // If user does not exist in the database, create a new user record
  const newUser = await db.user.create({
    data: {
      clerkUserId: user.id,
      email: user.emailAddresses[0]?.emailAddress || "",
      name: user.firstName + " " + user.lastName,
      imageUrl: user.imageUrl || "",
    },
  });
  return newUser;
}
