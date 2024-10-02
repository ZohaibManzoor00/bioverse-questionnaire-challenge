"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

import { SubmissionAggregatesProps, SubmissionTable } from "./submission-table";
import { loadSubmissionAggregates } from "../actions/loadSubmissionAggregates";

import { useAuth } from "@/hooks/useAuth";
import { useFetch } from "@/hooks/useFetch";
import { LoadingTableSkeleton } from "./loading-table";

export const SubmissionAggregates = (): JSX.Element => {
  const { data: submissionAggregates, loading, error } = useFetch<SubmissionAggregatesProps[]>(loadSubmissionAggregates);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && (!user || !user.isAdmin)) return router.push("/");
  }, [user, authLoading, router]);

  if (loading || authLoading) return <LoadingTableSkeleton />;

  if (error) return <p>An error occurred while loading data {error?.message}</p>;

  return <SubmissionTable submissionAggregates={submissionAggregates || []} />;
};
