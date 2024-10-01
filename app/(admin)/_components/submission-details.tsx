import { ParsedQuestion, SubmissionHistoryProps } from "./submission-table";
import { capitalizeFirstLetter } from "@/utils/common-utils";

type SubmissionDetailsProps = {
  selectedUser: SubmissionHistoryProps;
};

export const SubmissionDetails = ({ selectedUser }: SubmissionDetailsProps): JSX.Element => {
  return (
    <ul>
      {selectedUser.questionnaires.map((questionnaire) => (
        <li
          className="mt-4 p-4 bg-zinc-800 rounded-md"
          key={questionnaire.questionnaireId}
        >
          <h3 className="text-lg font-semibold">
            {capitalizeFirstLetter(questionnaire.questionnaireName)}
          </h3>
          <ul>
            {questionnaire.questions.map((question) => {
              const parsedQuestion = question.questionInfo as ParsedQuestion;
              return (
                <li
                  key={question.questionId}
                  className="bg-zinc-900 rounded-md mt-4 p-4 space-y-2"
                >
                  <h1>Q: {parsedQuestion.question}</h1>
                  <h1 className="font-bold">
                    A:{" "}
                    {Array.isArray(question.response)
                      ? question.response.join(", ")
                      : question.response}
                  </h1>
                </li>
              );
            })}
          </ul>
        </li>
      ))}
    </ul>
  );
};
