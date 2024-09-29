import { capitalizeFirstLetter } from "@/utils/common-utils";
import { Questionnaire } from "@prisma/client";
import Link from "next/link";

export const QuestionnaireItem = async ({
  questionnaire,
}: {
  questionnaire: Questionnaire;
}) => {
  return (
    <Link href={`questionnaires/${questionnaire.id}`} className="p-20 bg-zinc-900 cursor-pointer rounded-md flex justify-center">
      <h1 className="text-2xl">{capitalizeFirstLetter(questionnaire.name)}</h1>
    </Link>
  );
};
