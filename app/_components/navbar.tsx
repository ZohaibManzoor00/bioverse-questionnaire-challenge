import Link from "next/link";
import { LogoutButton } from "./logoutButton";
import { CustomUsername } from "./custom-username";

export const Navbar = async (): Promise<JSX.Element> => {
  return (
    <nav className="max-w-5xl flex justify-between mt-10 text-2xl mx-auto px-6">
      <Link href={"/questionnaires"}>Bioverse</Link>
      <div className="flex gap-x-4">
        {<CustomUsername />}
        <LogoutButton />
      </div>
    </nav>
  );
};
