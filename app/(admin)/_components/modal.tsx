import { SubmissionHistory } from "../actions/loadSubmissionHistory";
import { NotFound } from "./not-found";
import { SubmissionDetails } from "./submission-details";
import { capitalizeFirstLetter } from "@/utils/common-utils";

type ModalProps = {
  selectedSubmissionHistory: SubmissionHistory;
  closeModal: () => void;
};

export const Modal = ({ selectedSubmissionHistory, closeModal }: ModalProps) => {
  return (
    <>
      {selectedSubmissionHistory && (
        <div className="fixed p-10 inset-0 bg-black bg-opacity-50 flex justify-center items-center min-h-80 overflow-y-scroll">
          <div className="bg-zinc-900 rounded-md h-[500px] w-[800px] overflow-y-auto">
            <div className="flex justify-end pr-4 mt-3 mb-1">
              <button
                onClick={closeModal}
                className="px-3 py-1 border-2 text-xs border-zinc-600 hover:border-zinc-500 bg-zinc-800 rounded-sm"
              >
                X
              </button>
            </div>
            <div className="px-4 pb-4">
              <div className="flex items-center justify-between gap-x-10">
                <h2 className="text-2xl font-bold">
                  {capitalizeFirstLetter(selectedSubmissionHistory.username ?? "")}
                </h2>
                <div className="flex items-center gap-x-1 text-lg">
                  <p className="">Completed:</p>
                  <p className="font-bold">{selectedSubmissionHistory.questionnaires?.length}</p>
                </div>
              </div>
              {selectedSubmissionHistory.questionnaires?.length === 0 
                ? <NotFound />
                : <SubmissionDetails selectedSubmissionHistory={selectedSubmissionHistory} />
              }
            </div>
          </div>
        </div>
      )}
    </>
  );
};
