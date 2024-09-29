"use server";

import { db } from "@/utils/db/db";
import { Questionnaire } from "@prisma/client";

export const getQuestionnaires = async (): Promise<Questionnaire[]> => {
  const allQuestionnaires: Questionnaire[] = await db.questionnaire.findMany();
  return allQuestionnaires;
};
