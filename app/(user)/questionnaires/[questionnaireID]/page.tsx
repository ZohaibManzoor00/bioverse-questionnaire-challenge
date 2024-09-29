import { Questionnaire } from "./_components/questionnaire";

export default async function QuestionnairePage({ params }: { params: { questionnaireID: string } }) {
  return (
    <div className="max-w-5xl mt-10 px-6 mx-auto">
      <Questionnaire questionnaireId={Number(params.questionnaireID)}/>
    </div>
  );
}
