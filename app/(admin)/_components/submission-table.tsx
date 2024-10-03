"use client";

import { useState } from "react";
import { loadSubmissionHistoryFromServer, SubmissionHistory } from "../actions/loadSubmissionHistory";
import { capitalizeFirstLetter } from "@/utils/common-utils";
import { Modal } from "./modal";
import { SubmissionAggregates } from "../actions/loadSubmissionAggregates";

type SubmissionTableProps = {
  submissionAggregates: SubmissionAggregates[];
};

export const SubmissionTable = ({ submissionAggregates }: SubmissionTableProps) => {
  const [selectedSubmissionHistory, setSelectedUser] = useState<SubmissionHistory | null>(null);
  const [_, setIsModalOpen] = useState(selectedSubmissionHistory !== null);
  const [loadingModalData, setLoadingModalData] = useState(false);
  const [error, setError] = useState(false);
  const errorMessage = "Failed to load submission history";

  const openModal = async (person: SubmissionAggregates) => {
    setLoadingModalData(true);
    try {
      const userHistory = await loadSubmissionHistoryFromServer(person.id);
      setSelectedUser(userHistory);
      setIsModalOpen(true);
    } catch (err) {
      setError(true);
    } finally {
      setLoadingModalData(false);
    }
  };

  if (error) return errorMessage;

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
            {selectedSubmissionHistory && <Modal selectedSubmissionHistory={selectedSubmissionHistory} closeModal={() => setSelectedUser(null)} />}
          </div>
        </div>
      </div>
    </div>
  );
};
