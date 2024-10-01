import { db } from "@/utils/db/db";
import { SubmissionTable } from "./submission-table";

export type SubmissionAggregatesProps = {
  id: number;
  questionnairesCompleted: number;
  username: string;
};

const loadSubmissionAggregates = async (): Promise<SubmissionAggregatesProps[]> => {
  "use server"
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      submissions: {
        select: { questionnaireId: true },
        distinct: ["questionnaireId"],
      },
    },
  });

  return users.map((user) => ({
    ...user,
    questionnairesCompleted: user.submissions.length,
  }));
};

export const SubmissionAggregates = async () => {
  const submissionAggregates = await loadSubmissionAggregates();

  return <SubmissionTable submissionAggregates={submissionAggregates} />;
};
