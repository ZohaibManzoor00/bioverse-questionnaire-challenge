import { SubmissionTable } from "./submission-table";
import { loadSubmissionAggregatesFromServer } from "../actions/loadSubmissionAggregates";

export const SubmissionAggregates = async () => {
  const submissionAggregates = await loadSubmissionAggregatesFromServer()
  
  return <SubmissionTable submissionAggregates={submissionAggregates || []} />;
};
