"use client"

import { useEffect, useState } from "react";
import { User } from "@prisma/client";
import { useRouter } from "next/navigation";

type LoggedInUser = Omit<User, "password">;

export const useAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<LoggedInUser | null>(null);

  useEffect(() => {
    const jsonUser = localStorage.getItem("user");

    if (!jsonUser) {
      setLoading(false)
      router.replace('/')
      return 
    }

    const parsedUser = JSON.parse(jsonUser) as LoggedInUser

    setUser(parsedUser)
    setLoading(false);
  }, [router]);

  return { loading, user };
};
