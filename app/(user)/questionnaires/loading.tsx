export default function Loading(): JSX.Element {
  return (
    <div className="max-w-5xl mt-11 px-6 mx-auto space-y-4">
      <div className="h-8 bg-zinc-900 rounded animate-pulse w-4/12"></div>
      <div className="h-8 bg-zinc-900 rounded animate-pulse w-5/12"></div>
      <ul className="gap-6 pt-6 grid grid-cols-2">
        {Array.from({ length: 4 }).map((_, idx) => (
          <li key={idx}>
            <div className="h-48 bg-zinc-900 rounded animate-pulse"></div>
          </li>
        ))}
      </ul>
    </div>
  );
}
