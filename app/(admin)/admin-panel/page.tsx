import { SubmissionAggregates } from "../_components/submission-history";

export default async function AdminPage() {
  return (
    <main className="max-w-5xl my-10 mx-auto px-6">
      <h1 className="text-3xl">Admin Panel</h1>
      <div className="mt-6"><SubmissionAggregates /></div>
    </main>
  );
}
