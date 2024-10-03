"use server";

import { db } from "@/utils/db/db";

export type SubmissionHistory = {
  id: number;
  username: string;
  questionnaires: {
    questionnaireId: number;
    questionnaireName: string;
    questions: {
      questionId: number;
      questionInfo: ParsedQuestion;
      response: string | string[];
    }[];
  }[];
};

export type ParsedQuestion = Shared & (TextInput | Checkbox | Radio);

type ParsedResponse = OneElementArray<string> | string

type Shared = {
  type: string;
  question: string;
};

type Radio = {
  options: OneElementArray<string>;
};

type Checkbox = {
  options: Array<string>;
};

type TextInput = {
  options?: undefined;
};

type OneElementArray<T> = [T];

export const loadSubmissionHistoryFromServer = async (userId: number): Promise<SubmissionHistory | null> => {
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
                where: { userId },
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

  if (!user) return null;

  return {
    id: user.id,
    username: user?.username,
    questionnaires: user?.submissions.map((submission) => ({
      questionnaireId: submission.questionnaireId,
      questionnaireName: submission.questionnaire.name,
      questions: submission.questionnaire.submissions.map((s) => ({
        questionId: s.question.id,
        questionInfo: s.question.question as ParsedQuestion,
        response: s.response as ParsedResponse,
      })),
    })),
  };
};
