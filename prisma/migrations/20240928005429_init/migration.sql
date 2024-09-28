-- CreateTable
CREATE TABLE "Questionnaires" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Questionnaires_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionnaireJunction" (
    "id" SERIAL NOT NULL,
    "question_id" INTEGER NOT NULL,
    "questionnaire_id" INTEGER NOT NULL,
    "priority" INTEGER NOT NULL,

    CONSTRAINT "QuestionnaireJunction_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Questions" (
    "id" SERIAL NOT NULL,
    "question" JSONB NOT NULL,

    CONSTRAINT "Questions_pkey" PRIMARY KEY ("id")
);
