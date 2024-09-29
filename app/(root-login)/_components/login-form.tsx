"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { loginUserAction } from "../actions/loginUser";
import { Spinner } from "@/app/(user)/questionnaires/_components/loading";

export const LoginForm = () => {
  const [state, formAction] = useFormState(loginUserAction, { errors: {} });
  const { pending } = useFormStatus()
  const router = useRouter()

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user))
      router.push('/questionnaires')
    }
  }, [pending, state.user])

  return (
    <form action={formAction} className="border-2 p-10">
      <h1 className="text-3xl mb-10 text-center">Login</h1>
      <div className="text-lg space-y-6">
        <div className="flex justify-between">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="text-black ml-2 px-1"
            // required
          />
        </div>
        <div className="flex justify-between">
          <label htmlFor="password" className="mr-2">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            className="text-black ml-2 px-1"
            // required
          />
        </div>
      </div>
      <div className="mt-6">
        {state.errors?.username && (
          <p className="text-red-500 text-md">{state.errors.username}</p>
        )}
        {state.errors?.password && (
          <p className="text-red-500 text-md">{state.errors.password}</p>
        )}
        {state.errors?.general && (
          <p className="text-red-500 text-md">{state.errors.general}</p>
        )}
      </div>
      <div className="flex justify-end">
        <SubmitBtn />
      </div>
    </form>
  );
};

const SubmitBtn = () => {
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
