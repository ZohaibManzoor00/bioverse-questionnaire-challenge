export const LoadingTableSkeleton = () => {
  return (
    <div className="space-y-4 bg-zinc-900 p-4 rounded">
      <div className="h-14 bg-zinc-700 rounded animate-pulse"></div>
      <ul className="gap-6 space-y-4">
        {Array.from({ length: 10 }).map((_, idx) => (
          <li key={idx}>
            <div className="h-14 bg-zinc-800 rounded animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
};
