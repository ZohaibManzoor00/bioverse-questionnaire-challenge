"use client";

import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/app/(user)/questionnaires/_components/loading";

export const CustomUsername = (): JSX.Element | null => {
  const { user, loading } = useAuth();

  if (loading || !user) return <Spinner className="mt-1" />;

  return <p className="italic">{user.isAdmin ? <Link href={"/admin-panel"}>Admin</Link> : "User"}</p>
};
