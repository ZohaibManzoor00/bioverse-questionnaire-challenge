"use client";

import { capitalizeFirstLetter } from "@/utils/common-utils";
import { Spinner } from "./loading";
import { useAuth } from "@/context/authContext";

export const WelcomeUserMsg = () => {
  const { user, loading } = useAuth()

  if (loading) return <Spinner className="h-9 w-6" />

  if (!user) return null;

  return <h1 className="font-bold">{capitalizeFirstLetter(user.username)}!</h1>;
};
