"use server";

import { db } from "@/utils/db/db";
import { SubmissionHistoryProps } from "../_components/submission-table";

type ParsedQuestion = {
  type: string;
  question: string;
  options?: string[];
};

export const loadSubmissionHistory = async (
  userId: number
): Promise<SubmissionHistoryProps> => {
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      username: true,
      submissions: {
        select: {
          questionnaireId: true,
          questionnaire: {
            select: {
              name: true,
              submissions: {
                select: {
                  question: {
                    select: {
                      id: true,
                      question: true,
                    },
                  },
                  response: true,
                },
              },
            },
          },
        },
        distinct: ["questionnaireId"],
      },
    },
  });

  return {
    id: user?.id,
    username: user?.username,
    questionnaires: user?.submissions.map((submission) => ({
      questionnaireId: submission.questionnaireId,
      questionnaireName: submission.questionnaire.name,
      questions: submission.questionnaire.submissions.map((s) => ({
        questionId: s.question.id,
        questionInfo: s.question.question as ParsedQuestion,
        response: s.response as string | string[],
      })),
    })),
  };
};
