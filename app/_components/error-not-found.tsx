import Link from "next/link";

type NotFoundProps = {
  msg: string;
};

export const NotFound = ({ msg }: NotFoundProps) => {
  return (
    <div className="grid min-h-full place-items-center px-6 py-24 sm:py-32 lg:px-8">
      <div className="text-center">
        <p className="text-4xl font-semibold text-zinc-400">404</p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-200 sm:text-5xl">
          Page not found
        </h1>
        <p className="mt-6 text-base leading-7 text-slate-500">{msg}</p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <Link
            href="/questionnaires"
            className="rounded-md bg-zinc-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-zinc-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Go back
          </Link>
          <a href="#" className="text-sm font-semibold text-slate-200">
            Contact support <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </div>
  );
};
