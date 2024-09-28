import Link from "next/link";
import LogoutButton from "./logoutButton";

export default function Navbar() {
  return (
    <nav className="max-w-5xl flex justify-between mt-10 text-2xl mx-auto px-4">
      <Link href={"/"}>Bioverse</Link>
      <LogoutButton />
    </nav>
  );
}
