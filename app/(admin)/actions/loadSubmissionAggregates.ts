"use server";

import { db } from "@/utils/db/db";

export type SubmissionAggregates = {
  id: number;
  questionnairesCompleted: number;
  username: string;
};

export const loadSubmissionAggregatesFromServer = async (): Promise<SubmissionAggregates[]> => {
  const users = await db.user.findMany({
    select: {
      id: true,
      username: true,
      submissions: { select: { questionnaireId: true }, distinct: ["questionnaireId"] } },
  });

  return users.map((user) => ({
    ...user,
    questionnairesCompleted: user.submissions.length,
  }));
};
