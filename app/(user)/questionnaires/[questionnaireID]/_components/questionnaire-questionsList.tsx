"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { Question } from "@prisma/client";

import { useAuth } from "@/context/authContext";
import { getUserSubmissionsFromServer, QuestionnaireResponses, submitQuestionnaireAction } from "../actions/getQuestionnaireQuestions";
import { useTrackFieldsCompletion } from "@/hooks/useTrackFieldsCompletion";

import { TextInput } from "./text-input";
import { RadioInput } from "./radio-input";
import { CheckboxInput } from "./checkbox-input";
import { SubmitBtn } from "@/app/(root-login)/_components/submit-btn";
import { ParsedQuestion } from "@/app/(admin)/actions/loadSubmissionHistory";

type QuestionnaireQuestionsListProps = {
  questionnaireQuestions: Question[];
};

export const QuestionnaireQuestionsList = ({ questionnaireQuestions }: QuestionnaireQuestionsListProps) => {
  const [allResponses, setAllResponses] = useState<QuestionnaireResponses>({});
  const [isFormPrevCompleted, setIsFormPrevCompleted] = useState(false)
  const { fieldProgress, isFormComplete } = useTrackFieldsCompletion(questionnaireQuestions, allResponses);
  const { questionnaireID } = useParams();
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return;
    if (!user) return router.push("/");
    (async () => {
      const userQuestionnaireSubmission = await getUserSubmissionsFromServer(user?.id, questionnaireID as string)
      if (!userQuestionnaireSubmission || userQuestionnaireSubmission.length === 0) return 

      const formattedResponses: QuestionnaireResponses =
      userQuestionnaireSubmission.reduce((acc: QuestionnaireResponses, prevSub) => {
        acc[prevSub.questionId] = prevSub.response as string[];
        return acc;
      }, {});
      
      setIsFormPrevCompleted(true)
      setAllResponses(formattedResponses)
    })()
  }, [questionnaireID, user])

  const handleInputChange = (questionId: string, value: string | string[]) => {
    setAllResponses((prevResponses) => ({
      ...prevResponses,
      [questionId]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (isFormPrevCompleted) return router.push("/questionnaires");

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
                  parsedQuestion.question.includes("Select all that apply") ? (
                    <CheckboxInput
                      name={`check_${q.id}`}
                      options={parsedQuestion.options}
                      disabled={isFormPrevCompleted}
                      selectedOptions={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string[]) : []}
                      onChange={(selectedOptions: string[]) => handleInputChange(`${q.id}`, selectedOptions)}
                    />
                  ) : (
                    <RadioInput
                      name={`radio_${q.id}`}
                      options={parsedQuestion.options}
                      disabled={isFormPrevCompleted}
                      selectedOption={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string) : ""}
                      onChange={(selectedOption: string) => handleInputChange(`${q.id}`, selectedOption)}
                    />
                  )
              )}
              {!parsedQuestion.options && parsedQuestion.type === "input" && (
                <TextInput
                  selectedOption={allResponses[`${q.id}`] ? (allResponses[`${q.id}`] as string) : ""}
                  disabled={isFormPrevCompleted}
                  onChange={(userInput: string) => handleInputChange(`${q.id}`, userInput)}
                />
              )}
            </li>
          );
        })}
      </ul>
      <div className="my-8 flex justify-end">
        <SubmitBtn
          disabled={!isFormComplete}
          displayText={isFormPrevCompleted ? "Go back" : isFormComplete ? "Submit" : "Complete all required fields"} />
      </div>
    </form>
  );
};
