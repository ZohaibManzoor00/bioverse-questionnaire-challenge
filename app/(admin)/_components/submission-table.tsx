"use client";

import { useState } from "react";
import { loadSubmissionHistory } from "../actions/loadSubmissionHistory";
import { capitalizeFirstLetter } from "@/utils/common-utils";
import { Modal } from "./modal";

export type SubmissionHistoryProps = {
  id: number;
  username: string;
  questionnaires: {
    questionnaireId: number;
    questionnaireName: string;
    questions: {
      questionId: number;
      questionInfo: ParsedQuestion;
      response: string | string[];
    }[];
  }[];
};

export type ParsedQuestion = {
  type: string;
  question: string;
  options?: string[];
};

export type SubmissionAggregatesProps = {
  id: number;
  questionnairesCompleted: number;
  username: string;
};

type SubmissionTableProps = {
  submissionAggregates: SubmissionAggregatesProps[];
};

export const SubmissionTable = ({ submissionAggregates }: SubmissionTableProps): JSX.Element => {
  const [selectedUser, setSelectedUser] = useState<SubmissionHistoryProps | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadingModalData, setLoadingModalData] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const openModal = async (person: SubmissionAggregatesProps) => {
    setLoadingModalData(true);
    try {
      const userHistory = await loadSubmissionHistory(person.id);
      setSelectedUser(userHistory);
      setIsModalOpen(true);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoadingModalData(false);
    }
  };

  const closeModal = () => {
    setSelectedUser(null);
    setIsModalOpen(false);
  };

  return (
    <div className={`bg-zinc-900 rounded-md p-4 ${loadingModalData ? "animate-pulse" : ""}`}>
      <div className="flow-root">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
            <table className="min-w-full divide-y divide-gray-300">
              <thead>
                <tr>
                  <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-lg font-semibold sm:pl-0">Username</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold">Questionnaires Completed</th>
                  <th scope="col" className="px-3 py-3.5 text-left text-lg font-semibold">History</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-500">
                {submissionAggregates.map((person) => (
                  <tr key={person.id}>
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-md font-medium sm:pl-0">{capitalizeFirstLetter(person.username)}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md pl-28">{person.questionnairesCompleted}</td>
                    <td className="whitespace-nowrap px-3 py-4 text-md pl-6 text-zinc-500 hover:text-zinc-200">
                      <button onClick={() => openModal(person)}>View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {isModalOpen && selectedUser && <Modal selectedUser={selectedUser} closeModal={closeModal} />}
            {error && <p className="mt-4 text-lg">Error: {error.message}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
