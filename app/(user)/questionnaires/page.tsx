import { QuestionnaireList } from "./_components/questionnaire-list";
import { getQuestionnaires } from "./actions/getQuestionnaires";
import { WelcomeUserMsg } from "./_components/welcome-msg";

export default async function QuestionnairesPage() {
  const allQuestionnaires = await getQuestionnaires();

  return (
    <div className="max-w-5xl mt-10 px-6 mx-auto space-y-4">
      <div className="flex text-3xl">
        <h1 className="mr-2">Welcome</h1>
        <WelcomeUserMsg />
      </div>
      <h2 className="text-xl">Select a questionnaire to get started</h2>
      <div className="pt-5">
        <QuestionnaireList questionnaires={allQuestionnaires} />
      </div>
    </div>
  );
}
