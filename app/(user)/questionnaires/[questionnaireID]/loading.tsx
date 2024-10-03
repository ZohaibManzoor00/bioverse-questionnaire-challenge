export default function Loading() {
  return (
    <div className="max-w-5xl mt-11 px-6 mx-auto space-y-4">
      <div className="flex justify-between">
        <div className="h-8 bg-zinc-900 rounded animate-pulse w-3/12"></div>
        <div className="h-8 bg-zinc-900 rounded animate-pulse w-8"></div>
      </div>
      <ul className="space-y-10 pt-6">
        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx}>
            <div className="h-40 bg-zinc-900 rounded animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
