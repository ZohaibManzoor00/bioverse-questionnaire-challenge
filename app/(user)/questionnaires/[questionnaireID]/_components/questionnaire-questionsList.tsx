"use client";

import { useEffect, useState } from "react";
import { Question } from "@prisma/client";
import { useParams, useRouter } from "next/navigation";

import { getUserSubmission, submitQuestionnaireAction } from "../actions/getQuestionnaireQuestions";
import { useTrackFieldsCompletion } from "@/hooks/useTrackFieldsCompletion";
import { useAuth } from "@/hooks/useAuth";

import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { CheckboxInput } from "./checkbox-input";
import { SubmitBtn } from "@/app/(root-login)/_components/submit-btn";

type QuestionnaireQuestionsListProps = {
  questionnaireQuestions: Question[];
};

type ParsedQuestion = {
  type: string;
  question: string;
  options?: string[];
};

export type QuestionnaireResponsesProps = Record<string, string | string[]>;

export const QuestionnaireQuestionsList = ({ questionnaireQuestions }: QuestionnaireQuestionsListProps): JSX.Element => {
  const [allResponses, setAllResponses] = useState<QuestionnaireResponsesProps>({});
  const [isFormDisabled, setIsFormDisabled] = useState(false);
  
  const { fieldProgress, isComplete } = useTrackFieldsCompletion(questionnaireQuestions, allResponses);
  const { questionnaireID } = useParams();
  const { user, loading } = useAuth()
  const router = useRouter();

  useEffect(() => {
    if (loading) return 
    if (!user) return router.push('/');

    const fetchPreviousSubmissions = async () => {
      const previousSubmissions = await getUserSubmission(
        user?.id,
        questionnaireID as string
      );

      if (!previousSubmissions || previousSubmissions.length === 0) return;

      const formattedResponses: QuestionnaireResponsesProps =
        previousSubmissions.reduce(
          (acc: QuestionnaireResponsesProps, prevSub) => {
            acc[prevSub.questionId] = prevSub.response as string[];
            return acc;
          }, {});

      setIsFormDisabled(true);
      setAllResponses(formattedResponses);
    };

    fetchPreviousSubmissions();
  }, [user, loading, questionnaireID, router]);

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setAllResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isFormDisabled) return router.push("/questionnaires");
    if (!isComplete) return;

    submitQuestionnaireAction({
      responses: allResponses,
      userId: user?.id,
      questionnaireID: questionnaireID as string,
    });

    router.push("/questionnaires");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-end -mt-14 mb-8">
        <h1 className="text-xl">{fieldProgress}</h1>
      </div>
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
                      selectedOptions={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string[]) : []}
                      onChange={(selectedOptions: string[]) => handleInputChange(`${q.id}`, selectedOptions)}
                    />
                  ) : (
                    <RadioInput
                      name={`radio_${q.id}`}
                      options={parsedQuestion.options}
                      disabled={isFormDisabled}
                      selectedOption={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string) : ""}
                      onChange={(selectedOption: string) => handleInputChange(`${q.id}`, selectedOption)}
                    />
                  )}
                </ul>
              )}
              {!parsedQuestion.options && parsedQuestion.type === "input" && (
                <TextInput
                  selectedOption={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string) : ""}
                  disabled={isFormDisabled}
                  onChange={(userInput: string) => handleInputChange(`${q.id}`, userInput)}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="my-8 flex justify-end">
        <SubmitBtn displayText={isFormDisabled ? "Go back" : "Submit"} />
      </div>
    </form>
  );
};
