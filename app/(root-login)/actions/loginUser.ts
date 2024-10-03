"use server";

import { db } from "@/utils/db/db";
import { User } from "@prisma/client";

type LogInCredentialsProps = Pick<User, "username" | "password">;
export type LoggedInUser = Omit<User, "password">;

const loginUserFromServer = async ({ username, password }: LogInCredentialsProps): Promise<LoggedInUser> => {
  const userInfo = (await db.user.findUnique({
    where: { username, password },
    select: { id: true, username: true, isAdmin: true },
  })) as LoggedInUser;
  return userInfo;
};

type Errors = {
  [key: string]: string;
};

type PrevStateProps = {
  errors: Errors;
  user?: LoggedInUser;
};

export const loginUserAction = async (_: PrevStateProps, formData: FormData): Promise<PrevStateProps> => {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const errors: Errors = {};

  if (!username && !password) {
    errors.general = "Please input both fields";
    return { errors };
  }

  if (!username) errors.username = "Please enter a username";
  else if (username.includes(" ")) errors.username = "Please enter a valid username";

  if (!password) errors.password = "Please enter a password";
  else if (password.includes(" ")) errors.password = "Please enter a valid password";

  if (errors?.username || errors?.password) return { errors }

  const user = await loginUserFromServer({ username, password });

  if (!user) {
    errors.general = "Invalid login combination"
    return { errors }
  }

  return { errors, user };
};
