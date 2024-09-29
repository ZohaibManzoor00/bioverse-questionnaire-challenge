"use server"

import { db } from "@/utils/db/db";
import { User } from "@prisma/client";

type LogInCredentialsProps = Pick<User, "username" | "password">;
type LoggedInUser = Omit<User, "password">;

export const loginUser = async ({
  username,
  password,
}: LogInCredentialsProps): Promise<LoggedInUser> => {
  const userInfo = (await db.user.findUnique({
    where: { username, password },
    select: { id: true, username: true, isAdmin: true },
  })) as LoggedInUser;
  return userInfo;
};
