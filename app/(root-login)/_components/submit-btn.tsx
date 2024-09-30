"use client"

import { useFormStatus } from "react-dom";
import { Spinner } from "@/app/(user)/questionnaires/_components/loading";
import { capitalizeFirstLetter } from "@/utils/common-utils";

type SubmitBtnProps = {
  displayText?: string;
  className?: string;
};

export const SubmitBtn = ({
  displayText = "submit",
  className,
}: SubmitBtnProps): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className={`border-2 px-4 py-[2px] hover:border-zinc-500 rounded-sm ${className}`}
      disabled={pending}
    >
      {pending ? <Spinner className="h-6 w-10" /> : capitalizeFirstLetter(displayText)}
    </button>
  );
};
