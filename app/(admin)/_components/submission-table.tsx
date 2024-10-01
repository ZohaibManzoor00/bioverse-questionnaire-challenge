"use client";

import { useState } from "react";

import { SubmissionAggregatesProps } from "./submission-history";
import { loadSubmissionHistory } from "../actions/loadSubmissionHistory";
import { capitalizeFirstLetter } from "@/utils/common-utils";
import Image from "next/image";
import { useAuth } from "@/hooks/useAuth";
import { Spinner } from "@/app/(user)/questionnaires/_components/loading";

export type SubmissionHistoryProps = {
  id?: number;
  username?: string;
  questionnaires?: {
    questionnaireId: number;
    questionnaireName: string;
    questions: {
      questionId: number;
      questionInfo: ParsedQuestion;
      response: string | string[];
    }[];
  }[];
};

type ParsedQuestion = {
  type: string;
  question: string;
  options?: string[];
};

type SubmissionTableProps = {
  submissionAggregates: SubmissionAggregatesProps[];
};

export const SubmissionTable = ({
  submissionAggregates,
}: SubmissionTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] =
    useState<SubmissionHistoryProps | null>(null);
  const { user, loading } = useAuth();
  
  if (!loading) return <Spinner />

  if (!user || !user.isAdmin) return null 

  const openModal = async (person: SubmissionAggregatesProps) => {
    const userHistory = await loadSubmissionHistory(person.id);
    setIsModalOpen(true);
    setSelectedUser(userHistory);
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className="bg-zinc-900 rounded-md p-4">
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th
                    scope="col"
                    className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold sm:pl-0"
                  >
                    Username
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-lg font-semibold"
                  >
                    Questionnaires Completed
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3.5 text-left text-lg font-semibold"
                  >
                    History
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {submissionAggregates.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium sm:pl-0">
                      {capitalizeFirstLetter(person.username)}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md pl-28">
                      {person.questionnairesCompleted}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-md pl-6 text-indigo-500">
                      <button onClick={() => openModal(person)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {isModalOpen && selectedUser && (
              <div className="fixed p-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-80 overflow-y-scroll">
                <div className="bg-zinc-900 rounded-md h-[500px] w-[800px] overflow-y-auto">
                  <div className="flex justify-end pr-4 mt-3 mb-1">
                    <button
                      onClick={closeModal}
                      className="px-3 border-2 text-xs border-zinc-600 hover:border-zinc-500 bg-zinc-800 rounded-sm"
                    >
                      X
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <div className="flex items-center justify-between gap-x-10">
                      <h2 className="text-2xl font-bold">
                        {capitalizeFirstLetter(selectedUser.username ?? "")}
                      </h2>
                      <div className="flex items-center gap-x-1 text-lg">
                        <p className="">Completed:</p>
                        <p className="font-bold">
                          {selectedUser.questionnaires?.length}
                        </p>
                      </div>
                    </div>

                    {selectedUser.questionnaires?.length === 0 ? (
                      <div className="mt-4">
                        <div className="h-full w-full flex flex-col justify-center items-center">
                          <Image
                            src={"/not-found.png"}
                            height={10}
                            width={300}
                            alt="Not found"
                          />
                          <h1 className="text-xl -mt-10">
                            No submissions yet.
                          </h1>
                        </div>
                      </div>
                    ) : (
                      <>
                        {selectedUser.questionnaires?.map((questionnaire) => (
                          <div
                            className="mt-4 p-4 bg-zinc-800 rounded-md"
                            key={questionnaire.questionnaireId}
                          >
                            <h3 className="text-lg font-semibold">
                              Questionnaire:{" "}
                              {capitalizeFirstLetter(
                                questionnaire.questionnaireName
                              )}
                            </h3>
                            <ul>
                              {questionnaire.questions.map((question) => {
                                const parsedQuestion =
                                  question.questionInfo as ParsedQuestion;
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
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
