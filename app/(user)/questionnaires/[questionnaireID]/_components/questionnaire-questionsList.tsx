"use client";

import { useEffect, useState } from "react";

import { Question } from "@prisma/client";
import { useFormState } from "react-dom";

import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { CheckboxInput } from "./checkbox-input";
import { SubmitBtn } from "@/app/(root-login)/_components/submit-btn";
import { LoggedInUser } from "@/app/(root-login)/actions/loginUser";
import {
  getUserSubmission,
  submitQuestionnaireAction,
} from "../actions/getQuestionnaireQuestions";
import { useParams, useRouter } from "next/navigation";

type QuestionnaireQuestionsListProps = {
  questionnaireQuestions: Question[];
};
type ParsedQuestion = {
  type: string;
  question: string;
  options?: string[];
};
export type QuestionnaireResponsesProps = Record<string, string | string[]>;

export const QuestionnaireQuestionsList = ({
  questionnaireQuestions,
}: QuestionnaireQuestionsListProps): JSX.Element => {
  const [allResponses, setAllResponses] = useState<QuestionnaireResponsesProps>(
    {}
  );
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const router = useRouter();
  const { questionnaireID } = useParams();

  useEffect(() => {
    const jsonUser = localStorage.getItem("user");
    if (!jsonUser) return router.push("/");

    const parsedUser = JSON.parse(jsonUser) as LoggedInUser;
    setUser(parsedUser);
    state.userId = parsedUser.id;

    const fetchPreviousSubmissions = async () => {
      const previousSubmissions = await getUserSubmission(
        parsedUser.id,
        questionnaireID as string
      );
      if (!previousSubmissions || previousSubmissions.length === 0) return;

      const formattedResponses: QuestionnaireResponsesProps =
        previousSubmissions.reduce(
          (acc: QuestionnaireResponsesProps, prevSub) => {
            acc[prevSub.questionId] = prevSub.response as string[];
            return acc;
          },
          {}
        );

      setIsFormDisabled(true);
      setAllResponses(formattedResponses);
    };

    fetchPreviousSubmissions();
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

    if (isFormDisabled) return router.push('/questionnaires')

    submitQuestionnaireAction({
      responses: allResponses,
      userId: user?.id,
      questionnaireID: questionnaireID as string,
    });

    router.push("/questionnaires");
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul className="space-y-10">
        {questionnaireQuestions.map((q) => {
          const parsedQuestion = q.question as ParsedQuestion;
          return (
            <li key={q.id} className="bg-zinc-900 p-4 rounded-md">
              <h1 className="text-xl font-bold">{parsedQuestion.question}</h1>
              {parsedQuestion.options && parsedQuestion.type === "mcq" && (
                <ul className="mt-2 space-y-2">
                  {parsedQuestion.question.includes("Select all that apply") ? (
                    <CheckboxInput
                      name={`check_${q.id}`}
                      options={parsedQuestion.options}
                      disabled={isFormDisabled}
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
                      name={`radio_${q.id}`}
                      options={parsedQuestion.options}
                      disabled={isFormDisabled}
                      selectedOption={
                        allResponses[`${q.id}`]
                          ? (allResponses[`${q.id}`] as string)
                          : ""
                      }
                      onChange={(selectedOption: string) =>
                        handleInputChange(`${q.id}`, selectedOption)
                      }
                    />
                  )}
                </ul>
              )}
              {!parsedQuestion.options && parsedQuestion.type === "input" && (
                <TextInput
                selectedOption={
                    allResponses[`${q.id}`]
                      ? (allResponses[`${q.id}`] as string)
                      : ""
                  }
                  disabled={isFormDisabled}
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
        <SubmitBtn displayText={isFormDisabled ? "Go back" : "Submit"}/>
      </div>
    </form>
  );
};
