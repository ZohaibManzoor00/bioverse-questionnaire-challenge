"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { loginUser } from "../actions/loginUser";

export const LoginForm = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    if (!username || !password) {
      return alert("Please enter both username and password.");
    }
    if (username.includes(" ") || password.includes(" ")) {
      return alert("Please enter a valid username and password combination");
    }

    const user = await loginUser({ username, password });

    if (!user) return alert("Invalid username & password combination");
    localStorage.setItem("user", JSON.stringify(user));
    return router.push("/questionnaires");
  };

  return (
    <form onSubmit={handleSubmit} className="border-2 p-10">
      <h1 className="text-3xl mb-10 text-center">Login</h1>
      <div className="space-y-5 text-lg">
        <div className="flex justify-between">
          <label htmlFor="username" className="mr-2">
            Username
          </label>
          <input
            id="username"
            name="username"
            type="text"
            className="text-black ml-2 px-1"
            ref={usernameRef}
            required
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
            ref={passwordRef}
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button type="submit" className="border-2 px-2 mt-8">
          Login
        </button>
      </div>
    </form>
  );
};
