"use client";

import { useEffect, useState } from "react";

import { Question } from "@prisma/client";
import { useFormState, useFormStatus } from "react-dom";

import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { CheckboxInput } from "./checkbox-input";
import { SubmitBtn } from "@/app/(root-login)/_components/submit-btn";
import { LoggedInUser } from "@/app/(root-login)/actions/loginUser";
import { submitQuestionnaireAction } from "../actions/getQuestionnaireQuestions";
import { useParams, useRouter } from "next/navigation";

type QuestionnaireQuestionsListProps = {
  questionnaireQuestions: Question[];
};
type ParsedQuestionProps = {
  type: string;
  question: string;
  options?: string[];
};
export type QuestionnaireResponsesProps = Record<string, string | string[]>;

export const QuestionnaireQuestionsList = ({
  questionnaireQuestions,
}: QuestionnaireQuestionsListProps): JSX.Element => {
  const router = useRouter();
  const { questionnaireID } = useParams();
  const [allResponses, setAllResponses] = useState<QuestionnaireResponsesProps>({});
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const jsonUser = localStorage.getItem("user");
    if (!jsonUser) return router.push("/");

    const parsedUser = JSON.parse(jsonUser) as LoggedInUser;
    setUser(parsedUser);
    state.userId = parsedUser.id;
  }, []);

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setAllResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const [state, _formAction] = useFormState(submitQuestionnaireAction, {
    responses: allResponses,
    userId: user?.id,
    questionnaireID: questionnaireID as string,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    submitQuestionnaireAction({
      responses: allResponses,
      userId: user?.id,
      questionnaireID: questionnaireID as string,
    });

    router.push('/questionnaires')
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="space-y-10">
        {questionnaireQuestions.map((q) => {
          const parsedQuestion = q.question as ParsedQuestionProps;
          return (
            <li key={q.id} className="bg-zinc-800 p-4 rounded-md">
              <h1 className="text-xl font-bold">{parsedQuestion.question}</h1>
              {parsedQuestion.options && parsedQuestion.type === "mcq" && (
                <ul className="mt-2 space-y-2">
                  {parsedQuestion.question.includes("Select all that apply") ? (
                    <CheckboxInput
                      options={parsedQuestion.options}
                      selectedOptions={
                        allResponses[`${q.id}`]
                          ? (allResponses[`${q.id}`] as string[])
                          : []
                      }
                      onChange={(selectedOptions: string[]) =>
                        handleInputChange(`${q.id}`, selectedOptions)
                      }
                    />
                  ) : (
                    <RadioInput
                      name={`${q.id}`}
                      options={parsedQuestion.options}
                      onChange={(selectedOption: string) =>
                        handleInputChange(`${q.id}`, selectedOption)
                      }
                    />
                  )}
                </ul>
              )}
              {!parsedQuestion.options && parsedQuestion.type === "input" && (
                <TextInput
                  onChange={(userInput: string) =>
                    handleInputChange(`${q.id}`, userInput)
                  }
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="my-8 flex justify-end">
        <SubmitBtn />
      </div>
    </form>
  );
};
