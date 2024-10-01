import { SubmissionAggregates } from "../_components/submission-history";

export default async function AdminPage() {
  return (
    <main className="max-w-5xl mt-10 px-6 mx-auto space-y-4">
      <h1 className="text-3xl">Admin Panel</h1>
      <SubmissionAggregates />
    </main>
  );
}
