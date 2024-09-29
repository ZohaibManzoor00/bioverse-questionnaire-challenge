import Link from "next/link";

import { getQuestionsByQuestionnaireId } from "../actions/getQuestionnaireQuestions";
import { QuestionnaireQuestionsList } from "./questionnaire-questionsList";
import { NotFound } from "@/app/_components/error-not-found";

import { capitalizeFirstLetter } from "@/utils/common-utils";

type QuestionnaireProps = {
  questionnaireId: number;
};

export const Questionnaire = async ({ questionnaireId }: QuestionnaireProps) => {
  const questionInfo = await getQuestionsByQuestionnaireId(questionnaireId);

  if (!questionInfo) 
    return <NotFound msg={"The questionnaire you are looking for does not exist."}/>;

  const { questionnaireQuestions, questionnaireName } = questionInfo;

  return (
    <div className="mt-10">
      <h1 className="text-3xl mb-8">{capitalizeFirstLetter(questionnaireName)}</h1>
      <QuestionnaireQuestionsList questionnaireQuestions={questionnaireQuestions} />
      <div className="my-8 flex justify-end">
        <Link
          href={"/"}
          type="button"
          className="hover:border-zinc-600 border-2 border-zinc-700 rounded-md px-6 py-1 text-lg"
        >
          Submit
        </Link>
      </div>
    </div>
  );
};
