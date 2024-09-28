"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    // clear local storage for user
    router.push("/")
  };

  return (
    <button type="button" onClick={handleLogout}>
      Logout
    </button>
  );
}
