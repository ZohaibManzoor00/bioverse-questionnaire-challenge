"use server";

import { db } from "@/utils/db/db";
import { SubmissionAggregatesProps } from "../_components/submission-table";

export const loadSubmissionAggregates = async (): Promise<SubmissionAggregatesProps[]> => {
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
