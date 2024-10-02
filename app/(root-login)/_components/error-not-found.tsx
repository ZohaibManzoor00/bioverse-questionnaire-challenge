import Link from "next/link";
import { SubmitBtn } from "./submit-btn";

type NotFoundProps = {
  msg: string;
};

export const NotFound = ({ msg }: NotFoundProps): JSX.Element => {
  return (
    <div className="pt-28 flex items-center justify-center px-6">
      <div className="text-center">
        <p className="text-4xl font-semibold text-zinc-400">404</p>
        <h1 className="mt-4 text-3xl font-bold sm:text-5xl">Page not found</h1>
        <p className="mt-6 text-slate-500">{msg}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link href="/questionnaires">
            <SubmitBtn displayText="Go back" />
          </Link>
        </div>
      </div>
    </div>
  );
};
