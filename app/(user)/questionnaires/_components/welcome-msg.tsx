"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "./loading";
import { capitalizeFirstLetter } from "@/utils/common-utils";

export const WelcomeUserMsg = () => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner />

  if (!user) return null;

  return <h1 className="font-bold">{capitalizeFirstLetter(user.username)}!</h1>;
};
