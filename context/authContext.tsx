"use client";

import {
  createContext,
  useEffect,
  useState,
  useContext,
  ReactNode,
} from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

type LoggedInUser = Omit<User, "password">;

type AuthContextProps = {
  user: LoggedInUser | null;
  loading: boolean;
};

const AuthContext = createContext<AuthContextProps | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<LoggedInUser | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const jsonUser = localStorage.getItem("user");

    if (!jsonUser) {
      setLoading(false);
      router.replace("/");
      return;
    }

    const parsedUser = JSON.parse(jsonUser) as LoggedInUser;

    setUser(parsedUser);
    setLoading(false);
  }, [router]);

  return (
    <AuthContext.Provider value={{ loading, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
