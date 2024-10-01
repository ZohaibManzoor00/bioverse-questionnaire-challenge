import { loadSubmissionAggregates } from "../actions/loadSubmissionAggregates";
import { SubmissionTable } from "./submission-table";

export const SubmissionAggregates = async (): Promise<JSX.Element> => {
  const submissionAggregates = await loadSubmissionAggregates();

  return <SubmissionTable submissionAggregates={submissionAggregates} />;
};
