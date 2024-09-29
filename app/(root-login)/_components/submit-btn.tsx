import { useFormStatus } from "react-dom";
import { Spinner } from "@/app/(user)/questionnaires/_components/loading";

export const SubmitBtn = (): JSX.Element => {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      className="border-2 px-2 hover:border-zinc-500 py-1"
      disabled={pending}
    >
      {pending ? <Spinner className="h-6" /> : "Login"}
    </button>
  );
};
