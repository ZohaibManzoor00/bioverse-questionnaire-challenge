"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useFormState, useFormStatus } from "react-dom";

import { loginUserAction } from "../actions/loginUser";

import { TextInput } from "./custom-input";
import { SubmitBtn } from "./submit-btn";
import { renderErrors } from "./render-errors";

export const LoginForm = (): JSX.Element => {
  const [state, formAction] = useFormState(loginUserAction, { errors: {} });
  const router = useRouter();

  useEffect(() => {
    if (state.user) {
      localStorage.setItem("user", JSON.stringify(state.user));
      router.push("/questionnaires");
    }
  }, [state.user]);

  return (
    <form action={formAction} className="border-2 p-10 rounded-sm">
      <h1 className="text-3xl mb-10 text-center">Login</h1>
      <div className="text-lg space-y-6">
        <TextInput id="username" label="Username" name="username" />
        <TextInput
          id="password"
          label="Password"
          name="password"
          type="password"
        />
      </div>
      <div className="mt-6">{renderErrors(state.errors)}</div>
      <div className="flex justify-end">
        <SubmitBtn displayText="login" />
      </div>
    </form>
  );
};
