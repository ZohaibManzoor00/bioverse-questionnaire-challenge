import { db } from "@/utils/db/db";
import { Question } from "@prisma/client";

export const getQuestionsByQuestionnaireId = async (questionnaireId: number) => {
  const questionnaire = await db.questionnaire.findUnique({
    where: { id: questionnaireId },
    include: {
      junction: { include: { question: true }, orderBy: { priority: "desc" } },
    },
  });

  if (!questionnaire) return null;

  const questions = questionnaire.junction.map((j) => j.question as Question);
  
  return {
    questionnaireName: questionnaire.name,
    questionnaireQuestions: questions,
  };
};
