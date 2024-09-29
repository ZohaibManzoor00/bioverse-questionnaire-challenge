"use client";

import { useRouter } from "next/navigation";

export const LogoutButton = (): JSX.Element => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("user")
    router.push("/")
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
