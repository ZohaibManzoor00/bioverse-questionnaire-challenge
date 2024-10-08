"use server";

import { db } from "@/utils/db/db";
import { Question, Submission } from "@prisma/client";

export type QuestionnaireResponses = Record<string, string | string[]>;

type QuestionnaireQuestions = {
  questionnaireName: string;
  questionnaireQuestions: Question[];
}

export const getQuestionnaireQuestionsFromServer = async (questionnaireId: number): Promise<QuestionnaireQuestions | null> => {
  const questionnaire = await db.questionnaire.findUnique({
    where: { id: questionnaireId },
    include: {
      junction: { include: { question: true }, orderBy: { priority: "desc" } },
    },
  });

  if (!questionnaire) return null;

  const questions = questionnaire.junction.map((j) => j.question as Question);

  return { questionnaireName: questionnaire.name, questionnaireQuestions: questions };
};

type SubmitQuestionnaireProps = {
  userId: number;
  questionnaireId: number;
  responses: QuestionnaireResponses[];
};

const submitQuestionnaireToServer = async ({ userId, questionnaireId, responses }: SubmitQuestionnaireProps) => {
  const submissions = await Promise.all(
    responses.map((response) =>
      db.submission.create({
        data: {
          userId,
          questionId: +response.questionId,
          questionnaireId,
          response: response.response,
        },
      })
    )
  );
  return submissions;
};

type Status = "completed" | "failed";

type PrevStateProps = {
  responses?: QuestionnaireResponses;
  userId?: number;
  status?: Status;
  questionnaireID?: string;
};

export const submitQuestionnaireAction = async (prevState: PrevStateProps): Promise<PrevStateProps> => {
  if (!prevState.userId || !prevState.questionnaireID || !prevState.responses) return { status: "failed" };

  const formattedResponses = Object.entries(prevState.responses).map(([questionId, response]) => (
    { questionId, response }
  ));

  await submitQuestionnaireToServer({
    userId: prevState.userId,
    questionnaireId: +prevState.questionnaireID,
    responses: formattedResponses,
  });

  return { responses: prevState.responses, userId: prevState.userId, status: "completed" };
};

export const getUserSubmissionsFromServer = async (userId: number, questionnaireId: string): Promise<Submission[]> => {
  const submissions = await db.submission.findMany({ where: { userId, questionnaireId: Number(questionnaireId) } });
  return submissions
};
