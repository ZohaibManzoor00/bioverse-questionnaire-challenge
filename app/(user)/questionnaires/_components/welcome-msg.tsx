"use client";

import { useAuth } from "@/hooks/useAuth";
import { capitalizeFirstLetter } from "@/utils/common-utils";
import { Spinner } from "./loading";

export const WelcomeUserMsg = (): JSX.Element | null => {
  const { user, loading } = useAuth();

  if (loading) return <Spinner className="h-9 w-6" />

  if (!user) return null;

  return <h1 className="font-bold">{capitalizeFirstLetter(user.username)}!</h1>;
};
