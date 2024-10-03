import { NotFound } from "@/app/_components/error-not-found";
import { Questionnaire } from "./_components/questionnaire";

type QuestionnairePageProps = {
  params: { questionnaireID: string };
};

export default async function QuestionnairePage({ params }: QuestionnairePageProps) {
  const questionnaireID = Number(params.questionnaireID);

  if (!questionnaireID) return <NotFound msg="Sorry, we couldn't find the page you're looking for." />;

  return (
    <main className="max-w-5xl px-6 mx-auto">
      <Questionnaire questionnaireId={questionnaireID} />
    </main>
  );
}
