import { getQuestionsByQuestionnaireId } from "../actions/getQuestionnaireQuestions";
import { NotFound } from "@/app/(admin)/_components/not-found";
import { QuestionnaireQuestionsList } from "./questionnaire-questionsList";
import { capitalizeFirstLetter } from "@/utils/common-utils";

type QuestionnaireProps = {
  questionnaireId: number;
};

export const Questionnaire = async ({ questionnaireId }: QuestionnaireProps): Promise<JSX.Element> => {
  const questionInfo = await getQuestionsByQuestionnaireId(questionnaireId);

  if (!questionInfo) return <NotFound msg={"The questionnaire you are looking for does not exist."} />;

  const { questionnaireQuestions, questionnaireName } = questionInfo;

  return (
    <div className="mt-10">
      <h1 className="text-3xl mb-8">{capitalizeFirstLetter(questionnaireName)}</h1>
      <QuestionnaireQuestionsList questionnaireQuestions={questionnaireQuestions} />
    </div>
  );
};
