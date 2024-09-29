import { Questionnaire } from "@prisma/client";
import { QuestionnaireItem } from "./questionnaire-item";

export const QuestionnaireList = async ({
  questionnaires,
}: {
  questionnaires: Questionnaire[];
}) => {
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
