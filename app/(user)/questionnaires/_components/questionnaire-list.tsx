import { Questionnaire } from "@prisma/client";
import { QuestionnaireItem } from "./questionnaire-item";

type QuestionnaireListProps = {
  questionnaires: Questionnaire[]
}

export const QuestionnaireList = async ({ questionnaires }: QuestionnaireListProps) => {
  return (
    <ul className="grid grid-cols-2 gap-x-6 gap-y-6">
      {questionnaires.map((q) => (
        <li key={q.id}>
          <QuestionnaireItem questionnaire={q} />
        </li>
      ))}
    </ul>
  );
};
