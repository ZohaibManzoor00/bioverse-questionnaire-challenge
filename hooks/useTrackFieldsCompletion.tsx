import { QuestionnaireResponses } from "@/app/(user)/questionnaires/[questionnaireID]/actions/getQuestionnaireQuestions";
import { Question } from "@prisma/client";

export const useTrackFieldsCompletion = (question: Question[], progress: QuestionnaireResponses) => {
  const completedFields = question.reduce((count, q) => {
    const res = progress[`${q.id}`];
    return (count += res && res.length > 0 ? 1 : 0);
  }, 0);
  
  const totalFields = question.length;
  const isFormComplete = completedFields === totalFields;
  const fieldProgress = `${completedFields}/${totalFields}`

  return { isFormComplete, fieldProgress };
};
