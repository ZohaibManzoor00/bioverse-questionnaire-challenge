import Link from "next/link";
import { Questionnaire } from "@prisma/client";

import { capitalizeFirstLetter } from "@/utils/common-utils";

type QuestionnaireItemProps = {
  questionnaire: Questionnaire;
};

export const QuestionnaireItem = async ({ questionnaire }: QuestionnaireItemProps) => {
  return (
    <Link
      href={`questionnaires/${questionnaire.id}`}
      className="p-20 bg-zinc-900 cursor-pointer rounded-md flex justify-center"
    >
      <h1 className="text-2xl">{capitalizeFirstLetter(questionnaire.name)}</h1>
    </Link>
  );
};
