import { QuestionnaireResponsesProps } from "@/app/(user)/questionnaires/[questionnaireID]/_components/questionnaire-questionsList";
import { Question } from "@prisma/client";

export const useTrackFieldsCompletion = (question: Question[], progress: QuestionnaireResponsesProps) => {
  const completedFields = question.reduce((count, q) => {
    const res = progress[`${q.id}`];
    return (count += res && res.length > 0 ? 1 : 0);
  }, 0);
  
  const totalFields = question.length;
  const isComplete = completedFields === totalFields;
  const fieldProgress = `${completedFields}/${totalFields}`

  return { isComplete, fieldProgress };
};
