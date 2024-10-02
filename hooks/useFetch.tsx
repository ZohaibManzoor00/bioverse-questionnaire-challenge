import { useState, useEffect } from "react";

export function useFetch<T>(serverAction: () => Promise<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!serverAction) {
      setLoading(false)
      return
    }
    (async () => {
      try {
        setLoading(true);
        const result = await serverAction();
        setData(result);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    })();
  }, [serverAction]);

  return { data, loading, error };
}
