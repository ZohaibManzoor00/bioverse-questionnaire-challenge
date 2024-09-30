"use client";

import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "../(user)/questionnaires/_components/loading";

export const CustomUsername = (): JSX.Element | null => {
  const { user, loading } = useAuth();

  if (loading || !user) return <Spinner className="mt-1" />;

  return <p className="italic">{user.isAdmin ? "Admin" : "User"}</p>;
};
