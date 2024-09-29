import { LoginForm } from "./_components/login-form";

export default async function LoginPage(): Promise<JSX.Element> {
  return (
    <div className="grid place-content-center min-h-screen">
      <LoginForm />
    </div>
  );
}
