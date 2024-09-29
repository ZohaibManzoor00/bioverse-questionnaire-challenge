import { capitalizeFirstLetter } from "@/utils/common-utils";
import { getQuestionsByQuestionnaireId } from "../actions/getQuestionnaireQuestions";
import { QuestionnaireQuestionsList } from "./questionnaire-questionsList";
import Link from "next/link";

export const Questionnaire = async ({
  questionnaireId,
}: {
  questionnaireId: number;
}) => {
  const questionInfo = await getQuestionsByQuestionnaireId(questionnaireId);

  if (!questionInfo)
    return <h1>The questionnaire you are looking for doesn't exist</h1>;

  const { questionnaireQuestions, questionnaireName } = questionInfo;

  return (
    <>
      <h1 className="text-3xl mb-8">{capitalizeFirstLetter(questionnaireName)}</h1>
      <QuestionnaireQuestionsList questionnaireQuestions={questionnaireQuestions}/>
      <div className="my-8 flex justify-end">
        <Link href={"/"} type="button" className="border-4 border-zinc-700 rounded-md py-1 px-4 text-lg">Submit</Link>
      </div>
    </>
  );
};
