import Link from "next/link";
import { Questionnaire } from "@prisma/client";
import { capitalizeFirstLetter } from "@/utils/common-utils";

type QuestionnaireItemProps = {
  questionnaire: Questionnaire;
};

export const QuestionnaireItem = async ({ questionnaire }: QuestionnaireItemProps): Promise<JSX.Element> => {
  return (
    <Link
      href={`questionnaires/${questionnaire.id}`}
      className="p-20 bg-zinc-900 hover:bg-zinc-800 cursor-pointer rounded-md flex justify-center items-center h-[200px]"
    >
      <h1 className="text-xl">{capitalizeFirstLetter(questionnaire.name)}</h1>
    </Link>
  );
};
