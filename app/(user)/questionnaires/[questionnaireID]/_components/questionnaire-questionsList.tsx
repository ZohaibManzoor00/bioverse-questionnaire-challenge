import { Question } from "@prisma/client";

import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { CheckboxInput } from "./checkbox-input";

type QuestionnaireQuestionsListProps = {
  questionnaireQuestions: Question[];
};

type ParsedQuestionProps = {
  type: string;
  question: string;
  options?: string[];
};

export const QuestionnaireQuestionsList = async ({
  questionnaireQuestions,
}: QuestionnaireQuestionsListProps): Promise<JSX.Element> => {
  return (
    <ul className="space-y-10">
      {questionnaireQuestions.map((q) => {
        const parsedQuestion = q.question as ParsedQuestionProps
        return (
          <li key={q.id} className="bg-zinc-800 p-4 rounded-md">
            <h1 className="text-xl font-bold">{parsedQuestion.question}</h1>
            {parsedQuestion.options && parsedQuestion.type === "mcq" && (
              <ul className="mt-2 space-y-2">
                {parsedQuestion.question.includes("Select all that apply") ? (
                  <CheckboxInput options={parsedQuestion.options} />
                ) : (
                  <RadioInput
                    name={`${q.id}`}
                    options={parsedQuestion.options}
                  />
                )}
              </ul>
            )}
            {!parsedQuestion.options && parsedQuestion.type === "input" && (
              <TextInput />
            )}
          </li>
        );
      })}
    </ul>
  );
};
