"use client"

import { useEffect, useState } from "react";
import { SubmissionAggregatesProps, SubmissionTable } from "./submission-table";
import { loadSubmissionAggregates } from "../actions/loadSubmissionAggregates";

export const SubmissionAggregates = (): JSX.Element => {
  const [submissionAggregates, setSubmissionAggregates] = useState<SubmissionAggregatesProps[]>([]);
  
  const fetchAggregates = async () => {
    const aggregates = await loadSubmissionAggregates();
    setSubmissionAggregates(aggregates);
  };

  useEffect(() => {
    fetchAggregates();
  }, []); 

  return <SubmissionTable submissionAggregates={submissionAggregates} />;
};
